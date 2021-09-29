// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * Generated with the UI Kitten template
//  * https://github.com/akveo/react-native-ui-kitten
//  *
//  * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
//  *
//  * @format
//  */

// import React from 'react';
// import { StyleSheet } from 'react-native';
// import {
//   ApplicationProvider,
//   Button,
//   Icon,
//   IconRegistry,
//   Layout,
//   Text,
// } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import * as eva from '@eva-design/eva';
// import { default as theme } from './theme.json'; // <-- Import app theme

// /**
//  * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
//  * https://akveo.github.io/eva-icons
//  */
// const HeartIcon = (props) => (
//   <Icon {...props} name='heart'/>
// );

// export default () => (
//   <>
//     <IconRegistry icons={EvaIconsPack}/>
//     <ApplicationProvider {...eva} theme={{...eva.light, ...theme }}>
//       <Layout style={styles.container}>
//         <Text style={styles.text} category='h1'>
//           Welcome to UI Kitten 😻
//         </Text>
//         <Text style={styles.text} category='s1'>
//           Start with editing App.js to configure your App
//         </Text>
//         <Text style={styles.text} appearance='hint'>
//           For example, try changing theme to Dark by using eva.dark
//         </Text>
//         <Button style={styles.likeButton} accessoryLeft={HeartIcon}>
//           LIKE
//         </Button>
//       </Layout>
//     </ApplicationProvider>
//   </>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     textAlign: 'center',
//   },
//   likeButton: {
//     marginVertical: 16,
//   },
// });
import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

// import AuthContext from './src/components/AuthProvider';
import Router from './src/routes';
// import NetworkProvider from './src/components/NetworkProvider';
// import * as eva from '@eva-design/eva';
// import { EvaIconsPack } from "@ui-kitten/eva-icons";
// import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
// import theme from "./theme.json";

const App: () => React$Node = () => {
  // const {signed} = useContext(AuthContext);

  return (
    <>

      <StatusBar barStyle={"dark-content"} backgroundColor='#ffffff' />
      {/* <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider theme={{ ...eva.light, ...theme }}>  */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* <NetworkProvider> */}
            <Router />
          {/* </NetworkProvider> */}
        </SafeAreaView>
     
     {/* </ApplicationProvider> */}

    </>
  );
};

const styles = StyleSheet.create({});

export default App;