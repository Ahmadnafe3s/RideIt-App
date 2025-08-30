import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {

  const { user } = useUser()

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-general-1500 pb-10 px-2.5">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl font-JakartaBold mb-5">My Profile</Text>

        <View className="gap-5 flex items-center bg-white w-full px-5 py-10 rounded-3xl">

          <Image source={{ uri: user?.imageUrl }} className="size-[110px] rounded-full bg-green-500" />

          <View className="flex flex-row items-center justify-center border border-blue-400 py-2 px-4 rounded-full bg-blue-50">
            {
              user?.firstName ? (
                <>
                  <Text className="text-lg font-JakartaRegular text-blue-600">{user?.firstName}</Text>
                  <Text>{" "}</Text>
                  <Text className="text-lg font-JakartaRegular text-blue-600">{user?.lastName}</Text>
                </>
              ) : (
                <Text className="text-lg font-JakartaSemiBold text-blue-600">
                  {user?.emailAddresses[0].emailAddress.split('@')[0]}
                </Text>
              )
            }
          </View>


          <View className="flex w-full gap-2">
            <Text className="text-xl ml-2">username</Text>
            <View className="rounded-full bg-neutral-100 p-5 flex flex-row items-center">
              {
                user?.firstName ? (
                  <>
                    <Text className="text-lg font-JakartaRegular">{user?.firstName}</Text>
                    <Text>{" "}</Text>
                    <Text className="text-lg font-JakartaRegular">{user?.lastName}</Text>
                  </>
                ) : (
                  <Text className="text-lg font-JakartaSemiBold">
                    {user?.emailAddresses[0].emailAddress.split('@')[0]}
                  </Text>
                )
              }
            </View>
          </View>

          <View className="flex w-full gap-2">
            <Text className="text-xl ml-2">email</Text>
            <View className="rounded-full bg-neutral-100 p-5 flex flex-row items-center justify-between">
              <Text className="text-lg font-JakartaSemiBold">
                {user?.emailAddresses[0].emailAddress}
              </Text>
              <Text className="bg-green-500 py-1 px-2 rounded-full text-white">verified</Text>
            </View>
          </View>

          <View className="h-px w-full bg-neutral-200 " />

          <View className="flex flex-row w-full items-center justify-between">
            <Text className="text-neutral-500 text-lg">Status</Text>
            <Text className="text-green-500 text-lg">Active</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
