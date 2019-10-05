/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  ActivityIndicator
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const LOGIN_STATUS = {
  NOT_LOGGED_IN: -1,
  LOGGING_IN: 0,
  LOGGED_IN: 1
};


const App: () => React$Node = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.NOT_LOGGED_IN);

  const onLoginDataChange = (key) => {
    return (value) => {
      const newLoginData = Object.assign({}, loginData);
      newLoginData[key] = value;
      setLoginData(newLoginData);
    };
  };

  const onLoginPress = () => {
    setLoginStatus(LOGIN_STATUS.LOGGING_IN);
    setTimeout(() => {
      setLoginStatus(LOGIN_STATUS.LOGGED_IN);
    }, 1500);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {
            loginStatus === LOGIN_STATUS.LOGGED_IN ?
              <View testID="dashboardView">
                <Text style={styles.heading} testID="dashboardHeadingText">
                  Hello {loginData.username}
                </Text>
                <Text style={[styles.link, styles.mt12]}>
                  Edit your profile
                </Text>
              </View>
              :
              <View testID="loginView">
                <Text style={styles.heading}>Please Login</Text>
                <Text style={styles.mt12}>Username</Text>
                <TextInput
                  style={[styles.textInput, styles.mt12]}
                  placeholder={'Enter your username'}
                  onChangeText={onLoginDataChange('username')}
                  value={loginData.username}
                  testID="usernameInput"
                />
                <Text style={styles.mt12}>Password</Text>
                <TextInput
                  secureTextEntry
                  style={[styles.textInput, styles.mt12, styles.mb12]}
                  placeholder={'Enter your password'}
                  onChangeText={onLoginDataChange('password')}
                  value={loginData.password}
                  testID="passwordInput"
                />
                <Button
                  title="Login"
                  onPress={onLoginPress}
                  testID="loginButton"
                />
                {
                  loginStatus === LOGIN_STATUS.LOGGING_IN ?
                    <ActivityIndicator style={styles.mt12} />
                    : null
                }
              </View>
          }
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    backgroundColor: Colors.white,
    padding: 16
  },
  heading: {
    textAlign: 'center',
    fontSize: 18
  },
  textInput: {
    borderColor: Colors.lighter,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4
  },
  mt12: {
    marginTop: 12
  },
  mb12: {
    marginBottom: 12
  },
  link: {
    color: '#3543bf'
  }
});

export default App;
