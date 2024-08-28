import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import FullBgUserScreen from '../../components/FullBgUserScreen';

const MessagesScreen = () => {
    const [showResult, setShowResult] = useState(false);
    const navigation = useNavigation();

    const handlePress = () => {
        setShowResult(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FullBgUserScreen>
                {!showResult ? (
                    // Envolvendo com um Fragment
                    <>
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

                            <Image
                                source={require('../../assets/images/DuckWhite.svg')}
                                style={styles.duckImage}
                            />

                            <Text style={styles.text}>
                                Quer ver algo completamente aleatório e que a gente acha que é muito a sua cara?
                                Clica no pato para descobrir.
                            </Text>

                            <Text style={styles.text}>
                                Agora se você está procurando alguma categoria específica, escreva alguma
                                característica do que você procura e deixa o resto com a gente.
                            </Text>

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

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>vamos lá</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.whiteBox}>
                            <View style={styles.containerBox}>
                                <TouchableOpacity onPress={handlePress}>
                                    <Image
                                        source={require('../../assets/images/DuckEureka.svg')}
                                        style={styles.image}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={styles.container}>
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
                            </TouchableOpacity>

                            <Image
                                source={require('../../assets/images/DuckWhite.svg')}
                                style={styles.duckImage}
                            />

                            <Text style={styles.text}>
                                E aí, conta pra gente, era isso que você procurava?
                            </Text>
                        </View>

                        <View style={styles.whiteBoxResult}>
                            <View style={styles.containerBox}>
                                <TouchableOpacity style={styles.backButton} onPress={() =>
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 0,
                                            routes: [{ name: 'Home' }],
                                        })
                                    )
                                }>
                                    <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                                    <Text style={styles.backTextResult}>voltar</Text>
                                </TouchableOpacity>

                                <Text style={styles.title}>Esse é a sua cara...</Text>

                                <View style={styles.cardsContainer}>
                                    <View style={styles.card}>
                                        <Image source={require('../../assets/images/Xiaomi.svg')} style={styles.productImage} />
                                        <Text style={styles.productTitle}>Xiaomi Poco C65</Text>
                                        <Text style={styles.productDescription}>Desfrute de um desempenho ágil com o processador Snapdragon® 778G. O DotDisplay AMOLED FHD+ de 120 Hz oferece imagens nítidas e fluidas, enquanto a câmera principal de 108 MP captura cada detalhe com clareza. O Xiaomi Poco C65 une potência e inovação em um só dispositivo.</Text>
                                    </View>
                                </View>

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.buttonResultNot}>
                                        <Text style={styles.buttonText}>não quero ver</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.buttonResult}>
                                        <Text style={styles.buttonTextResult}>ver mais</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                )}
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
        marginTop: 20,
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
    backTextResult: {
        fontFamily: 'Poppins-Light',
        color: '#949494',
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
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
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
    button: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 190,
        height: 50,
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
        paddingBottom: 20,  // Adiciona um espaçamento no fundo
    },
    whiteBoxResult: {
        shadowColor: '#C8C8C8',
        shadowOffset: { width: 0, height: -12 },
        position: 'absolute',
        height: 530,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingBottom: 0,  // Adiciona um espaçamento no fundo
    },
    containerBox: {
        marginTop: 20,
        paddingHorizontal: 30,
        flex: 1,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#5A72C7',
        textAlign: 'left',
        marginVertical: 10,
    },
    cardsContainer: {
        flexDirection: 'row',
    },
    card: {
        width: 368,
        height: 184,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 50,
    },
    productImage: {
        width: 368,
        height: 184,
        marginBottom: 22,
        borderRadius: 12,
    },
    productTitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: '#949494',
    },
    productDescription: {
        fontSize: 10,
        fontFamily: 'Poppins-Light',
        color: '#949494',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
        flex: 1, // Ocupa o espaço restante
    },
    buttonResult: {
        backgroundColor: '#9366B7',
        alignSelf: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 156,
        height: 50,
    },
    buttonResultNot: {
        backgroundColor: '#FFFFFF',
        color: '#9366B7',
        alignSelf: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: 156,
        height: 50,
    },
    buttonTextResult: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
});

export default MessagesScreen;
