import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findUserByID } from "../services/user";
import { UserRole } from "../types/auth";
import "dotenv/config";

export async function authenticate(req:Request, res: Response, next:NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "Authorization header missing or token not provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const result = await findUserByID(decoded.id);
        req.user = {
            id: result.user.id,
            username: result.user.username,
            email: result.user.email,
            role: result.user.role
        }
        console.log("JWT verified successfully");
        next();
        
    }catch(error){
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export function authorize(role: UserRole){
    return function(req:Request, res: Response, next: NextFunction){
        if(!req.user){
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        if(req.user.role !== role){
            return res.status(403).json({
                message: "Forbidden"
            });
        }
        next();

        
    };
}