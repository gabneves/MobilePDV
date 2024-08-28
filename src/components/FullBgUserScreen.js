import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig';

const { width } = Dimensions.get('window');

const FullBgScreen = ({ children }) => {
    const { currentUser } = useAuth();
    const navigation = useNavigation();
    const [userName, setUserName] = useState('Usuário');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const loadUserInfo = async () => {
            if (currentUser) {
                try {
                    console.log("Current User UID:", currentUser.uid);
                    const userDoc = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(userDoc);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        console.log("User Data:", userData);
                        const displayName = userData.username || 'Usuário';
                        setUserName(displayName);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.log("No user is logged in.");
            }
        };

        const determineGreeting = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                setGreeting('bom dia');
            } else if (currentHour < 18) {
                setGreeting('boa tarde');
            } else {
                setGreeting('boa noite');
            }
        };

        loadUserInfo();
        determineGreeting();
    }, [currentUser]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/BG.svg')}
                style={styles.backgroundImage}
            />
            <View style={styles.header}>
                <Image
                    source={require('../assets/logo/LogoWhite.svg')}
                    style={styles.logo}
                />
                <TouchableOpacity 
                    style={styles.greetingContainer} 
                    onPress={() => navigation.navigate('Profile')}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.greeting}>{greeting},</Text>
                        <Text style={styles.username}>{userName}</Text>
                    </View>
                    <Image
                        source={require('../assets/images/Avatar.svg')}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 5,
    },
    logo: {
        width: width > 400 ? 95 : 50,
        height: width > 400 ? 95 : 50,
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        marginRight: 10,
    },
    greeting: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: 'Poppins-Light',
    },
    username: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    avatar: {
        width: width > 400 ? 51 : 31,
        height: width > 400 ? 51 : 31,
        borderRadius: width > 400 ? 25 : 15,
    },
});

export default FullBgScreen;
