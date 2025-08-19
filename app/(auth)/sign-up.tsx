import InputField from "@/components/input-field";
import { images } from "@/constants";
import { UserRound } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-full" />
          <Text className="text-2xl font-JakartaSemiBold text-black absolute bottom-5 left-5">Create your account</Text>
        </View>

        <View className="p-5">
          <InputField
            label="Full Name"
            Icon={UserRound}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
