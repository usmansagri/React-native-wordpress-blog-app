import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View,ActivityIndicator,FlatList, Alert,TouchableOpacity } from 'react-native';

export default function CategoryPost({route}){
    const [isLoading, setLoading] = useState(true);
    const [blogcatid,setCatId]=useState();
    const [catPost, setCatPostData] = useState([]);
    const { catid } = route.params;
   
    const getCatId=(id)=>{
        const paramId= JSON.stringify(id);
        setCatId(paramId)        
    }

    const getCatBlogPosts = async (id) => {
      try {
       const response = await fetch('http://wp.devlops.xyz/wp-json/wp/v2/posts/?categories='+id);
       const jsonPost = await response.json();
       setCatPostData(jsonPost);
       //Alert.alert(jsonPost.title.rendered);
     } catch (error) {
       setLoading(false);
       Alert.alert("Connection Error","Check your connection and try again.");
     } finally {
      setTimeout(() => {
        setLoading(false);
    }, 3000);
     }
   }
  
   getCatBlogPosts(blogcatid);

    useEffect(() => {
        try {
          getCatId(catid);
        } catch (error) {
          Alert.alert("Error in useEffect")
        }
      }, []);


    return(
      <View style={styles.container}>
         {isLoading ? (<ActivityIndicator />): (
         <FlatList 
          data={catPost}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => Alert.alert('Blog reader feature will be available soon!')}>
              <View style={{padding:5,backgroundColor:'#5844ed',margin:5}}>


              {/* Unable to fetch image here using following technique */}
                {/* {item.featured_media>0?<Image style={{width:Dimensions.width,height:250}} source={{
                  uri: getBlogPostsImage(item.featured_media)
                }}/>:null} */}


              <Text style={{fontWeight:'bold',color:'#fff',fontSize:20,marginTop:5}}>{item.title.rendered}</Text>
              <Text style={{color:'#fff',marginTop:5}}>{item.date}</Text>
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
      backgroundColor: '#fff',
      justifyContent: 'center',
      
    },
  });
  