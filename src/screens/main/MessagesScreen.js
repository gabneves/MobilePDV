import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, CommonActions  } from '@react-navigation/native';
import FullBgUserScreen from '../../components/FullBgUserScreen';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MessagesScreen = () => {
    const { currentUser } = useAuth();
    const navigation = useNavigation();
    useEffect(() => {
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const loadUserInfo = async () => {
            if (currentUser) {
                try {
                    const userDoc = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(userDoc);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        const displayName = userData.username || 'Usuário';
                        const capitalizedDisplayName = capitalizeFirstLetter(displayName);
                        setUserName(capitalizedDisplayName);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                navigation.replace('Login');
            }
        };

        loadUserInfo();
    }, [currentUser, navigation]);

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
                        <Text style={styles.title}>Mensagens</Text>
                        <Text style={styles.subtitle}>Aqui você pode encontrar as mensagens que nós preparamos para você, mas não queremos ficar amolando você com um monte de notificações.</Text>
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
        marginBottom: 20,
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
    saveButton: {
        backgroundColor: '#9366B7',
        alignSelf: "center",
        paddingVertical: 15,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 190,
        height: 50
    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
});

export default MessagesScreen;