import React, {useState, useEffect} from "react";
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity} from "react-native";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function BusinessList(){
    const navigation=useNavigation();
    const [businessList, setBusinessList] =useState([]);
    useEffect(() =>{
        getBusinessList()
    },[])
    const getBusinessList = () => {
        GlobalApi.getBusinessList().then(resp => {
        //   console.log("nnn",resp);
          setBusinessList(resp?.businessLists);

      })
    }
    return(
        <View style={{marginTop:20}}>
        <Heading text='Lastest Business' isViewAll='true'/>

        <FlatList
        data={businessList}
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>(
            <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',{
                business:item
            })}>
           <Image source={{uri:item?.images[0]?.url}}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
            <Text style={{fontSize:17, fontFamily:'outfit-medium'}}>{item?.name}</Text>
            <Text style={{fontSize:13, fontFamily:'outfit', color:Colors.GRAY}}>{item?.contactPerson}</Text>
            <Text style={{fontSize:10, fontFamily:'outfit',
                           padding:3, color:Colors.PRIMARY,
                           borderRadius:3, alignSelf: 'flex-start',
                           backgroundColor: Colors.PRIMARY_LIGHT,
                           paddingHorizontal: 7}}>{item?.category.name}</Text>
            </View>
         
        </TouchableOpacity>
        )}
        />
        </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
        marginRight:10,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius:10,
    },
    image: {
        width:160,
        height:100,
        borderRadius:10,
    },
    infoContainer:{
        width:160,
        height:100,
        borderRadius:10,
    }

})
