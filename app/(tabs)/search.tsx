import { View, Text, Button,} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'

const search = () => {
  return (
    <SafeAreaView>
      <Text>Search</Text>

      <Button title='Seed' onPress={() => seed().catch((err) => console.log("Failed to seed the database", err))}/>
    </SafeAreaView>
  )
}

export default search