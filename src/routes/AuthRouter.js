import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
} from './../screens/auth';
const Stack = createStackNavigator();


const AuthRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthRouter;
