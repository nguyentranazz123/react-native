import React from "react";
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import BookingScreen from "../Screens/BookingScreen/BookingScreen";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from "../Utils/Colors";



const Tab = createBottomTabNavigator();


export default function TabNavigation(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarActiveTintColor:Colors.PRIMARY,
        }}>
            <Tab.Screen name='home' component={HomeScreen} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:15, marginTop:-7}}>Home</Text>
            ),
            tabBarIcon:({color, size})=>(
                <FontAwesome5 name="home" size={size} color= {color} />
            )
            }}/>
            <Tab.Screen name='profile' component={ProfileScreen}options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:15, marginTop:-7}}>Profile</Text>
            ),
            tabBarIcon:({color, size})=>(
                <AntDesign name="profile" size={size} color={color}/>
            )
            }}/>
            <Tab.Screen name='booking' component={BookingScreen}options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color, fontSize:15, marginTop:-7}}>Booking</Text>
            ),
            tabBarIcon:({color, size})=>(
                <Entypo name="bell" size={size} color={color} />
            )
            }}/>

        </Tab.Navigator>
    )
}