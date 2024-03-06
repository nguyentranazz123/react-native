import { View, Text , FlatList} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../BusinessListByCategoryScreen/BusinessListItem";

export default function BookingScreen(){
    const {user} = useUser();
    const [bookingList, setBookingList] = useState([]);
    const[loading, setLoading] = useState(false);
    useEffect(()=>{
        user&&getUserBookings();
    },[user])

    // Get User Booking
    const getUserBookings = () =>{
        setLoading(true)
        GlobalApi.getUserBookings(user?.primaryEmailAddress.emailAddress).then(resp=>{
            setBookingList(resp.bookings)
            setLoading(false)
        })
    }
    return (
        <View style={{padding:20}}>
            <Heading text='My Booking' />

            <View>
                <FlatList
                    data={bookingList}
                    onRefresh={()=>getUserBookings()}
                    refreshing={loading}
                    renderItem={({item, index})=>(
                        <BusinessListItem business={item?.businessList}
                            booking={item}
                        />
                    )}
                />
            </View>
        </View>

    )
}