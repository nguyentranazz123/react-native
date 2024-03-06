import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet,  FlatList, Image, TouchableOpacity} from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
    const [categories, setCategories] =useState([]);
    const navigation = useNavigation();
    useEffect(() =>{
        getCategories()
    },[])
    const getCategories = () => {
        GlobalApi.getCategories().then(resp => {
        //   console.log("mmm",resp);
          setCategories(resp?.categories);

      })
    }
    return (
      <View style={styles.iconContainer}>
        <Heading text='Categories' isViewAll='true'/>
        <FlatList
            data={categories}
            numColumns={4}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index})=>index<=3&&(
            <TouchableOpacity style={styles.container}
            onPress={()=>navigation.push('business-list', {
                category:item.name
            })}>
                <Image source={{uri:item?.icon?.url}}  style={{width:30, height:30}}
                />
                <Text style={{fontFamily:'outfit-medium', marginTop:10}}>{item?.name}</Text>
            </TouchableOpacity>
            )}
      />
      </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
    },
    iconContainer:{
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 17,
        borderRadius: 99,
    }
})


