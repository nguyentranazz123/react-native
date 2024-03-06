import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../../Utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function BusinessListItem({ business, booking }) {
  const navigation = useNavigation();
  
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => navigation.push('business-detail', {
        business: business
      })}
      >
        <Image source={{ uri: business?.images[0]?.url }}
          style={styles.image}
        />
        <View style={styles.subContainer}>
          <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 15 }}>{business?.contactPerson}</Text>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 19 }}>{business?.name}</Text>
          <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 16 }}> <Ionicons name="location" size={20} color="black" />{business?.address}</Text>
          {booking?.id ? <Text style={{
            color: Colors.WHITE, alignSelf: 'flex-start', backgroundColor: Colors.PRIMARY_LIGHT, fontFamily: 'outfit', color: Colors.GRAY
            , fontSize: 16
          }}>{booking?.bookingStatus} </Text> : null}
          {booking?.id ? <Text style={{
            fontFamily: 'outfit', color: Colors.GRAY
            , fontSize: 16
          }}> <MaterialIcons name="date-range" size={23} color="black" /> {booking?.date} at {booking?.time} </Text> : null}


        </View>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  subContainer: {
    display: 'flex',
    gap: 8
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  }
})
