import GoogleTextInput from '@/components/google-text-input';
import Map from '@/components/map';
import RideCard from '@/components/ride-card';
import { images } from '@/constants';
import useRides from '@/hook/rides';
import { useLocationStore } from '@/store/useLocationStore';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Home = () => {

  const { user } = useUser()
  const { setUserLocation, setDestinationLocation } = useLocationStore()
  const router = useRouter()
  const { signOut } = useAuth()
  const { rides, fetchNextPage, hasNextPage, refetch, isLoading, isFetchingNextPage } = useRides()

  const handleDestinationPress = (location: { longitude: number, latitude: number, address: string }) => {
    setDestinationLocation(location)
    router.push('/(root)/find-rides')
  }

  const handleSignOut = () => {
    signOut()
    router.replace('/(auth)/sign-in')
  }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        // setHasPermission(false)
        return
      }

      const location = await Location.getCurrentPositionAsync()
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!
      })

      setUserLocation({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
        address: `${address[0].name} , ${address[0].region}`
      })

    })()

  }, [setUserLocation])

  return (
    <SafeAreaView className='flex-1 bg-general-500'>
      <FlatList
        data={rides}
        renderItem={({ item }) => <RideCard ride={item as any} />}
        keyboardShouldPersistTaps='always'

        contentContainerStyle={{
          paddingBottom: 100,
          gap: 10,
          paddingHorizontal: 10
        }}

        ListEmptyComponent={() => (
          <View className='flex-1 h-full justify-center items-center pb-10'>
            <Image source={images.noResult} className='size-[200px]' />
            <Text className='text-gray-500'>Sorry, no recent rides found</Text>
          </View>
        )}

        ListHeaderComponent={
          <View className='flex gap-5'>
            <View className='mt-5 flex flex-row justify-between'>

              {
                user?.firstName ? (
                  <Text className='text-2xl font-JakartaSemiBold'>
                    Welcome, {user?.firstName} 👋
                  </Text>
                ) : (
                  <Text className='text-2xl font-JakartaSemiBold'>
                    Welcome, {user?.emailAddresses[0].emailAddress.split('@')[0]} 👋
                  </Text>
                )
              }

              <TouchableOpacity onPress={handleSignOut}>
                <LogOut color="gray" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              containerStyle='elevation-md elevation-neutral-300'
              handlePress={handleDestinationPress}
            />

            <Text className='text-2xl font-JakartaSemiBold'>Your current location</Text>

            <View className='relative w-full h-[300px] bg-transparent'>
              <Map />
            </View>

            <Text className='text-xl font-JakartaBold'>
              Recent Rides
            </Text>
          </View>
        }

        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }

        onEndReached={() => {
          hasNextPage && fetchNextPage();
        }}

        ListFooterComponent={() => (
          <>
            {isFetchingNextPage &&
              <View className='py-2'>
                <ActivityIndicator size={20} color="#00ba16" />
              </View>}
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
