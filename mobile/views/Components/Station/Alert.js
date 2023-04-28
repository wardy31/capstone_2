import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

const Alert = ({navigation}) => {
    useEffect(() =>{
        setTimeout(() => {
            navigation.goBack()
        }, 3000);
    },[])
  return (
    <View>
      <Text>Alert</Text>
    </View>
  )
}

export default Alert