import { icons } from '@/constants'
import useOAuth from '@/utils/oAuth'
import { useRouter } from 'expo-router'
import React from 'react'
import { Alert, Image, Text, View } from 'react-native'
import CustomButton from './custom-button'



const OAuth = () => {

    const { handleOAuth } = useOAuth()
    const router = useRouter()

    const handleOAuthSignIn = async () => {
        try {
            const result = await handleOAuth()
            if (result.code === 'session_exists') {
                Alert.alert('Success', 'You have already signed in')
                router.push('/(root)/(tabs)/home')
            }
        } catch (error: any) {
            console.log(error.message)
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