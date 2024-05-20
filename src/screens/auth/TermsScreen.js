import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFont } from '../../context/FontContext.js';
import FullBgScreen from '../../components/FullBgScreen.js';

export default function TermsScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <FullBgScreen>
                <View style={styles.container}>
                    <Text>OI</Text>
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