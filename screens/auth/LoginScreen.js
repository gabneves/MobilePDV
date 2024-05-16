import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, CheckBox } from 'react-native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const fontsLoaded = useFont();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <BgScreen>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Entre com seu e-mail e senha</Text>

          {/* Input de e-mail */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>e-mail</Text>
            <TextInput
              style={styles.input}
              placeholder=" "
              placeholderTextColor="#9366B7"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.line}></View>
          </View>

          {/* Input de senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>senha</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={styles.input}
                placeholder=" "
                placeholderTextColor="#9366B7"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={require('../../assets/icons/Hide.svg')} style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isChecked}
                onValueChange={setIsChecked}
                style={styles.checkbox}
              />
              <Text style={styles.checkboxLabel}>manter conectado</Text>
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>registre-se</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>ou entre com</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/Facebook.svg')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/Google.svg')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/Apple.svg')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </BgScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 30,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#5A72C7',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#949494',
    textAlign: 'left',
    marginBottom: 74,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#EDEDED',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 4,
    height: 50,
  },
  inputTitle: {
    fontSize: 15,
    color: '#B1B1B1',
    fontFamily: 'Poppins-Light',
  },
  input: {
    color: '#9366B7',
    borderBottomWidth: 0,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 17,
    height: 13,
    marginRight: 5,
  },
  line: {
    height: 1,
    backgroundColor: '#5A72C7',
    marginBottom: 28,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 44,
    marginTop: -8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 5,
    color: "#D9D9D9"
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#949494',
    fontFamily: 'Poppins-Light',
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#5A72C7',
    fontFamily: 'Poppins-Light',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#9366B7',
    paddingVertical: 15,
    borderRadius: 35,
    marginBottom: 15,
    alignItems: 'center',
    width: 190,
  },
  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
  },
  registerButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 35,
    marginBottom: 15,
    alignItems: 'center',
    width: 190,
  },
  registerButtonText: {
    color: '#9366B7',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
  },
  orText: {
    fontSize: 12,
    color: '#949494',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 40,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});
