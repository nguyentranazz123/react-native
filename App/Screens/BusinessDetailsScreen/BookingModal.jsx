import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';


export default function BookingModal({businessId, hideModal }) {
  const navigation = useNavigation();
  const [timeList, setTimeList] = useState(); //List Time to Select
  const [selectedDate, setSelectedDate] = useState(); //Select Date
  const [selectedTime, setSelectedTime] = useState(); //Select Time
  const {user} = useUser(); //Get User
  const [note, setNote] = useState(); //Add Note
  useEffect(() => {
    getTime();
  }, [])
  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ':00 AM'
      })
      timeList.push({
        time: i + ':30 AM'
      })
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ':00 PM'
      })
      timeList.push({
        time: i + ':30 PM'
      })
    }
    setTimeList(timeList);
  }
  // Create Booking Method
  
  const createBooking = () =>{
    if(!selectedTime||!selectedDate){
      ToastAndroid.show('Please select Date and Time!', ToastAndroid.LONG);
      return;
    }
    const data = {
      userName:user?.fullName,
      userEmail:user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: moment(selectedDate).format('DD-MMM-yyyy'),
      note: note,
      businessId:businessId
    }
    GlobalApi.createBooking(data).then(resp=>{
      ToastAndroid.show('Booking Successfully!', ToastAndroid.LONG)
      hideModal();

    })
    
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', marginBottom: 20, gap: 10, alightItem: 'center' }}
          onPress={() => hideModal()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 25 }}>Booking</Text>
        </TouchableOpacity>

        {/* Calendar Section */}
        <View>
          <Heading text={'Select Day'} />
          <View style={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={setSelectedDate}
              width={380}
              minDate={Date.now()}
              selectedDayColor={Colors.PRIMARY}
            />
          </View>
          {/* Time Select Section */}
          <View style={{ marginTop: 20 }}>
            <Heading text={'Select Time Slot'} />
            <FlatList
              data={timeList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                  <Text style={[selectedTime == item.time ? styles.selectedTime : styles.unSelectedTime]}>{item?.time}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          {/* Adding Note Section */}
          <View style={{ paddingTop: 20 }} />
          <Heading text={'Any Questions Note'} />
          <TextInput placeholder='Note' style={styles.noteTextArea}
            numberOfLines={4} multiline={true}
            onChange={(text) => setNote(text)}
          />
        </View>
        {/* Comfirm and Bookings Section */}
        <TouchableOpacity style={{ marginTop: 15 }}>
          <Text style={styles.confirmBtn} onPress={()=>createBooking()}>
            Confirm & Booking
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 30,
    borderRadius: 15
  },
  unSelectedTime: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    color: Colors.GRAY
  },
  selectedTime: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    paddingHorizontal: 18,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE
  },
  noteTextArea: {
    borderWidth: 0.5,
    textAlignVertical: 'top',
    padding: 8,
    fontFamily: 'outfit',
    fontSize: 16,
    borderColor: Colors.PRIMARY
  },
  confirmBtn: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2
  }
})
