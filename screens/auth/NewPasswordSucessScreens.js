import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BgScreen from '../../components/BgScreen';
import { useFont } from '../../context/FontContext';

export default function NewPasswordSucessScreen() {
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
                        <Text style={styles.signupTitle}>Recuperar senha</Text>
                    </View>

                    <Image
                        source={require('../../assets/images/SucessBlue.svg')}
                        style={styles.image}
                    />

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>Sua senha foi recuperar com sucesso.</Text>
                        <Text style={styles.infoTextSub}>Aproveite para atualizar os seus smart lockers e autenticar a sua biometria após o login, assim ficará muito mais fácil o seu login.</Text>
                        <Text style={styles.infoTextSub}>A gente sabe como decorar senha é chato, mas faz parte da dos seus dados.</Text>
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
        alignItems: 'left',
        marginBottom: 60,
    },
    signupTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        textAlign: 'left',
    },
    image: {
        width: 158,
        height: 166,
        marginBottom: 38,
        alignSelf: 'center'
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#9366B7',
        marginBottom: 16,
    },
    infoTextSub: {
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        color: '#949494',
        marginBottom: 16,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 24,
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