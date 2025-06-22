import { create } from "zustand";
import { toast } from "sonner";
import { axiosInstance } from "../lib/axiosInctance.js";

export const useAuthStore = create((set, get) => ({
  reviewData: null,
  isUploading: true,

  addReview: async (data) => {
    //console.log("🔥 addReview called with:", data);
    set({ isUploading: true });

    try {
      const res = await axiosInstance.post("/submit-review", data);
      set({ reviewData: res.data });
       //toast.success("Thank you for your message!");
    } catch (error) {
      if (error?.response?.data?.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something Went Wrong ☹️");
      }

      throw error;
    } finally {
      set({ isUploading: false });
    }
  },

  fetchReview: async () => {
  try {
    const res = await axiosInstance.get("/fetch-review");
    set({ reviewData: res.data });
  } catch (error) {
    if (error?.response?.data?.msg) {
      console.log(error.response.data.msg);
    } else {
      console.log("Failed to fetch reviews.");
    }
  }
}

}));
