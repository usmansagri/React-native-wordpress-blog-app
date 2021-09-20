import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Alert,Dimensions,Image, TouchableOpacity } from 'react-native';
import init from "../config/init"
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { SkeletonLayout } from "react-native-skeleton-loader-pulse";
import { ScrollView } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';

export default function BlogReader({route}){
    const [isLoading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);
    const { postId } = route.params;
    const[postTitle,setPostTitle]=useState();
    const[postExcerpt,setPostExcerpt]=useState();
    const[postContent,setPostContent]=useState();

    useEffect(() => {
      try {
        setLoading(true);
       getBlogPost();
      } catch (error) {
        Alert.alert("Error",""+error)
      }
    }, []);

    const getBlogPost = async () => {
      try {
       const response = await fetch(init.url+'/wp-json/wp/v2/posts/'+postId);
       const blogPostData = await response.json();
       setPostData(blogPostData);
       setPostExcerpt(blogPostData.excerpt.rendered);
       setPostContent(blogPostData.content.rendered);
       setPostTitle(blogPostData.title.rendered);
     } catch (error) {
       setLoading(false);
       Alert.alert("Error",""+error);
     } finally {
      setTimeout(() => {
        setLoading(false);
    }, 1000);
     }
   }

      const getExcerpt = ()=>{
        const source = {
          html: postExcerpt
        };
        return source;
      }

      const getContent = ()=>{
        const source = {
          html: postContent
        };
        return source;
      }

      // const speakContent=()=>{
      //   const thingToSay = postContent;
      //   Speech.speak(thingToSay);
      // }

      const tagsStyles = {
        body: {
           whiteSpace: 'normal',
           color: '#000',
         },
         b:{
           fontWeight:'bold'
         }
       };

    return(
        <View>
        {isLoading ? 
        <SkeletonLayout
        align="left"
        items={[
          {
            height: 200,
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
            height: 10,
            marginTop: 10,
            width: Dimensions.width,
          },
          {
            height: 10,
            marginTop: 5,
            width: Dimensions.width,
          },
          {
            height: 10,
            marginTop: 5,
            width: Dimensions.width,
          },
          {
            height: 10,
            marginTop: 5,
            width: Dimensions.width,
          },
          {
            height: 10,
            marginTop: 5,
            width: Dimensions.width,
          },
          {
            height: 10,
            marginTop: 5,
            width: Dimensions.width,
          },
          {
            height: 10,
            marginTop: 5,
            width: Dimensions.width,
          },
        ]}
      />
        
        
        : (
             <ScrollView style={{height:'100%'}} >
               
                 <View style={{padding:5,backgroundColor:'#fff',marginBottom:2}}>
                 {postData.featured_media>0?<Image style={{width:Dimensions.width,height:200}} source={{
                     uri: postData.imageLink
                   }}/>:null}
                 <Text style={{fontWeight:'bold',color:'#3578e5',fontSize:20,marginTop:5}}>{postTitle}</Text>
                 <Text style={{color:'#000',marginTop:10,fontWeight:'bold'}}>{moment(postData.date).format('LLL')}</Text>
                 <RenderHtml contentWidth={Dimensions.width} source={getExcerpt()} tagsStyles={tagsStyles}/>
                 {/* <TouchableOpacity onPress={speakContent}> */}
                 <RenderHtml contentWidth={Dimensions.width} source={getContent()} tagsStyles={tagsStyles}/>
                 {/* </TouchableOpacity> */}
                 </View>
             
             </ScrollView>
         
       
      
     )}
     </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
  