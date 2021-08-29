import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 


export default function ModalPostView(){
    return(
       <View style={styles.container}>         
          <FontAwesome name="newspaper-o" size={75} color="#999999" />
          <Text style={{color:'#999999',fontWeight:'bold',}}>FETCH POST HERE</Text>
          <StatusBar style="light"/>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  