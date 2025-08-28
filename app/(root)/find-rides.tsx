import CustomButton from '@/components/custom-button'
import GoogleTextInput from '@/components/google-text-input'
import RideLauout from '@/components/ride-layout'
import { icons } from '@/constants'
import { useLocationStore } from '@/store/useLocationStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const FindRides = () => {

    const router = useRouter()
    const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore()

    return (
        <RideLauout>
            <View className='my-3'>
                <Text className='text-lg font-JakartaSemiBold mb-3'>From</Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress!}
                    handlePress={setUserLocation}
                    containerStyle='!bg-neutral-100'
                />
            </View>
            <View className='my-3'>
                <Text className='text-lg font-JakartaSemiBold mb-3'>To</Text>
                <GoogleTextInput
                    icon={icons.map}
                    initialLocation={destinationAddress!}
                    handlePress={setDestinationLocation}
                    containerStyle='!bg-neutral-100'
                />
            </View>
            <CustomButton title='Find Rides' className='mt-5' onPress={() => router.push('/(root)/confirm-ride')} />
        </RideLauout>
    )
}

export default FindRides