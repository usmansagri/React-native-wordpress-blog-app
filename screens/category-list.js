import React, { useEffect, useState } from 'react';
import { Dimensions, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import init from "../config/init"
import { SkeletonLayout } from "react-native-skeleton-loader-pulse";

export default function CategoryList({navigation})  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBlogCategories = async () => {
     try {
      const response = await fetch(init.url+'/wp-json/wp/v2/categories');
      const json = await response.json();
      setData(json);
    } catch (error) {
      Alert.alert("Error",""+error);
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
      <SafeAreaView>
        <View>
      {isLoading ? 
      
      <SkeletonLayout
      align="center"
      items={[
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        },
        {
          height: 55,
          margin: 5,
          padding:20,
          width: Dimensions.width,
        }
      ]}
    />
      : (
        
        <FlatList
        style={{height:'100%'}}
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
      justifyContent: 'center'
    },
  });
  