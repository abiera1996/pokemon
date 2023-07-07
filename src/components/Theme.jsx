import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const MyTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: 'white',
        subPrimary: '#2e2b2c',
        // background: 'black',
    },
};
