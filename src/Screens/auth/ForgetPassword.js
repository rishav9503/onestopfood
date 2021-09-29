import React, { Component, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { Formik } from 'formik';
import Logo from '../../components/Logo';
import { AuthContext } from './../../components/AuthProvider';
import { ForgotPasswordValidation } from './../../helper/validation';
import { _Api } from './../../helper/api';

const ForgetPassword = (props) => {
  let statusToast = useRef(null);

  const goBack = () => {
    props.navigation.navigate('Login');
  };
  const submit = (values, fH) => {
    fH.setSubmitting(true);
    Keyboard.dismiss();
    let params = { ...values };
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    let url = 'apis/change_password';

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
            phone: '',
            old_password: '',
            new_password: '',
          }}
          validationSchema={ForgotPasswordValidation}
          onSubmit={(values, fH) => submit(values, fH)}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => {
            return (
              <>
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Phone number"
                  placeholderTextColor="#ffffff"
                  selectionColor="#fff"
                  keyboardType="email-address"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Old password"
                  secureTextEntry={true}
                  placeholderTextColor="#ffffff"
                  onChangeText={handleChange('old_password')}
                  onBlur={handleBlur('old_password')}
                  value={values.old_password}
                />
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Confirm password"
                  secureTextEntry={true}
                  placeholderTextColor="#ffffff"
                  onChangeText={handleChange('new_password')}
                  onBlur={handleBlur('new_password')}
                  value={values.new_password}
                />
                <TouchableOpacity style={styles.button} disabled={isSubmitting} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
                <View style={styles.signupTextCont}>
                  {/* <Text style={styles.signupText}>Don't have an account yet?</Text> */}
                  <TouchableOpacity onPress={goBack}>
                    <Text style={styles.signupButton}>Go back</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
        <Toast
          ref={(toast) => (statusToast = toast)}
          position={'bottom'}
          style={{ backgroundColor: '#d3e3', width: '80%', textAlign: 'center' }}
          // position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: 'red', paddingBottom: 4, width: '100%', textAlign: 'center' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextCont: {
    // flexGrow: 1,
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

export default ForgetPassword;
