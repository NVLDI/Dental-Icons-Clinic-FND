// SignupScreenFND.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal
} from 'react-native';
import styles from './signupStyle';
import { useSignupLogic } from './SignupScreenBND';

const SignupScreen = ({ navigation, onSignUpSuccess }) => {
  const {
    email1,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    clinicName,
    setClinicName,
    clinicNo,
    showAlert,
    handleSignup,
  } = useSignupLogic(onSignUpSuccess);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Clinic Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email1}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Clinic Name"
        value={clinicName}
        onChangeText={setClinicName}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Modal visible={showAlert} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Welcome! Your account has been created.</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignupScreen;
