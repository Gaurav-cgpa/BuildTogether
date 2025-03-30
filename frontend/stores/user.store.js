import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../src/lib/axios";

export const userStore = create((set, get) => ({
  user: null,

  updateDetails: async (data) => {
    try {
      let formData;
    
      if (data instanceof FormData) {
        formData = data;
      } else {

        formData = new FormData();
        for (const key in data) {
          if (data[key] !== null && data[key] !== undefined) {
            formData.append(
              key,
              key === "skills" ? JSON.stringify(data[key]) : data[key]
            );
          }
        }
      }

      const res = await axiosInstance.put("/user/updateDetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        set({ user: res.data.data });
        toast.success("Details updated successfully");
      } else {
        toast.error("Failed to update details");
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      throw error;
    }
  },
}));
