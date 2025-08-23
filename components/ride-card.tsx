import { icons } from '@/constants'
import { Ride } from '@/types/type'
import { formatDate, formatTime } from '@/utils/formatter'
import React from 'react'
import { Image, Text, View } from 'react-native'

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
        <View className='flex gap-5 bg-white p-5 shadow-neutral-300 elevation-neutral-300'>
            {/* Map & routes */}
            <View className='flex flex-row gap-5'>
                <Image
                    source={{
                        uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`
                    }}
                    className='w-[80px] h-[90px] rounded-lg'
                />

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

            <View className='flex flex-row justify-between'>
                <Text className='font-JakartaMedium text-md text-gray-500'>Date & Time</Text>
                <Text className='font-JakartaMedium text-md text-gray-500'>{formatDate(created_at)} {", "} {formatTime(ride_time)}</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Text className='font-JakartaMedium text-md text-gray-500'>Driver</Text>
                <Text className='font-JakartaMedium text-md text-gray-500'>{driver.first_name}</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Text className='font-JakartaMedium text-md text-gray-500'>Car Seats</Text>
                <Text className='font-JakartaMedium text-md text-gray-500'>{driver.car_seats}</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Text className='font-JakartaMedium text-md text-gray-500'>Payment Status</Text>
                <Text className={`font-JakartaMedium capitalize text-md ${payment_status === 'paid' ? 'text-green-500' : 'text-gray-500'}`}>
                    {payment_status}
                </Text>
            </View>

        </View>
    )
}

export default RideCard