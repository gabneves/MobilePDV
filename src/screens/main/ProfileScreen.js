import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, CommonActions  } from '@react-navigation/native';
import FullBgUserScreen from '../../components/FullBgUserScreen';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const { currentUser } = useAuth();
    const navigation = useNavigation();
    const [userName, setUserName] = useState('Usuário');
    const [currentPassword, setCurrentPassword] = useState('');

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
                        <Text style={styles.title}>Perfil</Text>
                        <Text style={styles.subtitle}>Aqui você pode customizar o seu perfil, cadastrar as suas redes sociais, calibrar o seu sistema de pesquisa e muito mais..</Text>

                        <Text style={styles.subTitle}>Dados da conta</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>nome de exibição</Text>
                            <TextInput
                                style={styles.input} z
                                placeholderTextColor="#9366B7"
                            />
                            <View style={styles.line}></View>
                        </View>

                        <Text style={styles.subTitle}>Atualizar senha</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>senha atual</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                placeholderTextColor="#9366B7"
                                secureTextEntry={true}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <View style={styles.line}></View>
                        </View>

                        <Text style={styles.subTitle}>Vincular redes sociais</Text>
                        <View style={styles.socialButtons}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/FacebookSmall.svg')} style={styles.socialIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/Instagram.svg')} style={styles.socialIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/GoogleSmall.svg')} style={styles.socialIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/X.svg')} style={styles.socialIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/Web.svg')} style={styles.socialIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/Maps.svg')} style={styles.socialIcon} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.avatarContainer}>
                            <Text style={styles.subTitle}>Avatar</Text>
                            <TouchableOpacity style={styles.avatarBox}>
                                <Image source={require('../../assets/icons/AddPhoto.svg')} style={styles.addPhotoIcon} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>salvar</Text>
                        </TouchableOpacity>
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
    greeting: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        textAlign: 'left',
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
    inputContainer: {
        marginBottom: 20,
        backgroundColor: '#EDEDED',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 4,
        height: 50,
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
    subTitle: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        color: '#9366B7',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'left',
        gap: 18
    },
    socialIcon: {
        width: 28,
        height: 28,
    },
    avatarContainer: {
        marginTop: 35,
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPhotoIcon: {
        width: 140,
        height: 86,
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

export default ProfileScreen;