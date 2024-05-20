import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const BgScreen = ({ children }) => {
    const whiteBoxHeight = height * 0.70; // 70% da altura da tela

    return (
        <View style={styles.container}>            
            <Image
                source={require('../assets/images/BG.svg')}
                style={styles.backgroundImage}
            />
            <Image
                source={require('../assets/logo/LogoWhite.svg')}
                style={styles.logo}
            />
            <View style={styles.contentContainer}>
                <View style={[styles.whiteBox, { height: whiteBoxHeight }]}>
                    {children}
                </View>
            </View>
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
    logo: {
        width: width > 400 ? 296 : 200, 
        height: width > 400 ? 296 : 200, 
        marginBottom: 20,
        alignSelf: 'center',
    },
    whiteBox: {
        shadowColor:'#C8C8C8',
        shadowOffset: {width: 0, height: -8},
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
    },
});

export default BgScreen;
