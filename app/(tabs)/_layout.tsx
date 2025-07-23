import { View, Text, Image } from 'react-native'
import React from 'react'
import { Redirect, Slot, Tabs } from 'expo-router'
import useAuthStore from '@/store/auth.store'
import { TabBarIconProps } from '@/type'
import { images } from '@/constants'
import cn from 'clsx'

const TabBarIcon = ({focused, icon, title}: TabBarIconProps) => {
  return (
    <View className='tab-icon'>
      <Image source={icon} className='size-7' resizeMode='contain' tintColor={focused ? '#FE8C00' : '#5D5F6D'}/>
      <Text className={cn('text-sm font-bold', focused ? 'text-primary' : 'text-gray-200')}>
        {title}
      </Text>
    </View>
  )
}

export default function TabLayout() {
  const {isAuthenticated} = useAuthStore();

  if(!isAuthenticated) return <Redirect href="/sign-in" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => <TabBarIcon title="Home" icon={images.home} focused={focused}/>
        }}
      />
    </Tabs>
  )
  
}
