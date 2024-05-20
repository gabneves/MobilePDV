import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const [pinCode, setPinCode] = useState(['', '', '', '']);
    const fontsLoaded = useFont();
    const navigation = useNavigation();

    if (!fontsLoaded) {
        return null;
    }

    const handleCodeChange = (index, code) => {
        const newCodes = [...codes];
        newCodes[index] = code;
        setCodes(newCodes);
    };

    const handlePinCodeChange = (index, code) => {
        const newPinCode = [...pinCode];
        newPinCode[index] = code;
        setPinCode(newPinCode);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BgScreen>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.signupTitle}>Recuperar senha</Text>
                        <Text style={styles.infoText}>Insira o e-mail cadastrado. Um código validador será enviado para o seu e-mail e você deve inserir o seu PIN e o código validador para gerar uma nova senha.</Text>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                        <Text style={styles.backText}>voltar</Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" "
                            placeholderTextColor="#9366B7"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <View style={styles.line} />
                    </View>

                    <Text style={styles.infoTextSub}>Insira aqui o código enviado para o seu e-mail.</Text>
                    <View style={styles.codeContainer}>
                        {codes.map((code, index) => (
                            <TextInput
                                key={index}
                                style={styles.codeInput}
                                onChangeText={(text) => handleCodeChange(index, text)}
                                value={code}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View>

                    <View style={styles.pinContainer}>
                        <Text style={styles.textPin}>PIN CODE</Text>
                        <View style={styles.pinCodeContainer}>
                            {pinCode.map((code, index) => (
                                <TextInput
                                    key={index}
                                    style={styles.pinInput}
                                    onChangeText={(text) => handlePinCodeChange(index, text)}
                                    value={code}
                                    keyboardType="numeric"
                                    maxLength={1}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>enviar</Text>
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
    titleContainer: {
        alignItems: 'left',
        marginBottom: 25,
    },
    signupTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        textAlign: 'left',
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#949494',
    },
    infoTextSub: {
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        color: '#949494',
    },
    textPin: {
        fontSize: 20,
        fontFamily: 'Poppins-Light',
        color: '#949494',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backText: {
        fontFamily: 'Poppins-Light',
        color: '#949494',
        fontSize: 15,
        marginLeft: 5,
    },
    inputContainer: {
        marginBottom: 20,
        backgroundColor: '#EDEDED',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 4,
        height: 56,
        marginBottom: 20,
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
    line: {
        height: 1,
        backgroundColor: '#5A72C7',
        marginBottom: 28,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 45,
    },
    pinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 50,
    },
    pinCodeContainer: {
        flexDirection: 'row',
    },
    codeInput: {
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        padding: 10,
        width: 50,
        height: 52,
        textAlign: 'center',
        shadowColor: '#DB3571',
        shadowOffset: { width: 0, height: 3 },
        color: '#DB3571',
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
    },
    pinInput: {
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        padding: 10,
        width: 50,
        height: 52,
        textAlign: 'center',
        shadowColor: '#DB3571',
        shadowOffset: { width: 0, height: 3 },
        color: '#DB3571',
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        marginLeft: 14,
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
});
