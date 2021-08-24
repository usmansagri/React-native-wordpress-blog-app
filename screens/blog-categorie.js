import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryScreen()  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getBlogCategories = async () => {
     try {
      const response = await fetch('http://wp.devlops.xyz/wp-json/wp/v2/categories/');
      const json = await response.json();
      setData(json);
    } catch (error) {
      Alert.alert(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlogCategories();
  }, []);

  return (
      
          <View style={{ flex: 1, padding: 5 }}>
      {isLoading ? <ActivityIndicator/> : (
        
        <FlatList 
          data={data}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>{Alert.alert(item.name)}}>
              <Text style={{padding:20,backgroundColor:'#41a6d9',margin:5,fontWeight:'bold',color:'#fff'}}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
      
    
  );
};