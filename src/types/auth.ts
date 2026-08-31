
export interface registerUser {
    username: string;
    email: string;
    password: string;
}

export interface loginUser {
    email: string;
    password: string;
}

export interface User{
    id: number;
    username: string;
    email: string;
    created_at: Date;
}