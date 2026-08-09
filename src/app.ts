import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) =>{
    res.json({
        message: "Welcom to THE SUMMER project\nTours."
    });

});


export default app;