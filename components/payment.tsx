import { images } from '@/constants'
import { RideService } from '@/services/ride'
import { CreateRide } from '@/types/type'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { HandCoins } from 'lucide-react-native'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import CustomButton from './custom-button'

interface PaymentProps {
    isPayment: boolean
    title?: string
    amount: number
    data: CreateRide
}

const Payment = ({ isPayment, title, amount, data }: PaymentProps) => {
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false)
    const router = useRouter()

    const { mutate, isPending } = useMutation({
        mutationFn: () => RideService.createRide(data),
        onSuccess: () => {
            setIsPaymentConfirmed(true)
        },
        onError: (err) => {
            console.log(err)
        }
    })


    return (
        <>
            <Modal isVisible={isPayment} animationIn='fadeInUp' animationOut='fadeOutDown'>
                <View className='mt-10 bg-white h-[350px] rounded-2xl p-5 flex flex-col items-center justify-center'>
                    {isPaymentConfirmed ? (
                        <>
                            <Image source={images.check} className="size-[110px] mx-auto my-5" />
                            <Text className='text-3xl font-JakartaBold'>Ride Booked!</Text>
                            <Text className='text-gray-500 text-center mt-2 mx-5'>
                                {title ?? 'Thanks for booking your ride with us, your ride is confirmed'}
                            </Text>
                            <CustomButton
                                title="Back to Home"
                                className="mt-5"
                                onPress={() => router.push('/(root)/(tabs)/home')}
                            />
                        </>
                    ) : (
                        <>
                            <View className='bg-green-100 p-5 rounded-full'>
                                <HandCoins size={70} color='#00ba16' />
                            </View>
                            <Text className='text-4xl font-JakartaBold text-green-500 mt-4'>${amount}</Text>
                            <Text className='text-gray-500 mt-2 text-center mx-5'>
                                {title ?? 'This is an estimate of the fare for your ride , please confirm the payment'}
                            </Text>
                            <CustomButton
                                title={`Pay $${amount}`}
                                className="mt-10"
                                loading={isPending}
                                onPress={() => {
                                    mutate()
                                }}
                            />
                        </>
                    )}
                </View>
            </Modal>
        </>
    )
}

export default Payment