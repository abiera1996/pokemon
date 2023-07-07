import { View, TextInput, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import React from 'react';

export const InputRound = React.forwardRef((props, ref) => {
    const { colors } = useTheme();
    return (
        <View style={{ marginTop: 18 }}>
            {props.hasOwnProperty('label') ? (
                <Text
                    style={{
                        color: colors.primary,
                        fontSize: 16,
                        marginBottom: 9,
                    }}
                >
                    {props?.label}
                </Text>
            ) : null}

            <View
                style={[
                    props?.containerStyle,
                    {
                        borderRadius: 12,
                        paddingHorizontal: 24,
                        paddingVertical: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.subPrimary,
                    },
                    props.error
                        ? {
                              borderColor: 'red',
                              borderWidth: 1,
                          }
                        : {},
                ]}
            >
                {props?.leftIcon}
                <TextInput
                    ref={ref}
                    {...props}
                    placeholderTextColor={'silver'}
                    style={{
                        color: 'white',
                        paddingVertical: 19,
                        paddingHorizontal: 9,
                        flex: 1,
                    }}
                />
            </View>
            {props.error ? (
                <Text style={{ color: 'red', marginLeft: 7, marginTop: 4 }}>
                    {props.error}
                </Text>
            ) : null}
        </View>
    );
});
