import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import DrawerHeader from './parts/DrawerHeader';
import DrawerFooter from './parts/DrawerFooter';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setSystemData } from 'redux_actions/system/actions';

const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { colors } = useTheme();

    const onLogout = async () => {
        await AsyncStorage.setItem('isLogin', 'false');
        let toSave = {
            key: 'isLogin',
            value: false,
        };
        dispatch(setSystemData(toSave));

        setTimeout(() => {
            navigation.navigate('LOGIN');
        }, 400);
    };
    return (
        <React.Fragment>
            <DrawerHeader />
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <View>
                    <TouchableOpacity
                        style={styles.sign_btn}
                        onPress={onLogout}
                    >
                        <AntDesign
                            name="logout"
                            size={22}
                            color={colors.primary}
                            backgroundColor="transparent"
                        />
                        <Text
                            style={[{ marginLeft: 30, color: colors.primary }]}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
            <DrawerFooter {...props} />
        </React.Fragment>
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
        paddingHorizontal: 20,
        marginTop: 17,
        marginBottom: 20,
    },
});
export default CustomDrawerContent;
