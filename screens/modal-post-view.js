import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert ,Image,Dimensions,ScrollView} from 'react-native';
import init from "../config/init"
import moment from 'moment';
import { SkeletonLayout } from "react-native-skeleton-loader-pulse";
import RenderHtml from 'react-native-render-html';

export default function ModalPostView({route}){
   const [catPost, setPostData] = useState([]);
   const { postId } = route.params;
   const [isLoading, setLoading] = useState(false);
   const[postTitle,setPostTitle]=useState();
   const[postExcerpt,setPostExcerpt]=useState();
   const[postContent,setPostContent]=useState();

   useEffect(() => {
    setLoading(true);
    getBlogPost(postId);
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

    const tagsStyles = {
      body: {
         whiteSpace: 'normal',
         color: '#000',
       },
       b:{
         fontWeight:'bold'
       }
     };

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

    return(
       <View>
          {isLoading?
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
          :(
            <ScrollView style={{height:'100%'}}>
           <View>
             <View style={{padding:5,backgroundColor:'#fff',marginBottom:2}}>
              {catPost.featured_media>0?<Image style={{width:Dimensions.width,height:200}} source={{
                  uri: catPost.imageLink
                }}/>:null}
              <Text style={{fontWeight:'bold',color:'#3578e5',fontSize:20,marginTop:5}}>{postTitle}</Text>
              <Text style={{color:'#000',marginTop:10,fontWeight:'bold'}}>Published: {moment(catPost.date).startOf('hour').fromNow()}</Text>
              <RenderHtml contentWidth={Dimensions.width} source={getExcerpt()} tagsStyles={tagsStyles}/>
                 <RenderHtml contentWidth={Dimensions.width} source={getContent()} tagsStyles={tagsStyles}/>
              </View>
              </View>
              </ScrollView>
       )}
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
  