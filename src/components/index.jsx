import React, { forwardRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    Animated,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SimpleLineIcons, AntDesign } from 'react-native-vector-icons';

export const Main = (props) => (
    <>
        {Platform.OS === 'ios' ? (
            <SafeAreaView></SafeAreaView>
        ) : (
            <View style={[{ height: StatusBar.currentHeight }]}></View>
        )}
        <Image
            style={{
                position: 'absolute',
                zIndex: 0,
                top: 90,
                right: -80,
                opacity: 0.3,
            }}
            source={require('assets/pokeball.jpg')}
        />
        {props.children}
    </>
);

export const PageLoader = () => {
    const { colors } = useTheme();
    return (
        <View style={{ paddingBottom: 20, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
};

export const EmptyDisplay = ({ image, message }) => {
    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            <Image style={{ width: 180, height: 180 }} source={image} />
            <Text style={{ color: 'white', fontSize: 18 }}>{message}</Text>
        </View>
    );
};

export const IconButton = ({ onPress, name }) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
            <SimpleLineIcons name={name} size={24} color={colors.primary} />
        </TouchableOpacity>
    );
};
