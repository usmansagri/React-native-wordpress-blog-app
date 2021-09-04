import React, { useEffect, useState } from 'react';
import { Dimensions, Alert, FlatList, Text, TouchableOpacity, View,Image, StyleSheet, SafeAreaView, } from 'react-native';
import RenderHtml from 'react-native-render-html';
import init from "../config/init";
import moment from 'moment';
import { SkeletonLayout } from "react-native-skeleton-loader-pulse";

export default function HomeScreen(){
    const [isLoading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [post, setPostData] = useState([]);

    const getBlogPosts = async () => {
        try {
         const response = await fetch(init.url+'/wp-json/wp/v2/posts');
         const jsonPost = await response.json();
         setPostData(jsonPost);
       } catch (error) {
         setIsFetching(false);
         setLoading(false);
         Alert.alert("Error",""+error);
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
      <SafeAreaView> 
        <View>
               {isLoading ? 
               <View>
               <SkeletonLayout
               align="left"
               items={[
                 {
                   height: 180,
                   width: Dimensions.width,
                 },
                 {
                   height: 10,
                   marginTop: 5,
                   width: Dimensions.width,
                 },
                 {
                   height: 10,
                   marginTop: 1,
                   width: Dimensions.width,
                 },
                 {
                   height: 10,
                   width: 150,
                 },
                 {
                   marginTop: 10,
                   height: 10,
                   width: 100,
                 },
                 {
                  marginTop: 10,
                  height: 10,
                  width: Dimensions.width,
                },
                {
                  height: 10,
                  width: Dimensions.width,
                },
                {
                  height: 10,
                  width: Dimensions.width,
                },
                {
                  height: 10,
                  width: 200,
                },
               ]}
             />
             <SkeletonLayout
               align="left"
               items={[
                 {
                   height: 180,
                   width: Dimensions.width,
                 },
                 {
                   height: 10,
                   marginTop: 5,
                   width: Dimensions.width,
                 },
                 {
                   height: 10,
                   marginTop: 1,
                   width: Dimensions.width,
                 },
                 {
                   height: 10,
                   width: 150,
                 },
                 {
                   marginTop: 10,
                   height: 10,
                   width: 100,
                 },
                 {
                  marginTop: 10,
                  height: 10,
                  width: Dimensions.width,
                },
                {
                  height: 10,
                  width: Dimensions.width,
                },
                {
                  height: 10,
                  width: Dimensions.width,
                },
                {
                  height: 10,
                  width: 200,
                },
               ]}
             />
             <SkeletonLayout
          align="left"
          items={[
            {
              height: 180,
              width: Dimensions.width,
            },
            {
              height: 10,
              marginTop: 5,
              width: Dimensions.width,
            },
            {
              height: 10,
              marginTop: 1,
              width: Dimensions.width,
            },
            {
              height: 10,
              width: 150,
            },
            {
              marginTop: 10,
              height: 10,
              width: 100,
            },
          ]}
        />
        </View>
               : (
         <FlatList 
         style={{height:'100%'}}
         onRefresh={onRefresh}
         refreshing={isFetching}
          data={post}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>Alert.alert("Coming soon","Blog reader feature will be available soon!")}>
              <View style={{padding:5,backgroundColor:'#fff',marginBottom:2}}>
                {item.featured_media>0?<Image style={{width:Dimensions.width,height:180}} source={{
                  uri: item.imageLink
                }}/>:null}
              <Text style={{fontWeight:'bold',color:'#3578e5',fontSize:20,marginTop:5}}>{item.title.rendered}</Text>
              <Text style={{color:'#000',marginTop:10,fontWeight:'bold'}}>Published {moment(item.date).startOf('hour').fromNow()}</Text>
              <RenderHtml contentWidth={Dimensions.width} source={getExcerpt(item)} tagsStyles={tagsStyles} />
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
