import AxiosInstance from "@/lib/axios";
import { CreateRide } from "@/types/type";

export const RideService = {
    getRides: async (params: { user_id: string, page: number, limit?: number }) => {
        params.limit = 10;
        const res = await AxiosInstance.get("/api/ride", { params });
        return res.data;
    },
    createRide: async (data: CreateRide) => {
        const res = await AxiosInstance.post("/api/ride", data);
        return res.data;
    }
};