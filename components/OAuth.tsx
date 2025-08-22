import { icons } from '@/constants'
import React from 'react'
import { Image, Text, View } from 'react-native'
import CustomButton from './custom-button'
import AxiosInstance from '@/lib/axios'


const OAuth = () => {

    const handleOAuthSignIn = async () => {
        console.log('OAuth Sign In')
        try {
            const res = await AxiosInstance.get('/')
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <View className='flex flex-row justify-center items-center mt-5 gap-x-3'>
                <View className='w-full h-px bg-general-100' />
                <Text className='text-lg text-gray-400'>Or</Text>
                <View className='w-full h-px bg-general-100' />
            </View>

            <CustomButton
                title='Login with Google'
                leftIcon={<Image source={icons.google} className='w-6 h-6' />}
                className='mt-5'
                variant='outlined'
                onPress={handleOAuthSignIn}
            />
        </View>
    )
}

export default OAuth