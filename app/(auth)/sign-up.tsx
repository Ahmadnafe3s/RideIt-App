import CustomButton from "@/components/custom-button";
import InputField from "@/components/input-field";
import OAuth from "@/components/OAuth";
import { images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { LockKeyhole, Mail, MoveRight, UserRound } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";


const SignUp = () => {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const [verification, setVerification] = useState({
    code: '',
    status: 'default',
    error: ''
  })


  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        firstName: form.name,
        lastName: form.name,
        emailAddress: form.email,
        password: form.password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      // Set verification state to pending
      setVerification({ ...verification, status: 'pending' })
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        setVerification({ ...verification, status: 'success' })
      } else {
        setVerification({ ...verification, error: 'Verification failed' })
      }
    } catch (err: any) {
      setVerification({ ...verification, error: err.errors[0].longMessage })
    }
  }


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
            iconStyle={{ color: '#9CA3AF' }}
            placeholder="eg. John Doe"
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <InputField
            label="Email"
            Icon={Mail}
            iconStyle={{ color: '#9CA3AF' }}
            placeholder="eg. john@gmaildsdfdf.com"
            keyboardType="email-address"
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
          <CustomButton title="Sign Up" className="mt-5" onPress={onSignUpPress}
          />

          {/* OAuth */}

          <OAuth />

          <Link href='/sign-in' className="text-lg text-center text-general-200 mt-10">
            <Text className="mr-2">Already have an account? </Text>
            <Text className="text-blue-500 font-bold">Sign In</Text>
          </Link>



          {/* Verification Modal */}

          <ReactNativeModal isVisible={verification.status === 'pending'} onModalHide={() => { if (verification.status === 'success') setIsSuccessModal(true) }}>
            <View className="min-h-[300px] bg-white rounded-3xl px-7 py-9">
              <Text className="text-2xl font-JakartaBold">Verification</Text>
              <Text className="text-base font-JakartaRegular mt-2 mb-5 text-gray-400" >We&apos;ve sent a verification code to {form.email}</Text>
              <InputField
                label="Code"
                Icon={LockKeyhole}
                iconStyle={{ color: '#9CA3AF' }}
                labelStyle="font-JakartaBold"
                placeholder="eg.123456"
                keyboardType="numeric"
                onChangeText={(text) => setVerification({ ...verification, code: text })}
              />

              {verification.error && <Text className="text-base text-red-500 mt-1">{verification.error}</Text>}

              <CustomButton
                title="Verify Email"
                className="mt-5"
                variant="success"
                onPress={onVerifyPress}
              />
            </View>
          </ReactNativeModal>


          {/* Success Modal */}

          <ReactNativeModal isVisible={isSuccessModal}>
            <View className="min-h-[300px] bg-white rounded-3xl px-7 py-9">
              <Image source={images.check} className="size-[110px] mx-auto my-5" />
              <Text className="text-center text-3xl font-JakartaBold">Verified</Text>
              <Text className="text-center text-base font-JakartaRegular mt-2 text-gray-400">You have successfully verified your account.</Text>
              <CustomButton
                title="Browse Home"
                className="mt-5"
                variant="success"
                rightIcon={<MoveRight color="#f0f0f0" />}
                onPress={() => {
                  setIsSuccessModal(false)
                  router.push('/(root)/(tabs)/home')
                }}
              />
            </View>
          </ReactNativeModal>

        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
