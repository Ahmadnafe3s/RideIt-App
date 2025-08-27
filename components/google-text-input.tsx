import { PlacesAutocompleteApi } from '@/services/placesAutocomplete';
import { GoogleInputProps } from '@/types/type';
import { useDebounce } from '@/utils/debounce';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';



const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress
}: GoogleInputProps) => {

    const [textInput, setTextInput] = useState('')

    const { data } = useQuery({
        queryKey: ['placesAutocomplete', textInput],
        queryFn: async () => await PlacesAutocompleteApi(textInput),
        enabled: !!textInput,
    })


    const debouncedOnChangeText = useDebounce((text: string) => {
        setTextInput(text)
    }, 400)

    console.log(data)

    return (
        <View className={`flex flex-row justify-center items-center relative z-50 rounded-xl ${containerStyle}`}>
            <TextInput onChangeText={debouncedOnChangeText} className='text-black text-left' />
        </View>
    )
}

export default GoogleTextInput




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