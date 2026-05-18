import { createSlice } from "@reduxjs/toolkit";


import { users } from "../config/config";
interface User{
    firstname:string;
    lastname:string;
    avatar:string;
    email:string;
    number:string;
    city:string;
    adres:string;
    job:string;
    id:string;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: users as User[],
    },
    reducers: {
        
    }
});

export const {  } = userSlice.actions;
export default userSlice.reducer;