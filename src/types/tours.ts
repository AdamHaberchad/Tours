import { Url } from "node:url";



export interface Tours{
    title: string,
    city: string,
    description: string,
    image_url: ImageUrl,
    slug: string,
}

export type ImageUrl  = `/images/${string}`;


    // title VARCHAR(255) NOT NULL,
    // city VARCHAR(100) NOT NULL,
    // description TEXT NOT NULL,
    // image_url TEXT NOT NULL,
    // slug VARCHAR(255) NOT NULL UNIQUE,
    // created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    // updated_at TIMESTAMP NULL