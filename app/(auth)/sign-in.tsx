import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [form, setForm] = useState({ email: '', password: '' })

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.push('/(root)/(tabs)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
    }
  }, [isLoaded, form.email, form.password])


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
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            Icon={LockKeyhole}
            iconStyle={{ color: '#9CA3AF' }}
            placeholder="********"
            secureTextEntry={true}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          {/* Sign Up Button */}
          <CustomButton title="Sign In" className="mt-5" onPress={onSignInPress} />

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
