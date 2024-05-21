import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FullBgScreen from '../../components/FullBgScreen';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../services/firebaseConfig';

const HomeScreen = () => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Usuário');

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
          <Text>Olá, {userName}</Text>
          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.registerButtonText}>Perfil</Text>
          </TouchableOpacity>
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
});

export default HomeScreen;
