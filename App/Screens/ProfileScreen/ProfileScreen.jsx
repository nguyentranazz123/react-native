import {Alert, View, Text, Image,FlatList,TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser, useAuth } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen(){
    const {user} = useUser();
    const navigation = useNavigation();
    const { signOut } = useAuth(); 
    const profileMenu=[
        {
            id:1,
            name:'Home',
            icon:'home'
        },
        {
            id:2,
            name:'My booking',
            icon:'bell'
        },
        {
            id:3,
            name:'Logout',
            icon:'logout'
        },
        {
            id:4,
            name:'Contact Us',
            icon:'contacts'
        }
    ]
    const handleLogout = () => {
        Alert.alert(
          "Logout", // Alert Title
          "Are you sure you want to log out?", // Alert Message
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => signOut(), // Proceed with the logout operation
            },
          ]
        );
      };

    return (
        <View>
        <View style={{padding:20, paddingTop:30, backgroundColor:Colors.PRIMARY}}>
            <Text style={{fontSize:30, fontFamily:'outfit-bold'}}>Profile</Text>
            <View style={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                padding:20,
                
            }}>
                <Image source={{uri:user.imageUrl}} style={{width:90, height:90, borderRadius:99}}/>
                <Text style={{fontSize:26, marginTop: 8, fontFamily:'outfit-medium', color:Colors.WHITE}}>
                {user.fullName}</Text>
                <Text style={{fontSize:16, marginTop: 8, fontFamily:'outfit-medium', color:Colors.WHITE}}>
                {user.primaryEmailAddress.emailAddress}</Text>
            </View>
        </View>
        <View style={{paddingTop:60}}>
            <FlatList
            data={profileMenu}
            renderItem={({item,index})=>(
                <TouchableOpacity style={{display:'flex', flexDirection:'row',
                alignItems:'center', gap:10, marginBottom:40,
                paddingHorizontal:80}} onPress={()=>{
                    if(item.name === 'My booking') {
                    navigation.navigate('booking'); 
                }
                else if(item.name === 'Home') {
                    navigation.navigate('home'); 
                }
                else if(item.name === 'Logout') {
                    //signOut();
                    handleLogout();
                    
                }
                }}>
               
                    <MaterialCommunityIcons name={item.icon} size={35} color={Colors.PRIMARY} />
                    <Text style={{fontFamily:'outfit', fontSize:20}}>{item.name}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
        </View>

    )
}