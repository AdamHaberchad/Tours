import express from "express";
import pool from "../database/pool";

export async function findUserByEmail(email: string){
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    try{
        const result = await pool.query(query, values);
        if(result.rowCount! > 0){
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
