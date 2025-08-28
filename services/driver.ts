import AxiosInstance from "@/lib/axios";
import { Driver } from "@/types/type";

export const DriverService = {
    getDrivers: async (): Promise<Driver[]> => {
        const res = await AxiosInstance.get("/api/driver");
        return res.data;
    },
    getDriver: async (id: string) => {
        const res = await AxiosInstance.get(`/api/driver/${id}`);
        return res.data;
    },
    createDriver: async (data: any) => {
        const res = await AxiosInstance.post("/api/driver", data);
        return res.data;
    },
}