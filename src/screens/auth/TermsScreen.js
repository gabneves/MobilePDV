import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FullBgScreen from '../../components/FullBgScreen.js';

const ScrollBox = ({ children, title, titleColor }) => {
    const [scrollIndicatorHeight, setScrollIndicatorHeight] = useState(0);
    const [scrollIndicatorPosition, setScrollIndicatorPosition] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        const indicatorHeight = Math.max(50, contentHeight / 10); // Tamanho mínimo da barra
        setScrollIndicatorHeight(indicatorHeight);
    };

    const handleScroll = (event) => {
        const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
        const totalHeight = contentSize.height;
        const visibleHeight = layoutMeasurement.height;
        const scrollOffset = contentOffset.y;

        const indicatorHeight = Math.max(50, visibleHeight * (visibleHeight / totalHeight));
        const maxIndicatorPosition = visibleHeight - indicatorHeight;
        const indicatorPosition = scrollOffset * (maxIndicatorPosition / (totalHeight - visibleHeight));

        setScrollIndicatorHeight(indicatorHeight);
        setScrollIndicatorPosition(indicatorPosition);
    };

    return (
        <View style={styles.boxContainer}>
            <Text style={[styles.boxTitle, { color: titleColor }]}>{title}</Text>
            <View style={styles.box}>
                <ScrollView
                    contentContainerStyle={styles.innerScrollContainer}
                    nestedScrollEnabled={true}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        {
                            listener: handleScroll,
                            useNativeDriver: false,
                        }
                    )}
                    onContentSizeChange={handleContentSizeChange}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
                <View style={styles.scrollPath}>
                    <Animated.View
                        style={[
                            styles.scrollIndicator,
                            {
                                height: scrollIndicatorHeight,
                                transform: [{ translateY: scrollIndicatorPosition }],
                            },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

export default function TermsScreen() {
    const navigation = useNavigation();

    const handleAccept = () => {
        navigation.navigate('Signup');
    };

    const handleDecline = () => {
        Alert.alert('Aviso', 'Você precisa aceitar os termos para continuar com o cadastro e acesso ao app.');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FullBgScreen>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
                        <Image source={require('../../assets/icons/ArrowLeft.svg')} style={styles.iconArrow} />
                        <Text style={styles.backText}>voltar</Text>
                    </TouchableOpacity>

                    <Text style={styles.pageTitle}>Termos e Condições</Text>

                    <ScrollBox>
                        <Text style={styles.boxTitle}>Lorem Ipsum</Text>
                        <Text style={styles.text}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc mi ipsum faucibus vitae aliquet nec. Purus gravida quis blandit turpis cursus in hac habitasse. Commodo ullamcorper a lacus vestibulum. Faucibus in ornare quam viverra orci. Morbi quis commodo odio aenean sed adipiscing diam. Maecenas sed enim ut sem viverra. In ornare quam viverra orci sagittis eu volutpat odio.
                        </Text>
                        <Text style={styles.text}>
                            In metus vulputate eu scelerisque felis imperdiet proin fermentum. Aliquam vestibulum morbi blandit cursus risus...
                        </Text>
                    </ScrollBox>

                    <Text style={styles.pageTitle}>Sobre este app</Text>

                    <ScrollBox>
                        <Text style={styles.boxTitleLilac}>Um pouco sobre este projeto</Text>
                        <Text style={styles.text}>
                            Você pode acompanhar o desenvolvimento do projeto através da landing page www.projetotaqui.com.br
                        </Text>
                        <Text style={styles.text}>
                            Neste protótipo, se você encontrar um pato de borracha, é apenas uma piada dos devs para indicar onde existe um problema ou uma tela em andamento.
                        </Text>
                        <Text style={styles.text}>
                            Nem todas as relações de botões estão funcionando.
                            Os campos de input são simbólicos, estamos em fase de desenvolvimento teórico, mas queríamos deixar registrada uma versão da nossa ideia.
                        </Text>
                        <Text style={styles.text}>
                            Todo este projeto pode sofrer mudanças a qualquer momento.
                        </Text>
                    </ScrollBox>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.noAcceptedButton, styles.alignBottom]} onPress={handleDecline}>
                            <Text style={styles.noAcceptedButtonText}>não aceito</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.acceptedButton, styles.alignBottom]} onPress={handleAccept}>
                            <Text style={styles.acceptedButtonText}>aceito</Text>
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
    pageTitle: {
        fontFamily: 'Poppins-Light',
        fontSize: 15,
        textAlign: 'left',
        color: '#9367B7'
    },
    boxContainer: {
        marginBottom: 20,
    },
    box: {
        height: 262,
        backgroundColor: '#f0f0f0', 
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
        padding: 5,
    },
    boxTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textAlign: 'left',
        color: '#7593CE',
        marginBottom: 14,
    },
    boxTitleLilac: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textAlign: 'left',
        color: '#9367B7',
        marginBottom: 14,
    },
    innerScrollContainer: {
        padding: 10,
    },
    text: {
        fontFamily: 'Poppins-Light',
        color: '#747474',
        fontSize: 12,
        marginBottom: 10,
        marginRight: 10,
    },
    scrollPath: {
        position: 'absolute',
        width: 6,
        right: 8,
        top: 10,
        bottom: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    scrollIndicator: {
        position: 'absolute',
        width: 6,
        backgroundColor: '#9367B7',
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 20,
    },
    acceptedButton: {
        backgroundColor: '#9366B7',
        padding: 10,
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        width: 225,
    },
    acceptedButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
    noAcceptedButton: {
        backgroundColor: '#D6D6D6',
        padding: 6,
        borderRadius: 35,
        marginBottom: 15,
        alignItems: 'center',
        width: 121,
        height: 30,
    },
    noAcceptedButtonText: {
        color: '#969696',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Poppins-Light',
    },
    alignBottom: {
        alignSelf: 'flex-end',
    },
});
