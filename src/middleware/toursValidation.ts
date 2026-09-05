import { Request, Response, NextFunction } from "express";
import { getToursByID, getToursBySlug } from "../services/tours";
import { validateJoiFormat } from "../services/user";
import { Tours, ImageUrl } from "../types/tours";

import Joi from "joi";


const imageUrl = Joi.string().pattern(/^\/images\/.+/);
const schema = Joi.object({
    title: Joi.string().required(),
    city: Joi.string().required(),
    description: Joi.string().required(),
    image_url: imageUrl,
    slug: Joi.string().required(),
});

export async function validateTours(req: Request, res: Response, next: NextFunction){
    const input = validateJoiFormat(req.body, schema);
    if(input.error) return res.status(400).send(`Invalid Input: ${input.error}`);
    const find = await getToursBySlug(req.body.slug);
    if(find.error) return res.status(500).send(`Something went wrong ${find.error}`);

    if(find.tours){
        console.log("------>validateTours: tours already exists");
        return res.status(400).json({
            message: "tours already exists"
        });
    }

    console.log("------>validateTours: Done successfully!!");
    next();
};

const patchSchema = Joi.object({
    title: Joi.string(),
    city: Joi.string(),
    description: Joi.string(),
    image_url: imageUrl,
    slug: Joi.string(),
}).min(1);

export async function patchToursValidation(req:Request, res:Response, next:NextFunction){
    const input = validateJoiFormat(req.body, patchSchema);
    if(input.error) return res.status(400).send(`Invalid Input: ${input.error}`);
    const find = await getToursByID(Number(req.params.id));
    if(find.error) return res.status(500).send(`Something went wrong ${find.error}`);
    if(!find.tours){
        return res.status(400).json({
            message: `tours with ID: ${Number(req.params.id)} doesn't exist`
        });
    }

    next();
}

