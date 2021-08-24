import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CategoryList from "./category-list";
import CategoryPost from "./category-post";

const RootStack = createStackNavigator();
export default function CategoryPostScreen(){
    return(

        <RootStack.Navigator >
          <RootStack.Screen name="All categories" component={CategoryList} />
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="CatModal" component={CategoryPost} options={{title:""}}/>
            </RootStack.Group>
        </RootStack.Navigator>
     
    );
}