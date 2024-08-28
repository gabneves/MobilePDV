import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import FullBgUserScreen from '../../components/FullBgUserScreen';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    const { currentUser } = useAuth();
    const navigation = useNavigation();

    const [isEnabled1, setIsEnabled1] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);
    const [isEnabled4, setIsEnabled4] = useState(false);
    const [isEnabled5, setIsEnabled5] = useState(false);
    const [isEnabled6, setIsEnabled6] = useState(false);
    const [isEnabled7, setIsEnabled7] = useState(false);

    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
    const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
    const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
    const toggleSwitch4 = () => setIsEnabled4(previousState => !previousState);
    const toggleSwitch5 = () => setIsEnabled5(previousState => !previousState);
    const toggleSwitch6 = () => setIsEnabled6(previousState => !previousState);
    const toggleSwitch7 = () => setIsEnabled7(previousState => !previousState);

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
                        <Text style={styles.title}>Configurações</Text>
                        <Text style={styles.subtitle}>
                            Aqui você encontra as configurações de notificações, de mensagens,
                            alguns detalhes sobre pesquisa e outros dados sobre a sua conta.
                        </Text>

                        {/* Switches */}
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled1 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch1}
                                value={isEnabled1}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Notificar o meu telefone</Text>
                        </View>
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled2 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Não notificar entre 18:00 e 22:00</Text>
                        </View>
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled3 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch3}
                                value={isEnabled3}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Não quero notificações</Text>
                        </View>
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled4 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch4}
                                value={isEnabled4}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Recomendações de qualquer produto</Text>
                        </View>
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled5 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch5}
                                value={isEnabled5}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Não notificar aparelhos conectados <Text style={styles.switchTextSmall}>(bluetooth)</Text></Text>
                        </View>
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled6 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch6}
                                value={isEnabled6}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Não ocultar notificações de app terceiro</Text>
                        </View>
                        <View style={styles.switchRow}>
                            <Switch
                                trackColor={{ false: "#D9D9D9", true: "#D9D9D9" }}
                                thumbColor={isEnabled7 ? "#9366B7" : "#949494"}
                                onValueChange={toggleSwitch7}
                                value={isEnabled7}
                                style={styles.switch}
                            />
                            <Text style={styles.switchText}>Manter pesquisa recente</Text>
                        </View>

                        <TouchableOpacity style={styles.deleteButton}>
                            <Image source={require('../../assets/images/DuckPink.svg')} style={styles.deleteButtonIcon} />
                            <Text style={styles.deleteButtonText}>deletar a minha conta</Text>
                        </TouchableOpacity>

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
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    switch: {
        marginRight: 10,
        height: 22,
    },
    switchText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        color: '#444444',
    },
    switchTextSmall: {
        fontSize: 8,
    },
    deleteButton: {
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButtonIcon: {
        marginRight: 5,
    },
    deleteButtonText: {
        color: '#DB3571',
        fontSize: 15,
        fontFamily: 'Poppins-Light',
    },
    saveButton: {
        backgroundColor: '#9366B7',
        alignSelf: "center",
        paddingVertical: 15,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 190,
        height: 50,
        marginTop: 40,
    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
});

export default SettingsScreen;
