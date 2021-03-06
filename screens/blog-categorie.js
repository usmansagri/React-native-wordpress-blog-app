import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import CategoryList from "./category-list";
import CategoryPost from "./category-post";
import ModalPostView from "./modal-post-view";
const RootStack = createStackNavigator();


export default function CategoryPostScreen(){
    return(

        <RootStack.Navigator >
          <RootStack.Screen name="All categories" component={CategoryList} />
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="CatModal" component={CategoryPost} options={{title:""}}/>
            <RootStack.Screen name="CatPostModal" component={ModalPostView} options={{title:""}}/>
            </RootStack.Group>
        </RootStack.Navigator>
     
    );
}