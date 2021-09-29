import React, {Component, useContext, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Logo from '../../components/Logo';
import {AuthContext} from './../../components/AuthProvider';
import {Form, Formik} from 'formik';
import {LoginValidation} from './../../helper/validation';
import Toast, {DURATION} from 'react-native-easy-toast';
import {_Api} from './../../helper/api';

const Login = (props) => {
  const {signIn} = useContext(AuthContext);
  let statusToast = useRef(null);

  const goToSignup = () => {
    props.navigation.navigate('Register');
  };
  const goToForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const submit = (values, fH) => {
    fH.setSubmitting(true);
    Keyboard.dismiss();
    let params = {...values};
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key]);
    });
    let url = 'apis/login';
    _Api(url, formData, (res) => {
      if (res.status === 200) {
        if (res.data && res.data.success) {
          signIn(res);
          // statusToast.show(res.data.result, 2000);
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
            phone: '9066589979',
            password: 'password',
          }}
          validationSchema={LoginValidation}
          onSubmit={(values, fH) => submit(values, fH)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isSubmitting,
          }) => {
            return (
              <>
                <TextInput
                  style={styles.inputBox}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Phone number"
                  placeholderTextColor="#ffffff"
                  selectionColor="#fff"
                  keyboardType="phone-pad"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting}>
                  <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToForgotPassword}>
                  <Text style={styles.signupText}>Forgot password?</Text>
                </TouchableOpacity>
                <Toast
                  ref={(toast) => (statusToast = toast)}
                  position={'bottom'}
                  style={{
                    backgroundColor: '#d3e3',
                    width: '80%',
                  }}
                  // position="top"
                  positionValue={200}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}
                  textStyle={{
                    color: 'red',
                    paddingBottom: 4,
                    width: '100%',
                    textAlign: 'center',
                  }}
                />
                <View style={styles.signupTextCont}>
                  <Text style={styles.signupText}>
                    Don't have an account yet?
                  </Text>
                  <TouchableOpacity onPress={goToSignup}>
                    <Text style={styles.signupButton}> Sign up</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
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

export default Login;
