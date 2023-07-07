import { useRef, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';
import { InputRound } from 'components/Inputs';
import { Formik } from 'formik';
import { LoginSchema } from 'helpers/formSchema';
import { useDispatch } from 'react-redux';
import { setSystemData } from 'redux_actions/system/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const passwordRef = useRef();

    const initialValues = {
        username: '',
        password: '',
    };

    const onlogin = async (values, actions) => {
        if (values.username === 'admin' && values.password === 'admin') {
            await AsyncStorage.setItem('isLogin', 'true');
            let toSave = {
                key: 'isLogin',
                value: true,
            };
            dispatch(setSystemData(toSave));

            navigation.navigate('DRAWER', {
                screen: 'DASHBOARD',
            });
        } else {
            actions.setErrors({
                username: true,
                password: true,
            });
            actions.setFieldError('password', 'Invalid username/password.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Image
                style={styles.pokeballStyle}
                source={require('assets/pokeball.jpg')}
            />
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logoStyle}
                    source={require('assets/logo.png')}
                />
            </View>
            <View style={styles.loginContainer}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onlogin}
                    validationSchema={LoginSchema}
                >
                    {({ handleChange, handleSubmit, errors, values }) => (
                        <View>
                            {console.log(errors)}
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 29,
                                    fontWeight: 'bold',
                                    marginBottom: 15,
                                }}
                            >
                                Welcome back!
                            </Text>
                            <InputRound
                                value={values.username}
                                onChangeText={handleChange('username')}
                                error={errors?.username}
                                returnKeyType={'next'}
                                label="Username"
                                placeholder="Enter Username"
                                focusable={true}
                                onSubmitEditing={() => {
                                    passwordRef.current.focus();
                                }}
                            />
                            <InputRound
                                ref={passwordRef}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                error={errors?.password}
                                returnKeyType={'next'}
                                label="Password"
                                secureTextEntry={true}
                                focusable={true}
                                placeholder="Enter Password"
                            />
                            <TouchableOpacity
                                style={styles.loginBtn}
                                onPress={handleSubmit}
                            >
                                <View>
                                    <Text style={{ color: 'white' }}>
                                        LOGIN
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginBtn: {
        marginTop: 50,
        backgroundColor: '#3b6ee9',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    bgStyle: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 125,
    },
    logoStyle: {
        resizeMode: 'contain',
        width: 160,
        height: 100,
    },
    loginContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    pokeballStyle: {
        position: 'absolute',
        zIndex: 0,
        top: 90,
        right: -80,
        opacity: 0.3,
    },
});
