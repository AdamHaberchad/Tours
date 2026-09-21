import path from "path";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (_req, res) =>{
    res.json({
        message: "Welcom to THE SUMMER project\nTours."
    });

});


export default app;