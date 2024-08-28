import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FullBgUserScreen from '../../components/FullBgUserScreen';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const handleLogoPress = () => {
    // Animação de ondulação
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

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
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="pesquisar"
              placeholderTextColor="#FFFFFF"
              fontSize={12}
              fontFamily="Poppins-Light"
            />
            <TouchableOpacity>
              <Image
                source={require('../../assets/icons/Search.svg')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>
            digite ou fale o que eu devo encontrar
          </Text>
          <Text style={styles.text}>
            para você agora
          </Text>

          {/* Logo Central com Degradê e Animação */}
          <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
            <Animated.Image
              source={require('../../assets/icons/CentralFeature.svg')}
              style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/MIC.svg')}
              style={styles.micImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.whiteBox}>
          <View style={styles.containerBox}>
            <Text style={styles.title}>Pesquisas recentes</Text>
            <Text style={styles.subtitle}>Aqui estão as suas pesquisas recentes. Você pode removê-las pressionando o dedo em cima de uma delas e depois clicando em delete, ou pode favorita-las clicando no ícone de coração em cima da imagem.</Text>

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
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    fontFamily: 'Poppins-Light',
    color: '#FFFFFF',
    fontSize: 15,
    marginLeft: 5,
  },
  duckImage: {
    width: 20,
    height: 19,
    marginVertical: 20,
  },
  text: {
    fontFamily: 'Poppins-Light',
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(0, 0, 0, 0.35)',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    marginBottom: 20,
    width: 330,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  logoContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    padding: 20,
    borderRadius: 100,
  },
  logo: {
    width: 176,
    height: 176,
    marginTop: 30
  },
  micImage: {
    width: 43,
    height: 43,
    marginVertical: 20,
},
  button: {
    backgroundColor: '#FFFFFF',
    alignSelf: "center",
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: 190,
    height: 50
  },
  buttonText: {
    color: '#9366B7',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Poppins-Light',
  },
  whiteBox: {
    shadowColor: '#C8C8C8',
    shadowOffset: { width: 0, height: -12 },
    position: 'absolute',
    height: 230,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  containerBox: {
    marginTop: 20,
    paddingHorizontal: 30,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#5A72C7',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'Poppins-Light',
    color: '#949494',
    textAlign: 'left',
    marginBottom: 20,
  },
});

export default HomeScreen;
