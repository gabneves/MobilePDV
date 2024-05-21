import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FullBgScreen from '../../components/FullBgScreen';
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
            <FullBgScreen>
                <View style={styles.container}>
                    <Text style={styles.greeting}>Olá, {userName}</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                        <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                        <Text style={styles.backText}>voltar</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Perfil</Text>
                    <Text style={styles.subtitle}>Aqui você pode customizar o seu perfil, cadastrar as suas redes sociais, calibrar o seu sistema de pesquisa e muito mais..</Text>

                    <Text style={styles.subTitle}>Dados da conta</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>nome de exibição</Text>
                        <TextInput
                            style={styles.input}z
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
                        <Text style={styles.avatarTitle}>Avatar</Text>
                        <TouchableOpacity style={styles.avatarBox}>
                            <Image source={require('../../assets/icons/AddPhoto.svg')} style={styles.addPhotoIcon} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>salvar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomNav}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                        <Image source={require('../../assets/icons/Favorites.svg')} style={styles.navIcon} />
                        <Text style={styles.navText}>favoritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
                        <Image source={require('../../assets/icons/Alerts.svg')} style={styles.navIcon} />
                        <Text style={styles.navText}>alertas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                        <Image source={require('../../assets/icons/Messages.svg')} style={styles.navIcon} />
                        <Text style={styles.navText}>mensagens</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image source={require('../../assets/icons/Settings.svg')} style={styles.navIcon} />
                        <Text style={styles.navText}>configurações</Text>
                    </TouchableOpacity>
                    <View style={styles.centralIconContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('CentralFeature')}>
                            <Image source={require('../../assets/icons/CentralFeature.svg')} style={styles.centralIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </FullBgScreen>
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
        marginBottom: 10,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    socialIcon: {
        width: 40,
        height: 40,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        marginBottom: 10,
    },
    avatarBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#9366B7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPhotoIcon: {
        width: 24,
        height: 24,
    },
    saveButton: {
        backgroundColor: '#9366B7',
        paddingVertical: 15,
        borderRadius: 35,
        alignItems: 'center',
        width: '100%',
    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#C0C0C0',
        position: 'relative',
    },
    navIcon: {
        width: 24,
        height: 24,
    },
    navText: {
        fontSize: 12,
        fontFamily: 'Poppins-Light',
        color: '#5A72C7',
        textAlign: 'center',
    },
    centralIconContainer: {
        position: 'absolute',
        top: -30, // Adjust this value to overlap the central icon
        left: '50%',
        transform: [{ translateX: -30 }], // Adjust to center the icon
    },
    centralIcon: {
        width: 60,
        height: 60,
    },
});

export default ProfileScreen;