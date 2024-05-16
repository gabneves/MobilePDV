import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function SignupValidationScreen() {

    const fontsLoaded = useFont();
    const navigation = useNavigation();

    const [codes, setCodes] = useState(['', '', '', '', '', '']);

    if (!fontsLoaded) {
        return null;
    }

    const handleCodeChange = (index, code) => {
        const newCodes = [...codes];
        newCodes[index] = code;
        setCodes(newCodes);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <BgScreen>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.signupTitle}>Cadastre-se</Text>
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepNumber}>2</Text>
                            <Text style={styles.stepSeparator}>/</Text>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Signup')}>
                        <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                        <Text style={styles.backText}>voltar</Text>
                    </TouchableOpacity>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Insira o código enviado para o seu e-mail.</Text>
                        <Text style={styles.infoTextSub}>Caso não encontre o e-mail na sua caixa principal, verifique a caixa de spam e o lixo eletrônico.</Text>
                    </View>

                    <View style={styles.codeContainer}>
                        {codes.map((code, index) => (
                            <TextInput
                                key={index}
                                style={styles.input}
                                onChangeText={(text) => handleCodeChange(index, text)}
                                value={code}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.validationButton}>
                            <Text style={styles.validationButtonText}>validar</Text>
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
    infoContainer: {
        marginBottom: 100,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        marginBottom: 10,
        color: '#949494',
    },
    infoTextSub: {
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        color: '#949494',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 120,
    },
    input: {
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        padding: 10,
        width: 50,
        height: 52,
        textAlign: 'center',
        shadowColor:'#DB3571',
        shadowOffset: {width: 0, height: 3},
        color: '#DB3571',
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    validationButton: {
        backgroundColor: '#9366B7',
        paddingVertical: 15,
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        width: 190,
    },
    validationButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
});
