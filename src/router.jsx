import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from 'components/CustomDrawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemData } from 'redux_actions/system/actions';

//screens
import LoginScreen from 'screens/Login';
import DashboardScreen from 'screens/Dashboard';
import PokemonDetailsScreen from 'screens/Pokemon';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { MyTheme } from 'components/Theme';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigation(props) {
    return (
        <Drawer.Navigator
            initialRouteName="DASHBOARD"
            screenOptions={{
                activeTintColor: '#ff931e',
                inactiveTintColor: 'gray',
                headerShown: false,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="DASHBOARD"
                component={DashboardScreen}
                options={{
                    title: 'DASHBOARD',
                    drawerIcon: ({ color }) => (
                        <SimpleLineIcons name="home" size={23} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default function Router() {
    const isLogin = useSelector((state) => state.system.isLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        loadScreen();
    }, []);

    const loadScreen = async () => {
        const isLoginStorage = await AsyncStorage.getItem('isLogin');
        const toSave = {
            key: 'isLogin',
            value: isLoginStorage == 'true',
        };
        dispatch(setSystemData(toSave));
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" translucent={true} />
            <NavigationContainer theme={MyTheme}>
                <Stack.Navigator
                    initialRouteName={'LOGIN'}
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {isLogin ? (
                        <>
                            <Stack.Screen
                                name="DRAWER"
                                component={DrawerNavigation}
                            />
                            <Stack.Screen
                                name="POKEMON"
                                component={PokemonDetailsScreen}
                            />
                        </>
                    ) : (
                        <Stack.Screen name="LOGIN" component={LoginScreen} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
