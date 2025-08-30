import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";

import CustomButton from "@/components/custom-button";
import RideLauout from "@/components/ride-layout";
import { icons } from "@/constants";
import { useDriverStore } from "@/store/useDriverStore";
import { useLocationStore } from "@/store/useLocationStore";
import { formatTime } from "@/utils/formatter";
import { useState } from "react";
import Payment from "@/components/payment";

const BookRide = () => {
    const { user } = useUser();
    const [isPayment, setIsPayment] = useState(false)
    const { userAddress, destinationAddress, userLatitude, userLongitude, destinationLatitude, destinationLongitude } = useLocationStore();
    const { drivers, selectedDriver } = useDriverStore();

    const driverDetails = drivers?.filter(
        (driver) => driver._id === selectedDriver,
    )[0];


    return (
        <RideLauout title="Book Ride">
            <>
                <Text className="text-xl font-JakartaSemiBold mb-3">
                    Ride Information
                </Text>

                <View className="flex flex-col w-full items-center justify-center mt-10">
                    <Image
                        source={{ uri: driverDetails?.profile_image_url }}
                        className="w-28 h-28 rounded-full"
                    />

                    <View className="flex flex-row items-center justify-center mt-5 space-x-2">
                        <Text className="text-lg font-JakartaSemiBold">
                            {driverDetails?.title}
                        </Text>

                        <View className="flex flex-row items-center space-x-0.5">
                            <Image
                                source={icons.star}
                                className="w-5 h-5"
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-JakartaRegular">
                                {driverDetails?.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
                    <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                        <Text className="text-lg font-JakartaRegular">Ride Price</Text>
                        <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                            ${driverDetails?.price ?? 10}
                        </Text>
                    </View>

                    <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                        <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
                        <Text className="text-lg font-JakartaRegular">
                            {formatTime(driverDetails?.time! ?? 5)}
                        </Text>
                    </View>

                    <View className="flex flex-row items-center justify-between w-full py-3">
                        <Text className="text-lg font-JakartaRegular">Car Seats</Text>
                        <Text className="text-lg font-JakartaRegular">
                            {driverDetails?.car_seats}
                        </Text>
                    </View>
                </View>

                <View className="flex flex-col w-full items-start justify-center mt-5">
                    <View
                        className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
                        <Image source={icons.to} className="w-6 h-6" />
                        <Text className="text-lg font-JakartaRegular ml-2">
                            {userAddress}
                        </Text>
                    </View>

                    <View className="flex  flex-row items-center justify-start border-b border-general-700 w-full py-3">
                        <Image source={icons.point} className="w-6 h-6" />
                        <Text className="text-lg font-JakartaRegular ml-2">
                            {destinationAddress}
                        </Text>
                    </View>
                </View>


                <CustomButton
                    title="Confirm Ride"
                    className="mt-10"
                    onPress={() => setIsPayment(true)}
                />


                <Payment
                    isPayment={isPayment}
                    amount={Number(driverDetails?.price)}
                    data={{
                        user_id: user?.id!,
                        driver_id: selectedDriver!,
                        destination_address: destinationAddress!,
                        origin_address: userAddress!,
                        origin_latitude: userLatitude!,
                        origin_longitude: userLongitude!,
                        destination_latitude: destinationLatitude!,
                        destination_longitude: destinationLongitude!,
                        fare_price: Number(driverDetails?.price),
                        ride_time: driverDetails?.time!,
                        payment_status: "paid"
                    }}
                />

            </>

        </RideLauout>
    );
};

export default BookRide;