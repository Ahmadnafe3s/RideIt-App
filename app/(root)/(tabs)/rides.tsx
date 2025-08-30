import RideCard from "@/components/ride-card";
import { images } from "@/constants";
import useRides from "@/hook/rides";
import React from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {

  const { rides, fetchNextPage, hasNextPage, refetch, isLoading, isFetchingNextPage } = useRides()

  return (
    <SafeAreaView>
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
          <Text className='text-2xl font-JakartaBold'>
            All Rides
          </Text>
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

export default Rides;
