import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import FullBgUserScreen from '../../components/FullBgUserScreen';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesScreen = () => {
    const { currentUser } = useAuth();
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');

    // Hardcoded favorite products data
    const favorites = [
        {
            image: require('../../assets/images/Iphone15.png'), // Caminho local para a imagem
            title: 'Apple iPhone 15 Pro Max',
            description: 'Nosso sistema de câmera Pro mais poderoso amplia as possibilidades de enquadramento apresenta a nova geração...'
        },
        {
            image: require('../../assets/images/S24.png'), // Caminho local para a imagem
            title: 'Samsung Galaxy S24+',
            description: 'Bem-vindo à era da IA móvel. Com o Galaxy S24 | S24+ em suas mãos, você pode liberar novos níveis de criatividade....'
        },
        {
            image: require('../../assets/images/Moto40.png'), // Caminho local para a imagem
            title: 'Motorola razr 40 ultra 5g',
            description: 'Combinando a moldura em vidro com acabamento fosco e a sensação do Vegan Leather na parte traseira....'
        }
    ];

    const handleLogout = async () => {
        try {
            await auth.signOut();
            await AsyncStorage.removeItem('savedEmail');
            await AsyncStorage.removeItem('savedPassword');
            await AsyncStorage.removeItem('savedRememberMe');
            console.log("User signed out");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FullBgUserScreen>
                <View style={styles.whiteBox}>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.backButton} onPress={() =>
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }],
                                })
                            )
                        }>
                            <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                            <Text style={styles.backText}>voltar</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Meus produtos <Text style={styles.spanText}>favoritos</Text></Text>
                        <Text style={styles.subtitle}>Aqui você pode encontrar os seus produtos mais amados.</Text>
                        
                        {/* Favorite Products Cards */}
                        <View style={styles.cardsContainer}>
                            {favorites.map((item, index) => (
                                <View key={index} style={styles.card}>
                                    <Image source={item.image} style={styles.productImage} />
                                    <Text style={styles.productTitle}>{item.title}</Text>
                                    <Text style={styles.productDescription}>{item.description}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.line}></View>

                        <Text style={styles.title}>Meus produtos <Text style={styles.spanText}>recentes</Text></Text>
                        <Text style={styles.subtitle}>Aqui você pode encontrar os seus produtos mais recentes.</Text>
                    </View>
                </View>
            </FullBgUserScreen>
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
    whiteBox: {
        shadowColor: '#C8C8C8',
        shadowOffset: { width: 0, height: -12 },
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        zIndex: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        textAlign: 'left',
        marginVertical: 10,
        marginTop: 32,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        color: '#949494',
        textAlign: 'left',
        marginBottom: 12,
        marginTop: 0,
    },
    spanText: {
        color: '#9367B7',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    backText: {
        fontFamily: 'Poppins-Light',
        color: '#949494',
        fontSize: 15,
        marginLeft: 5,
    },
    cardsContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    card: {
        width: 112,
        height: 124,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginRight: 11,
    },
    productImage: {
        width: 102,
        height: 74,
        resizeMode: 'contain',
        marginBottom: 5
    },
    productTitle: {
        fontSize: 8,
        fontFamily: 'Poppins-Bold',
        color: '#949494',
    },
    productDescription: {
        fontSize: 8,
        fontFamily: 'Poppins-Light',
        color: '#949494',
    },
    line: {
        height: 0.5,
        backgroundColor: '#5A72C7',
    },
});

export default MessagesScreen;
