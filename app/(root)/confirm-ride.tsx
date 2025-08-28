import CustomButton from '@/components/custom-button'
import DriverCard from '@/components/driver-card'
import RideLauout from '@/components/ride-layout'
import { useDriverStore } from '@/store/useDriverStore'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'


const ConfirmRide = () => {
    const router = useRouter()
    const { selectedDriver, setSelectedDriver, drivers } = useDriverStore()

    return (
        <RideLauout title='Choose a Driver' snapPoints={['40%', '75%']}>
            <FlatList
                data={drivers}
                renderItem={({ item }) => <DriverCard
                    item={item}
                    selected={selectedDriver!}
                    setSelected={() => setSelectedDriver(item.id)}
                />}
                keyExtractor={(_, index) => index.toString()}
                ListFooterComponent={() => (
                    <CustomButton
                        title='Select Ride'
                        className='mt-10'
                        onPress={() => router.push('/(root)/book-ride')}
                    />
                )}
            />
        </RideLauout>
    )
}

export default ConfirmRide