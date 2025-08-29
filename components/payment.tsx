import { RideService } from '@/services/ride'
import { CreateRide } from '@/types/type'
import { useMutation } from '@tanstack/react-query'
import { HandCoins } from 'lucide-react-native'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import CustomButton from './custom-button'
import { icons } from '@/constants'

interface PaymentProps {
    isPayment: boolean
    onPaymentConfirmed: () => void
    title?: string
    amount: number
    data: CreateRide
}

const Payment = ({ isPayment, onPaymentConfirmed, title, amount, data }: PaymentProps) => {
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false)


    const { mutate } = useMutation({
        mutationFn: () => RideService.createRide(data),
        onSuccess: () => {
            onPaymentConfirmed()
        }
    })


    return (
        <>
            <Modal isVisible={isPayment && !isPaymentConfirmed} >
                <View className='mt-10 bg-white h-[300px] rounded-2xl p-5 flex flex-col items-center justify-center'>
                    <View className='bg-green-100 p-5 rounded-full'>
                        <HandCoins size={50} color='#00ba16' />
                    </View>
                    <Text className='text-4xl font-JakartaBold text-green-500 mt-4'>${amount}</Text>
                    <Text className='text-gray-500 mt-2'>{title ?? 'Estimate fare for your ride'}</Text>
                    <CustomButton
                        title={`Pay $${amount}`}
                        className='mt-10'
                        onPress={() => setIsPaymentConfirmed(true)}
                    />
                </View>
            </Modal>


            <Modal isVisible={isPaymentConfirmed}>
                <View className='mt-10 bg-white h-[300px] rounded-2xl p-5 flex flex-col items-center justify-center'>
                  <View className='bg-green-500 flex justify-center items-center  rounded-full'>
                        <Image source={icons.checkmark} className='w-20 h-20' />
                  </View>
                    <Text className='text-gray-500 mt-2'>{title ?? 'Estimate fare for your ride'}</Text>
                    <CustomButton
                        title={`Pay $${amount}`}
                        className='mt-10'
                        onPress={onPaymentConfirmed}
                    />
                </View>
            </Modal>
        </>
    )
}

export default Payment