import CustomButton from "@/components/custom-button";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [index, setIndex] = useState(0);
  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        className="w-full items-end p-5"
        onPress={() => router.push("/sign-in")}
      >
        <Text className="font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="h-1 w-8 rounded-full bg-secondary-200" />}
        activeDot={<View className="h-1 w-8 rounded-full bg-black" />}
        onIndexChanged={(index) => setIndex(index)}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="flex items-center justify-center bg-white p-5"
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="mt-10 flex gap-5">
              <Text className="mt-5 font-bold text-3xl mx-10 text-center">
                {item.title}
              </Text>
              <Text className="text-md font-JakartaRegular text-center text-[#858585]">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={index === onboarding.length - 1 ? "Get Started" : "Next"}
        className="mb-10 rounded-full"
        onPress={() => {
          if (index === onboarding.length - 1) {
            router.replace("/(auth)/sign-up");
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Welcome;
