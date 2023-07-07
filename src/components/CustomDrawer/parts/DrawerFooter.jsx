import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const DrawerFooter = () => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.primary }}>Connect with us:</Text>
            <View style={{ flexDirection: 'row' }}>
                <FontAwesome.Button
                    name="facebook"
                    size={25}
                    color="#FFBD00"
                    backgroundColor="transparent"
                />
                <FontAwesome.Button
                    name="instagram"
                    size={25}
                    color="#FFBD00"
                    backgroundColor="transparent"
                />
                <FontAwesome.Button
                    name="twitter"
                    size={25}
                    color="#FFBD00"
                    backgroundColor="transparent"
                />
            </View>

            <Image style={[styles.logo]} source={require('assets/logo.png')} />
            <Text style={{ color: colors.primary }}>
                Copyright {'\u00A9'} 2023. Pokem. All rights reserved.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    logo: {
        resizeMode: 'contain',
        width: '50%',
        height: 50,
        paddingVertical: 40,
    },
    sign_btn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default DrawerFooter;
