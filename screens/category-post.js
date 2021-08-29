import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,ActivityIndicator,FlatList, Alert,TouchableOpacity,Dimensions,Image } from 'react-native';
import init from "../config/init"

export default function CategoryPost({route,navigation}){
    const [isLoading, setLoading] = useState(false);
    const [blogcatid,setCatId]=useState();
    const [catPost, setCatPostData] = useState([]);
    const { catid } = route.params;
   
    const getCatId=(id)=>{
        const paramId= JSON.stringify(id);
        setCatId(paramId)        
    }

    const getCatBlogPosts = async (id) => {
      try {
       const response = await fetch(init.url+'/wp-json/wp/v2/posts/?categories='+id);
       const jsonPost = await response.json();
       setCatPostData(jsonPost);
     } catch (error) {
       setLoading(false);
       Alert.alert("Connection Error","Check your connection and try again.");
     } finally {
      setTimeout(() => {
        setLoading(false);
    }, 1000);
     }
   }
  
   getCatBlogPosts(blogcatid);

    useEffect(() => {
        try {
          setLoading(true);
          getCatId(catid);
        } catch (error) {
          Alert.alert("useEffect error.")
        }
      }, []);


    return(
      <View style={styles.container}>
         {isLoading ? (<ActivityIndicator />): (
         <FlatList 
          data={catPost}
          keyExtractor={({ id },index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>  navigation.navigate('CatPostModal',{
              postId:item.id
            })}>
              <View style={{padding:5,backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#eee'}}>
              {item.featured_media>0?<Image style={{width:Dimensions.width,height:180,}} source={{
                  uri: item.imageLink
                }}/>:null}
              <Text style={{fontWeight:'bold',color:'#3578e5',fontSize:20,marginTop:5}}>{item.title.rendered}</Text>
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
  