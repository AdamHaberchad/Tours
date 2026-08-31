import express from "express";
import pool from "../database/pool";
import { Request, Response } from "express";
import { RegisterValidation } from "../middleware/registerValidation";
import { loginValidation } from "../middleware/loginValidation";
import { insertUser } from "../controllers/registerUser";
import { LoginUser } from "../controllers/loginUser";
const authRouter = express.Router();


//Register
authRouter.post('/register', RegisterValidation,  async(req: Request, res: Response)=>{
    const insetion = await insertUser(req.body);
    if(insetion.error){
        res.status(500).send(`Error in registration: ${insetion.error}`);
        console.log(`Error in registration: ${insetion.error}`);
    }else{
        console.log("Registration was successfull!!")
        res.json({
            message: "Registration was successfull!!",
            user: insetion.row
        });
    }
});

authRouter.post('/login', loginValidation, LoginUser);


export {authRouter};