import { icons } from '@/constants'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router'
import React, { useRef } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Map from './map'

interface Props {
    children: React.ReactNode
    title?: string
    snapPoints?: string[]
}

const RideLauout = ({ children, title, snapPoints }: Props) => {
    const router = useRouter()
    const bottomSheetRef = useRef<BottomSheet>(null)
    return (
        <GestureHandlerRootView className='mt-0'>
            <View className='flex-1 bg-blue-500'>
                {/* Back Button */}
                <View className='absolute top-14 mx-4 flex flex-row items-center z-10'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View className='bg-white h-10 w-10 rounded-full flex items-center justify-center'>
                            <Image source={icons.backArrow} className='w-6 h-6' />
                        </View>
                    </TouchableOpacity>
                    <Text className='ml-4 text-xl font-JakartaSemiBold'>{title ?? 'Back'}</Text>
                </View>

                {/* Map */}
                <Map />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                keyboardBehavior='extend'
                snapPoints={snapPoints ?? ["40%", "85%"]}
                index={0}
            >
                <BottomSheetView style={{ flex: 1, padding: 20 }}>
                    {children}
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

export default RideLauout