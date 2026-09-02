import express from "express";
import { Request, Response } from "express";
import { getAllTours, getToursBySlug } from "../services/tours";

const toursRouter = express.Router();


toursRouter.get('/', async (req: Request, res: Response)=>{
    const toursGetter = await getAllTours();
    if(toursGetter.error) return res.status(500).send(`Something went wrong: ${toursGetter.error}`);
    if(toursGetter.tours?.length === 0) return res.send(`No tours found`);

    return res.send(toursGetter.tours);

});

toursRouter.get('/:slug', async (req:Request, res: Response)=>{
    const toursGetter = await getToursBySlug(String(req.params.slug));
    if(toursGetter.error) return res.status(500).send(`Something went wrong: ${toursGetter.error}`);
    if(toursGetter.tours?.length === 0) return res.send(`No tours with slug: ${String(req.params.slug)} found`);

    return res.send(toursGetter.tours);


})



export {toursRouter};