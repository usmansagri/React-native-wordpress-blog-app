import React, { useEffect, useState } from 'react';
import { Dimensions,ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View,Image, StyleSheet, SafeAreaView, } from 'react-native';
import RenderHtml from 'react-native-render-html';
import init from "../config/init"

export default function HomeScreen(){
    const [isLoading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [post, setPostData] = useState([]);

    const getBlogPosts = async () => {
        try {
         const response = await fetch(init.url+'/wp-json/wp/v2/posts/');
         const jsonPost = await response.json();
         setPostData(jsonPost);
       } catch (error) {
         setIsFetching(false);
         setLoading(false);
         Alert.alert("Connection Error","Check your connection and try again.");
       } finally {
        setTimeout(() => {
          setIsFetching(false);
          setLoading(false);
      }, 1000);  
       }
     }
     
     const onRefresh = () => {
     setIsFetching(true);
      getBlogPosts();
    };

    
     
     useEffect(() => {
        getBlogPosts();
      }, []);
      

      const getExcerpt = (item)=>{
        const source = {
          html: item.excerpt.rendered
        };
        return source;
      }

      const tagsStyles = {
       body: {
          whiteSpace: 'normal',
          color: '#000',
          
        },
      };

    return(
      <SafeAreaView style={styles.container}> 
        <View>
               {isLoading ? <ActivityIndicator /> : (
         <FlatList 
         onRefresh={onRefresh}
         refreshing={isFetching}
          data={post}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View style={{padding:5,backgroundColor:'#fff',margin:0,borderBottomWidth:1,borderColor:'#eee'}}>
                {item.featured_media>0?<Image style={{width:Dimensions.width,height:180}} source={{
                  uri: item.imageLink
                }}/>:null}
              <Text style={{fontWeight:'bold',color:'#3578e5',fontSize:20,marginTop:5}}>{item.title.rendered}</Text>
              <Text style={{color:'#000',marginTop:10}}>{item.date}</Text>
              <RenderHtml source={getExcerpt(item)} tagsStyles={tagsStyles} />
              </View>
            </TouchableOpacity>
          )
        }
        />
      )}
      </View>
      </SafeAreaView>   
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
