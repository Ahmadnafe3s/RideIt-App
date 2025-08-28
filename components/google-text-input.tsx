import { icons } from "@/constants";
import { PlacesAutocompleteApi } from "@/services/placesAutocomplete";
import { GoogleInputProps } from "@/types/type";
import { useDebounce } from "@/utils/debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    handlePress,
}: GoogleInputProps) => {
    const [textInput, setTextInput] = useState("");
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["placesAutocomplete", textInput],
        queryFn: async () => await PlacesAutocompleteApi(textInput),
        enabled: !!textInput,
    });

    const debouncedOnChangeText = useDebounce((text: string) => {
        setTextInput(text);
    }, 400);

    return (
        <View className={`flex justify-center items-center relative z-50`}>
            {/* Input Field */}
            <View className={`flex flex-row items-center gap-1 px-5 rounded-lg bg-white ${containerStyle} mx-4`}>
                <Image source={icon ?? icons.search} className="w-6 h-6" />
                <TextInput
                    onChangeText={debouncedOnChangeText}
                    placeholderTextColor="gray"
                    placeholder={
                        (initialLocation?.length! > 35 ? initialLocation?.slice(0, 33) + '...' : initialLocation)
                        ?? "Where are you going?"
                    }
                    className="text-black  text-left text-[16px] font-JakartaSemiBold w-full"
                />
            </View>

            {/* List */}
            {data?.length! > 0 && (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => {
                            handlePress({
                                latitude: item.geometry.location.lat,
                                longitude: item.geometry.location.lng,
                                address: item.description,
                            });
                            queryClient.setQueryData(["placesAutocomplete", textInput], []);
                        }}>
                            <View
                                key={index}
                                className={`flex flex-row items-center gap-2 border-b py-2 px-3 border-gray-200 ${data?.length! - 1 === index ? "border-b-0" : ""
                                    }`}
                            >
                                <MapPin size={26} className="text-gray-700" />
                                <View className="flex-1">
                                    <Text
                                        className="font-JakartaSemiBold text-black"
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.structured_formatting.main_text}
                                    </Text>
                                    <Text
                                        className="text-gray-500 text-sm"
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.structured_formatting.secondary_text}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    style={{
                        position: "absolute",
                        top: 50,
                        paddingVertical: 4,
                        paddingBottom: 10,
                        backgroundColor: "white",
                        width: "100%",
                        minHeight: 100,
                        borderRadius: 10,
                        ...(Platform.OS === "android" ? { elevation: 10 } : { shadowColor: "#d4d4d4" }),
                    }}
                />
            )}
        </View>
    );
};

export default GoogleTextInput;

//     < GooglePlacesAutocomplete
// predefinedPlaces = { []}
// fetchDetails = { true}
// placeholder = 'Where are you going?'
// debounce = { 200}
// styles = {{
//     textInputContainer: {
//         borderRadius: 20,
//             marginHorizontal: 20,
//                     },
//     textInput: {
//         backgroundColor: textInputBackgroundColor ?? "white",
//             fontSize: 16,
//                 fontWeight: "bold",
//                     marginTop: 5,
//                         width: "100%",
//                             borderRadius: 200,
//                     },
//     listView: {
//         backgroundColor: textInputBackgroundColor ?? "white",
//             borderRadius: 10,
//                 shadowColor: "#d4d4d4",
//                     zIndex: 99,
//                     },
//     textInputPlaceholder: {
//         fontSize: 16,
//             fontWeight: "bold",
//                 marginTop: 5,
//                     color: "black",
//                     },
// }}
// onPress = {(data, details = null) => {
//     if (!details) return; // ✅ prevent crash
//     handlePress({
//         latitude: details.geometry.location.lat,
//         longitude: details.geometry.location.lng,
//         address: data.description,
//     });
// }}
// query = {{
//     key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? "", // ✅ safe fallback
//         language: "en",
//                 }}
// renderLeftButton = {() => (
//     <View className='flex justify-center'>
//         <Image
//             source={icon ? icon : icons.search}
//             className='w-7 h-7'
//             resizeMode='contain'
//         />
//     </View>
// )}
// textInputProps = {{
//     onFocus: () => { },
//         onBlur: () => { },
//             placeholderTextColor: "gray",
//                 placeholder: initialLocation ?? "Where are you going?",
//                 }}
//             />
