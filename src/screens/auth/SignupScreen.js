import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigation = useNavigation();

    const fontsLoaded = useFont();

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BgScreen>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.signupTitle}>Cadastre-se</Text>
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepNumber}>1</Text>
                            <Text style={styles.stepSeparator}>/</Text>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                        <Text style={styles.backText}>voltar</Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" "
                            placeholderTextColor="#9366B7"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <View style={styles.line} />
                    </View>

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
                                <Image source={require('../../assets/icons/Hide.svg')} style={styles.iconHide} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>confirmar senha</Text>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.input}
                                placeholder=" "
                                placeholderTextColor="#9366B7"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                        <View style={styles.line} />
                    </View>

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

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>cpf</Text>
                        <TextInput
                            style={styles.input}
                            placeholder=" "
                            placeholderTextColor="#9366B7"
                            value={cpf}
                            onChangeText={setCpf}
                        />
                        <View style={styles.line} />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>cadastre-se</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    signupTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        textAlign: 'left',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 4,
    },
    stepNumber: {
        width: 20,
        height: 20,
        fontSize: 15,
        color: '#FFF',
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        fontFamily: 'Poppins-Light',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    stepSeparator: {
        fontSize: 15,
        marginHorizontal: 4,
        color: '#D9D9D9',
        fontFamily: 'Poppins-Light'
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
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconArrow: {
        width: 17,
        height: 14,
    },
    iconHide: {
        width: 17,
        height: 13,
        marginRight: 5,
    },
    line: {
        height: 1,
        backgroundColor: '#5A72C7',
        marginBottom: 28,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#9366B7',
        paddingVertical: 15,
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        width: 190,
    },
    registerButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
});

