
import {create} from "zustand";
import {toast} from "react-hot-toast";
import axiosInstance from "../src/lib/axios";



export const authStore = create((set, get) => (
    {
        user:null,
        loading:false,

        signup:async({email,username,password})=>{
           try {
             const res=await axiosInstance.post("/auth/signup",{email,username,password});
             set({user:res.data,loading:false});
             return res;
           } catch (error) {
              set({loading:false});
              toast.error(error.response?.data?.message||"An error occured");   
           }
        },
        login:async({username,password})=>{
            set({loading:true});

            try {
               const res=await axiosInstance.post("/auth/login",{username,password});
               set({user:res.data,loading:false}); 
            } catch (error) {
               set({loading:false});    
                toast.error(error.response?.data?.message||"An error occured");
            }
        },
        logout:async()=>{
            try {
                await axiosInstance.post("/auth/logout");
                set({user:null});
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred during logout");
            }
        },

    }
));