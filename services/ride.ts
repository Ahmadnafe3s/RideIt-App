import AxiosInstance from "@/lib/axios";
import { CreateRide } from "@/types/type";

export const RideService = {
    getRides: async () => {
        const res = await fetch("https://rideit-api.herokuapp.com/ride");
        return await res.json();
    },
    createRide: async (data: CreateRide) => {
        const res = await AxiosInstance.post("/api/ride", data);
        return res.data;
    }
};