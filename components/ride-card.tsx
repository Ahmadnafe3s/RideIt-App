import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ride } from '@/types/type'
import { icons, images } from '@/constants'
import { Mars } from 'lucide-react-native'

const RideCard = ({ ride: {
    driver,
    origin_address,
    destination_longitude,
    destination_latitude,
    ride_time,
    destination_address,
    payment_status,
    created_at,
} }: { ride: Ride }) => {
    return (
        <View className='flex gap-5 bg-white p-5'>
            <View className='flex flex-row gap-5'>

                <View className='bg-pink-500 p-3 rounded-full w-fit'>
                    <Mars color="white" size={60} />
                </View>

                <View className='flex gap-2 justify-center'>
                    <View className='flex flex-row items-center gap-2'>
                        <Image source={icons.to} className='w-6 h-6' />
                        <Text className='text-md font-JakartaMedium'>{origin_address}</Text>
                    </View>
                    <View className='flex flex-row items-center gap-2'>
                        <Image source={icons.point} className='w-6 h-6' />
                        <Text className='text-md font-JakartaMedium'>{destination_address}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RideCard