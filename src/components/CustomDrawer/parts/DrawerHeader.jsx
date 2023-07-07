import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DrawerHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.sub_container}>
                <View style={styles.header_container}>
                    <View
                        style={[
                            { justifyContent: 'center', alignItems: 'center' },
                        ]}
                    >
                        <Text style={{ color: 'white' }}>DA</Text>
                    </View>
                </View>
                <View style={{ marginTop: 15, marginLeft: 10, width: 150 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>
                        Dhaibert Abiera
                    </Text>
                    <View style={{ alignItems: 'flex-start' }}>
                        <TouchableOpacity style={{ width: '100%' }}>
                            <Text style={[{ fontSize: 13, color: 'white' }]}>
                                dhaibertabiera@gmail.com
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 140,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ececec',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#FFBD00',
    },
    sub_container: {
        flexDirection: 'row',
    },
    header_container: {
        borderRadius: 40,
        overflow: 'hidden',
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: 'gray',
    },
});

export default DrawerHeader;
