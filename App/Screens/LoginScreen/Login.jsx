import{View, Text, Image, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login(){
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
 
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
   
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);
   
    return(
        <View style={{alignItems:'center'}}>
            <Image source={require('./../../../assets/images/login.png')}
                style={styles.loginImage} 
            />
            <View style={styles.subContainer}>
            <View style={styles.subContainer}>
                <Text style={{fontSize: 27, color:Colors.WHITE, textAlign: 'center'}}>   
                Let's Find  
                <Text style={{fontWeight:'bold'}} > Professional Cleaning and Repair </Text> 
                Services 
                </Text>
                <Text style={{fontSize: 17, color: Colors.WHITE,
                 textAlign: 'center', marginTop: 20}}>Best app to find services near you which deliver you a professional service </Text>
                <TouchableOpacity style={styles.button}
                onPress={onPress}>
                    <Text style={{fontWeight:'bold',textAlign:'center',fontSize: 17, color:Colors.PRIMARY}}>Let's get started!</Text>
                </TouchableOpacity>
           </View>
                
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    loginImage:{
        width: 230,
        height: 450,
        marginTop: 70,
        borderWidth: 4,
        borderColor: Colors.BLACK,
        borderRadius: 15,
    },
    subContainer:{
        width: '100%',
        backgroundColor: Colors.PRIMARY,
        height: '70%',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 20
    },
    button:{
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 99,
        marginTop: 40
    }
})
