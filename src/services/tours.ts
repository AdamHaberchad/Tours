import pool from "../database/pool";


export async function getAllTours(){
    const query = "SELECT * FROM tours";
    try{
        const result = await pool.query(query);
        if(result.rowCount! >0){
            console.log("------>getAllTours: Done!");
            return{
                tours: result.rows,
                error: null
            }
        }else{
            console.log("------>getAllTours: EMPTY!");
            return{
                tours: null,
                error: null
            }
        }
    }catch(error){
        console.log("------>getAllTours: something went wrong! "+error);
        return{
            tours: null,
            error: error
        }
    }
}

export async function getToursBySlug(slug:string){
    const query = "SELECT * FROM tours WHERE slug = $1";
    const values = [slug];

    try{
        const result = await pool.query(query, values);
        if(result.rowCount! >0){
            console.log("------>getToursBySlug: Done!");
            return{
                tours: result.rows,
                error: null
            }
        }else{
            console.log(`------>getToursBySlug: tours with slug: ${slug} doesn't exist!`);
            return{
                tours: null,
                error: null
            }
        }
    }catch(error){
        console.log("------>getToursBySlug: something went wrong! "+error);
        return{
            tours: null,
            error: error
        }
    }
}