import express from "express";
import { Request, Response } from "express";
import { getAllTours, getToursBySlug } from "../services/tours";
import { authenticate, authorize } from "../middleware/auth"; 
import { validateTours, patchToursValidation } from "../middleware/toursValidation";
import { insertTours, deleteTours, patchTours } from "../controllers/Tours";

const toursRouter = express.Router();


toursRouter.get('/', async (req: Request, res: Response)=>{
    const toursGetter = await getAllTours();
    if(toursGetter.error) return res.status(500).send(`Something went wrong: ${toursGetter.error}`);
    if(toursGetter.tours?.length === 0) return res.send(`No tours found`);

    return res.json(toursGetter.tours);

});

toursRouter.get('/:slug', async (req:Request, res: Response)=>{
    const toursGetter = await getToursBySlug(String(req.params.slug));
    if(toursGetter.error) return res.status(500).send(`Something went wrong: ${toursGetter.error}`);
    if(toursGetter.tours?.length === 0) return res.send(`No tours with slug: ${String(req.params.slug)} found`);

    return res.send(toursGetter.tours);


});

toursRouter.post('/', authenticate, authorize("ADMIN"), validateTours, insertTours);
toursRouter.delete('/:id', authenticate, authorize("ADMIN"), deleteTours);
toursRouter.patch('/:id', authenticate, authorize("ADMIN"), patchToursValidation, patchTours);


export {toursRouter};