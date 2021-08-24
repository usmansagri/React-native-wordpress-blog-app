import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View,Image, } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function HomeScreen(){
    const [isLoading, setLoading] = useState(true);
    const [post, setPostData] = useState([]);

    const getBlogPosts = async () => {
        try {
         const response = await fetch('http://wp.devlops.xyz/wp-json/wp/v2/posts/');
         const jsonPost = await response.json();
         setPostData(jsonPost);
       } catch (error) {
         Alert.alert(error);
       } finally {
         setLoading(false);
       }
     }

     const getBlogPostsImage = async (id) => {
      try {
       const response = await fetch('http://wp.devlops.xyz/wp-json/wp/v2/media/'+id);
       const jsonPostImage = await response.json();
       return jsonPostImage.link;
     } catch (error) {
       Alert.alert(error);
     }
  
   }

     useEffect(() => {
        getBlogPosts();
      }, []);
      

      const getContent = (item)=>{
        const source = {
          html: item.excerpt.rendered
        };
        return source;
      }

      const tagsStyles = {
       body: {
          whiteSpace: 'normal',
          color: '#fff',
          
        },
        a:{
          color:'#fff',
          fontWeight:'bold'
        }
        
      };

      

    return(
         <View style={{ flex: 1, padding: 0 }}>
               {isLoading ? <ActivityIndicator/> : (
         <FlatList 
          data={post}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Alert.alert('Blog reader feature will be available soon!')}>
              <View style={{padding:5,backgroundColor:'#3578e5',margin:5}}>


              {/* Unable to fetch image here using following technique */}
                {/* {item.featured_media>0?<Image style={{width:Dimensions.width,height:250}} source={{
                  uri: getBlogPostsImage(item.featured_media)
                }}/>:null} */}


              <Text style={{fontWeight:'bold',color:'#fff',fontSize:20,marginTop:5}}>{item.title.rendered}</Text>
              <RenderHtml source={getContent(item)} tagsStyles={tagsStyles} />
              <Text style={{color:'#fff',marginTop:10}}>Published: {item.date}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        />
        
      )}
     
    </View>
        
    );
}

