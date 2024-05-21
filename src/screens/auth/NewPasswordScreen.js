import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function ForgotPasswordScreen() {
    const fontsLoaded = useFont();
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BgScreen>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.signupTitle}>Recuperar senha</Text>
                        <Text style={styles.infoText}>Digite a sua nova senha.</Text>
                        <Text style={styles.infoText}>Ela deve conter caracteres especiais, maiúsculas e minúsculas, números e conter no mínimo 16 dígitos.</Text>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                        <Text style={styles.backText}>voltar</Text>
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>nova senha</Text>
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
                        <Text style={styles.inputTitle}>confirmar nova senha</Text>
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

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('NewPasswordSucess')}>
                            <Text style={styles.saveButtonText}>salvar</Text>
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
        marginBottom: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 74,
        marginTop: -25,
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
        marginBottom: 28,
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
        marginTop: 85,
    },
    saveButton: {
        backgroundColor: '#9366B7',
        paddingVertical: 15,
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        width: 190,
    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
});
