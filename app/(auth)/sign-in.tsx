import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { Link } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {



  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 justify-center">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-full" />
          <Text className="text-2xl font-JakartaSemiBold text-black absolute bottom-5 left-5">Welcome to your account</Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            Icon={Mail}
            iconStyle={{ color: '#9CA3AF' }}
            placeholder="eg. john@gmaildsdfdf.com"
            onChangeText={(text) => console.log(text)}
          />
          <InputField
            label="Password"
            Icon={LockKeyhole}
            iconStyle={{ color: '#9CA3AF' }}
            placeholder="********"
            secureTextEntry={true}
          />

          {/* Sign Up Button */}
          <CustomButton title="Sign Up" className="mt-5" />

          {/* OAuth */}

          <OAuth />

          <Link href='/sign-up' className="text-lg text-center text-general-200 mt-10">
            <Text className="mr-2">Don&apos;t have an account? </Text>
            <Text className="text-blue-500 font-bold">Sign Up</Text>
          </Link>

        </View>
      </View>
    </ScrollView>
  );
};



export default SignIn;
