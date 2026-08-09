import "dotenv/config";
import app from "./app";


const PORT = process.env.PORT || 6767;


app.listen(PORT, () =>{
    console.log(`Alive at http://localhost:${PORT}`);
});
