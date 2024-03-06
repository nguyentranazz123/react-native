import React, {useEffect, useState} from 'react'
import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GlobalApi from '../../Utils/GlobalApi';
import Colors from '../../Utils/Colors';
import BusinessListItem from './BusinessListItem';

export default function BusinessListByCategoryScreen() {
    const [businessList, setBusinessList] =useState([]);
    const param=useRoute().params;
    const navigation = useNavigation();
    useEffect(() =>{
            param&&getBusinessByCategory()
    },[param])
    const getBusinessByCategory=() =>{
        GlobalApi.getBusinessListByCategory(param.category).then(resp=>{
            console.log(resp.businessLists);
            setBusinessList(resp?.businessLists)
        })
    }
    return (
      <View style={{padding:20, paddingTop: 30}}>
      <TouchableOpacity style={{display:'flex', flexDirection:'row', gap:10, alightItem:'center'}}
      onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{fontFamily:'outfit-medium', fontSize:25}}>{param.category}</Text>
      </TouchableOpacity>
      {businessList?.length>0?<FlatList
        data={businessList}
        style={{marginTop:15}}
        renderItem={({item, index})=>(
        <BusinessListItem business={item}/>
        )}
      />:
      <Text style={{marginTop:'20%', fontFamily:'outfit-medium',
      fontSize:20, textAlign:'center', color:Colors.GRAY}}>No business found</Text>}
      </View>
    )
  }
  const styles = StyleSheet.create({
    container:{
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    subContainer:{
        display: 'flex',
        gap: 8
    },

    image:{
        width:100,
        height: 100,
        borderRadius:15,
    }
  })
