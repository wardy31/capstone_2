import {View,Text} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Setting from './Setting'
import UserProfile from './UserProfile'
function NavigationSettings() {
  const Tab =createNativeStackNavigator()
//   return (
//     // <Tab.Navigator screenOptions={{headerShown:false}}>
//     //     <Tab.Screen name='Setting' component={Setting}></Tab.Screen>
//     //     <Tab.Screen name='UserProfile' component={UserProfile}></Tab.Screen>
//     // </Tab.Navigator>
//   )
}

export default NavigationSettings