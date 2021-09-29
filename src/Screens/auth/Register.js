import React, {Component, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Logo from '../../components/Logo';
import {Formik} from 'formik';
import {RegisterValidation} from './../../helper/validation';
import {_Api} from './../../helper/api';
import Toast, {DURATION} from 'react-native-easy-toast'
import {AuthContext} from './../../components/AuthProvider';


export default Register =(props)=> {

  let statusToast = useRef(null);

  goToSignup = () => {
    props.navigation.navigate('Login');
  };

  const submit = (values, fH) => {
    fH.setSubmitting(true);
    Keyboard.dismiss();
    let params = {...values};
    delete params.confirmPassword;
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    let url = 'apis/register';

    _Api(url, formData, (res) => {
      if (res.status === 200) {
        if (res.data && res.data.success) {
          props.navigation.replace('Login');
        } else {
          fH.setSubmitting(false);
          statusToast.show(res.data.result, 2000);
        }
      } else {
        fH.setSubmitting(false);
        statusToast.show('try again !', 2000);
      }
    });
  };

    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.container1}>
          <Formik
            initialValues={{
              email: 'rahul.agrawal250@gmail.com',
              phone: '9066589979',
              name: 'Rahul',
              address: 'asdsasd',
              password: 'password',
              confirmPassword: 'password',
            }}
            validationSchema={RegisterValidation}
            onSubmit={(values, fH) => submit(values, fH)}>
            {({handleChange, handleBlur, handleSubmit, values, errors, isSubmitting}) => {
              return (
                <View>
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Phone number"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="number-pad"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />

                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Name"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Address"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Confirm password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    disabled={isSubmitting}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign up</Text>
                  </TouchableOpacity>
                  <Toast
                    ref={(toast) => (statusToast = toast)}
                    position={'bottom'}
                    style={{backgroundColor: '#d3e3', width:'80%', textAlign:'center'}}
                    // position="top"
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color: 'red', paddingBottom:4, width: '100%', textAlign:'center'}}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={goToSignup}>
            <Text style={styles.signupButton}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  container1: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
