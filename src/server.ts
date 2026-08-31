import "dotenv/config";
import { authRouter } from "./routes/authRoutes";
import app from "./app";
import pool from "./database/pool";


app.use('/api/auth/', authRouter);

const PORT = process.env.PORT || 6767;

async function dbConnection(){
    try{
        const result = await pool.query("SELECT NOW()");
        console.log("App connected to the tdatabse successfully");
        console.log(result.rows);
    }catch(error){
        console.log("Connection with database faild");
        console.log(error);
    }
}


app.listen(PORT, () => {
    console.log(`Alive at http://localhost:${PORT}`);
    dbConnection();
});







