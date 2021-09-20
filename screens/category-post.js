import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList, Alert,TouchableOpacity,Dimensions,Image } from 'react-native';
import init from "../config/init"
import moment from 'moment';
import { SkeletonLayout } from "react-native-skeleton-loader-pulse";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CategoryPost({route,navigation}){
    const [isLoading, setLoading] = useState(false);
    // const [blogcatid,setCatId]=useState();
    const [catPost, setCatPostData] = useState([]);
    const { catid } = route.params;
   
    // const getCatId = (id) =>{
    //     const paramId= JSON.stringify(id);
    //     setCatId(paramId);      
    // }

    useEffect(() => {
      try {
        setLoading(true);
        getCatBlogPosts();
      } catch (error) {
        Alert.alert("Error",""+error)
      }
    }, []);

   function emptyListComponent(){
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center',marginTop:'50%'}}>
        <MaterialCommunityIcons name="post-outline" size={100} color="#999999" />
        <Text style={{color:'#999999'}}>No posts found in this category!</Text>
      </View>
    )
  }

    const getCatBlogPosts = async () => {
      try {
       const response = await fetch(init.url+'/wp-json/wp/v2/posts/?categories='+catid);
       const jsonPost = await response.json();
       setCatPostData(jsonPost);
     } catch (error) {
       setLoading(false);
       Alert.alert("Error",""+error);
     } finally {
      setTimeout(() => {
        setLoading(false);
    }, 1000);
     }
   }
  
   //getCatBlogPosts(blogcatid);

    return(
      <View >
         {isLoading ? (
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
           ]}
         />
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
         ): (
         <FlatList 
         style={{height:'100%'}}
         ListEmptyComponent={emptyListComponent}
          data={catPost}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>  navigation.navigate('CatPostModal',{
              postId:item.id
            })}>
              <View style={{padding:5,backgroundColor:'#fff',marginBottom:2}}>
              {item.featured_media>0?<Image style={{width:Dimensions.width,height:200}} source={{
                  uri: item.imageLink
                }}/>:null}
              <Text style={{fontWeight:'bold',color:'#3578e5',fontSize:20,marginTop:5}}>{item.title.rendered}</Text>
              <Text style={{color:'#000',marginTop:10,fontWeight:'bold'}}>Published {moment(item.date).startOf('hour').fromNow()}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        />
      )}
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      
    },
  });
  