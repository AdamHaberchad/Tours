import express from "express";
import pool from "../database/pool";
import Joi from "joi";
import { registerUser } from "../types/auth";

export async function findUserByEmail(email: string){
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    try{
        const result = await pool.query(query, values);
        if(result.rowCount! > 0){
            console.log("user found");
            return {
                user: result.rows[0],
                error: null
            }
        }else{
            return {
                user: undefined,
                error: null
            }
        }
    }catch(err){
        console.log("----->service/user.ts:findUserByEmail ERROR!!");
        return{
            user: null,
            error: err
        }
    }
}

export async function findUserByID(id: number){
    const query = "SELECT * FROM users WHERE id = $1";
    const values = [id];
    try{
        const result = await pool.query(query, values);
        if(result.rowCount! > 0){
            console.log("user found");
            return {
                user: result.rows[0],
                error: null
            }
        }else{
            return {
                user: undefined,
                error: null
            }
        }
    }catch(err){
        console.log("----->service/user.ts:findUserByID ERROR!!");
        return{
            user: null,
            error: err
        }
    }
}


export function validateJoiFormat(format: object, schema: Joi.Schema){
    const {error, value} = schema.validate(format);
    if(error){
        console.log("------>validateJoiFormat: Invalid");
        return{
            isValid: null,
            error: error
        }
    }else{
        console.log("------>validateJoiFormat: Valid");
        return{
            isValid: value,
            error: null
        }
    }
}
