import { Request, Response, NextFunction } from "express";
import pool from "../database/pool";
import { string } from "joi";




export async function insertTours(req:Request, res:Response){
    const query = "INSERT INTO tours (title, city, description, image_url, slug) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [req.body.title, req.body.city, req.body.description, req.body.image_url, req.body.slug];

    try{
        const result = await pool.query(query, values);
        console.log("----->insertTours: tours inserted successfully!!");
        return res.json({
            message: "tours inserted successfully!!",
            tours: result.rows
        });
    }catch(error){
        console.log("----->insertTours: Something went wrong!!\n"+ error);
        return res.status(500).json({
            message: `something went wrong: ${error}`
        });
    }
};

export async function deleteTours(req: Request, res: Response){
    const query = "DELETE FROM tours WHERE id = $1";
    const values = [Number(req.params.id)];

    try{
        const result = await pool.query(query, values);
        console.log("----->deleteTours: tours deleted successfully!!");
        return res.json({
            message: "tours deleted successfully!!"
        });
    }catch(error){
        console.log("----->deleteTours: Something went wrong!!\n"+ error);
        return res.status(500).json({
            message: `something went wrong: ${error}`
        });
    }
};


export async function patchTours(req: Request, res: Response){
    const fields = Object.keys(req.body);
    const updates:string[] = [];
    fields.forEach((field, index) =>{
        updates.push(`${field} = $${index +1}`);
    });

    const text = updates.join(", ");

    const values = [...Object.values(req.body), Number(req.params.id)];
    const idPosition = values.length; 
    const set = `SET ${text}, updated_at = CURRENT_TIMESTAMP`;

    const query = `UPDATE tours ${set} WHERE id = $${idPosition} RETURNING *`;

    try{
        const result = await pool.query(query, values);
        console.log("----->patchTours: tours updated successfully!!");
        return res.json({
            message: "tours updated successfully!!",
            tours : result.rows
        });
    }catch(error){
        console.log("----->patchTours: Something went wrong!!\n"+ error);
        return res.status(500).json({
            message: `something went wrong: ${error}`,
            tours: null
        });
    }
}
