import Joi from "joi";
import {findUserByEmail, validateJoiFormat} from "../services/user";
import { NextFunction, Request, Response } from "express";
import { registerUser } from "../types/auth";

const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export async function RegisterValidation(req: Request, res: Response, next:NextFunction){
    const input = validateJoiFormat(req.body, schema);
    if(input.error) return res.status(400).send(`Invalid Input: ${input.error}`);

    const find = await findUserByEmail(req.body.email);
    if(find.error) return res.status(500).send(`Something went wrong ${find.error}`);
    if(find.user){
        console.log(`user with email: ${req.body.email} already exist!!`);
        return res.status(400).send(`user with email: ${req.body.email} already exist!!`);
    } 
    console.log("------>RegisterValidation: Done!!");
    next();
}

