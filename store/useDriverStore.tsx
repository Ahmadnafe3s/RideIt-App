import { DriverStore, MarkerData } from "@/types/type";
import { create } from "zustand";

export const useDriverStore = create<DriverStore>((set) => ({

    drivers: [] as MarkerData[],
    selectedDriver: null,

    setSelectedDriver: (driverId: string) => {
        set(() => ({
            selectedDriver: driverId
        }))
    },
    setDrivers: (drivers: MarkerData[]) => {
        set(() => ({
            drivers: drivers
        }))
    },
    clearSelectedDriver: () => {
        set(() => ({
            selectedDriver: null
        }))
    }
}))