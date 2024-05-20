import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function SignupValidationSucessScreen() {

    const fontsLoaded = useFont();
    const navigation = useNavigation();

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
                            <Text style={styles.stepNumber}>2</Text>
                            <Text style={styles.stepSeparator}>/</Text>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/images/SucessBlue.svg')}
                        style={styles.image}
                    />

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Cadastro realizado com sucesso .</Text>
                        <Text style={styles.infoTextSub}>Um e-mail com o seu PIN foi enviado.</Text>
                        <Text style={styles.infoTextSub}>Guarde-o com carinho, o PIN é utilizado caso você precise recuperar a sua senha futuramente.</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginButtonText}>login</Text>
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
        marginBottom: 80,
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
    image: {
        width: 158,
        height: 166,
        marginBottom: 40,
        alignSelf: 'center'
    },
    infoContainer: {
        marginBottom: 52,
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
