import { Tabs } from "expo-router";
import { Bike, CircleUserRound, House, MessageCircleDashed } from "lucide-react-native";
import React, { ComponentType } from "react";
import { View } from "react-native";

const Layout = () => {

  const TabIcon = ({ focused, Icon }: { focused: boolean, Icon: ComponentType<any> }) => {
    return (
      <View className={`p-3 rounded-full ${focused && 'bg-green-600'}`}>
        <Icon size={32} color="white" />
      </View>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          height: 70,
          marginHorizontal: 20,
          bottom: 20,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
      }}
    >
      <Tabs.Screen name="home" options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={House} />
      }} />

      <Tabs.Screen name="rides" options={{
        title: 'Rides',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={Bike} />
      }} />

      <Tabs.Screen name="chat" options={{
        title: 'Chat',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={MessageCircleDashed} />
      }} />

      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} Icon={CircleUserRound} />
      }} />

    </Tabs>
  );
};

export default Layout;
