import axios from "axios";

export const getDirections = async (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
) => {
    const url = `https://api.olamaps.io/routing/v1/directions?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&api_key=${process.env.EXPO_PUBLIC_OLA_MAPS_API_KEY}`;

    const res = await axios.post(url);
    return res.data;
};
