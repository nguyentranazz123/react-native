import React from "react";
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import Colors from "../../Utils/Colors";
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const { user, isLoading } = useUser();
    return user && (
        <View style={styles.container}>
        {/* Profile Section */}
            <View style={styles.profileMainContainer}>
                <View style={styles.profileContainer}>
                    <Image source={{ uri: user?.imageUrl }}
                        style={styles.userImage}
                    />
                <View>
                    <Text style={{ color: Colors.WHITE, fontFamily:'outfit' }}>Welcome,</Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily:'outfit-medium' }}>{user?.fullName}</Text>

                </View>
                </View>
                <FontAwesome5 name="bookmark" size={23} color="white" />
            </View>
            {/* Search Bar Section */}
            <View style={styles.searchBarContainer}>
                <TextInput placeholder="Search" style={styles.textInput}/>
                <FontAwesome name="search" size={24} color={Colors.PRIMARY} style={styles.searchbtn} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99,
    },
    profileMainContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    container: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    textInput:{
        padding: 7,
        paddingHorizontal: 16,
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        width: '85%',
        fontSize:16,
        fontFamily:'outfit'
    },
    searchBarContainer: {
        margintop:20,
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginBottom:10,    
    },
    searchbtn:{
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:8,
    }

})