import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import init from "../config/init"

export default function CategoryList({navigation})  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBlogCategories = async () => {
     try {
      const response = await fetch(init.url+'/wp-json/wp/v2/categories/');
      const json = await response.json();
      setData(json);
    } catch (error) {
      Alert.alert("Connection Error","Check your connection and try again.");
    } finally {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }
  }
  
  useEffect(() => {
    getBlogCategories();
  }, []);

  return (
      <SafeAreaView style={styles.container}>
        <View>
      {isLoading ? <ActivityIndicator/> : (
        
        <FlatList 
          data={data}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{
                navigation.navigate('CatModal',{
                    catid: item.id
                })
            }}>
              <Text style={{padding:20,backgroundColor:'#41a6d9',margin:5,fontWeight:'bold',color:'#fff'}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
      </SafeAreaView>
      );
    };

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#fff',
      justifyContent: 'center'
    },
  });
  