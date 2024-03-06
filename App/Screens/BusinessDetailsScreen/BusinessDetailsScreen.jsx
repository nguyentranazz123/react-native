import { Link, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BookingModal from './BookingModal';
import {Linking} from 'react-native';
export default function BusinessDetailsScreen() {
  const [isReadMore, setIsReadMore] = useState(false); //About Me
  const [showModal, setShowModal] = useState(false); //modal Booking 
  const navigation = useNavigation();
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  useEffect(() => {

  }, [])
  const onMessageBtnClick =()=>{
    Linking.openURL('mailto:'+business.email+"?subject= I am looking for you Service&body=Hi there, ");

  }
  return business && (
    <View>
    <ScrollView style={{height:'90%'}}>
      <TouchableOpacity style={styles.backBtnContainer}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />

      </TouchableOpacity>
      <Image source={{ uri: business?.images[0]?.url }}
        style={{ width: '100', height: 300 }} />
      <View style={styles.infoContainer}>
        <Text style={{fontFamily:'outfit-bold', fontSize:25}}>{business.name}</Text>
        <View style={styles.subContainer} >
        <Text style={{fontFamily:'outfit-medium', fontSize:20, 
        color: Colors.PRIMARY}}>{business.contactPerson}*</Text>
        <Text style={{padding: 5,color:Colors.PRIMARY,fontSize:14, backgroundColor:Colors.PRIMARY_LIGHT, borderRadius:5 }}>{business?.category.name}</Text>
        </View>
        <Text style={{fontFamily:'outfit', color:Colors.GRAY, fontSize:20}}> <Ionicons name="location" size={15} color="black"/>{business?.address}</Text>
        
        {/* Line */}
        <View style={{borderWidth:0.5, marginTop: 20, borderColor:Colors.GRAY}}></View>
      

        {/* About */}

        <Heading text={'About'}/>
        <Text style={{fontFamily:'outfit', color: Colors.GRAY, fontSize: 16 ,
        lineHeight: 28}}numberOfLines={isReadMore?20:5} >{business.about}</Text>
        <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
        <Text style={{fontFamily:'outfit', color: Colors.PRIMARY, fontSize:16}}>{isReadMore?'Less':'More'}</Text>
        </TouchableOpacity>

        {/* Line */}
        <View style={{borderWidth:0.5, marginTop: 20, borderColor:Colors.GRAY}}></View>

      </View>




    </ScrollView>
      <View style={{display:'flex', flexDirection:'row', gap: 8}}>
        <TouchableOpacity style={styles.messageBtn} onPress={()=>onMessageBtnClick()}>
        
            <Text style={{fontFamily:'outfit-medium',
            textAlign:'center', color:Colors.PRIMARY,
            fontSize:18}}>Message</Text>

        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bookingBtn} onPress={()=>setShowModal(true)}>
            <Text style={{fontFamily:'outfit-medium',
            textAlign:'center', color:Colors.WHITE,
            fontSize:18}}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal Screen */}
      <Modal 
      animationType='slide'
      visible={showModal}>
      <BookingModal
       businessId={business.id} hideModal={()=>setShowModal(false)}/>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20
  },
  subContainer: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center'

  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7,
  },
  messageBtn:{
    padding: 20,
    backgroundColor:Colors.WHITE,
    borderWidth: 1,
    bordrColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1
  },
  bookingBtn:{
    padding: 20,
    backgroundColor:Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1

  }

})
