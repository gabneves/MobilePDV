import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, Platform, Alert as RNAlert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../../services/firebaseConfig';

const Alert = (title, message) => {
    if (Platform.OS === 'web') {
        window.alert(`${title}\n${message}`);
    } else {
        RNAlert.alert(title, message);
    }
};

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

    const isValidCPF = (strCPF) => {
        let sum;
        let rest;
        sum = 0;
        if (strCPF === '00000000000') return false;

        for (let i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) rest = 0;
        if (rest !== parseInt(strCPF.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        rest = (sum * 10) % 11;

        if (rest === 10 || rest === 11) rest = 0;
        if (rest !== parseInt(strCPF.substring(10, 11))) return false;
        return true;
    };

    const validatePasswords = () => {
        if (password !== confirmPassword) {
            Alert('Erro', 'As senhas não coincidem.');
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        if (!username || !password || !confirmPassword || !email || !cpf) {
            Alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        if (!isValidCPF(cpf.replace(/[^\d]/g, ''))) {
            Alert('Erro', 'CPF inválido.');
            return;
        }

        if (!validatePasswords()) {
            return;
        }

        try {
            // Remover pontuações do CPF e converter para maiúsculas
            const formattedCpf = cpf.replace(/[^\d]/g, '');

            // Verificar se o email já está cadastrado
            const emailQuery = query(collection(db, 'users'), where('email', '==', email.toLowerCase()));
            const emailQuerySnapshot = await getDocs(emailQuery);

            if (!emailQuerySnapshot.empty) {
                Alert('Erro', 'Email já cadastrado.');
                return;
            }

            // Verificar se o CPF já está cadastrado
            const cpfQuery = query(collection(db, 'users'), where('cpf', '==', formattedCpf));
            const cpfQuerySnapshot = await getDocs(cpfQuery);

            if (!cpfQuerySnapshot.empty) {
                Alert('Erro', 'CPF já cadastrado.');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                username: username,
                email: email,
                cpf: formattedCpf,
            });

            console.log('Cadastro realizado com sucesso:', user);
            Alert('Sucesso', 'Cadastro realizado com sucesso.');
            navigation.navigate('SignupValidation');
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            Alert('Erro', 'Erro durante o cadastro.');
        }
    };

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
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Terms')}>
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
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Image source={require('../../assets/icons/Hide.svg')} style={styles.iconHide} />
                            </TouchableOpacity>
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
                        <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
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
