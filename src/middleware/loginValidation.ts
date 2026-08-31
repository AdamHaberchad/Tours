import Joi from "joi";
import pool from "../database/pool";
import bcrypt from "bcrypt";
import { loginUser } from "../types/auth";
import { validateJoiFormat } from "../services/user";
import {NextFunction, Request, Response } from "express";
import { findUserByEmail } from "../services/user";

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export async function loginValidation(req:Request, res:Response, next: NextFunction){
    const input = validateJoiFormat(req.body, schema);
    if(input.error) return res.status(400).send(`Invalid Input: ${input.error}`);

    const find = await findUserByEmail(req.body.email);
    if(find.error) return res.status(500).send(`Something went wrong ${find.error}`);

    if(!find.user){
        console.log(`user with email: ${req.body.email} doesn't exist :(`);
        return res.status(400).send(`user with email: ${req.body.email} doesn't exist :(`);
    }

    const pwValidator = await validatePassword(req.body.password, find.user.password_hash);

     if(pwValidator.error){
        return res.status(400).send(`Error accured duting password validation: ${pwValidator.error}`);
    }
    else if(!pwValidator.isValid){
        return res.status(401).send("wrong password");
    }else{
        console.log("------>loginValidation: Login validation done successfully!!");
        next();
    }
}

async function validatePassword(inputPassword:string, hashedPassword:string){
    try{
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        if(isMatch){
            console.log("valid Password!!");
            return{
                isValid: true,
                error: null
            };
        }else{
            console.log("Invalid Password!!");
            return{
                isValid: false,
                error: null
            };
        }
    }catch(error){
        console.log("Something went wrong!!");
        return{
            isValid: null,
            error: error
        };
    };
};


