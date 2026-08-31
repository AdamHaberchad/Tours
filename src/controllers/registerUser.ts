import type { Request, Response } from "express";
import pool from "../database/pool";
import bcrypt from "bcrypt";
import { registerUser } from "../types/auth";

async function hashPassword(password: string){
    return bcrypt.hash(password, 10);
};

async function insertUser(user: registerUser){
    const hashedPassword = await hashPassword(user.password);
    const query = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at';
    const values = [
        user.username,
        user.email,
        hashedPassword
    ];
    try{
        console.log("insertion on the way");
        const result = await pool.query(query, values);
        return {
            row: result.rows[0],
            error: null
        };
    }catch(error){
        console.log("insertion is stopped");
        return {
            row: null,
            error: error
        }
    };
}

export {insertUser};