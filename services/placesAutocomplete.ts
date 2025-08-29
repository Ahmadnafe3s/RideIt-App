import { placesAutocomplete } from "@/types/type";
import axios from "axios";

export const PlacesAutocompleteApi = async (text: string): Promise<placesAutocomplete> => {
    const res = await axios.get(
        `https://api.olamaps.io/places/v1/autocomplete?input=${text}&api_key=${process.env.EXPO_PUBLIC_OLA_MAPS_API_KEY}`
    );

    return res.data.predictions; // 👈 just predictions
};



