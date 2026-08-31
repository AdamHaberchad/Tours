import { Request, Response } from "express";
import { findUserByEmail } from "../services/user";
import  jwt, {SignOptions}  from "jsonwebtoken";



export async function LoginUser(req:Request, res: Response){
    const find = await findUserByEmail(req.body.email);
    const payload = {
        id: find.user.id
    };
    const secret = process.env.JWT_SECRET!;
    const options: SignOptions = {
        expiresIn: '1h'
    };
    const token = jwt.sign(payload, secret, options);
    return res.json({
        token
    });

}