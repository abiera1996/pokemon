import React from 'react';
import { View, Text, Image } from 'react-native';
import Shimmer from 'components/ShimmerLoader';
import { useNavigation, useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { typeDict } from 'helpers';

export const LoadingPokemon = () => {
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 70 }}>
            <View style={{ width: '50%', marginBottom: 15, padding: 14 }}>
                <Shimmer width={'100%'} height={180} />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: 4 }}>
                            <Shimmer width={'100%'} height={14} />
                        </View>
                        <View style={{ marginVertical: 4 }}>
                            <Shimmer width={'100%'} height={14} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: '50%', marginBottom: 15, padding: 14 }}>
                <Shimmer width={'100%'} height={180} />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: 4 }}>
                            <Shimmer width={'100%'} height={14} />
                        </View>
                        <View style={{ marginVertical: 4 }}>
                            <Shimmer width={'100%'} height={14} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ width: '50%', marginBottom: 15, padding: 14 }}>
                <Shimmer width={'100%'} height={180} />

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginVertical: 4 }}>
                            <Shimmer width={'100%'} height={14} />
                        </View>
                        <View style={{ marginVertical: 4 }}>
                            <Shimmer width={'100%'} height={14} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export const PokemonComponent = React.memo(({ name, image, type, id }) => {
    const navigation = useNavigation();

    const { colors } = useTheme();

    return (
        <View
            style={{
                width: '50%',
                marginBottom: 15,
                padding: 15,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('POKEMON', { pokemon: name });
                }}
            >
                <Image
                    source={{
                        uri: image,
                    }}
                    style={{
                        resizeMode: 'contain',
                        width: '100%',
                        height: 200,
                    }}
                />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                paddingVertical: 6,
                                fontSize: 20,
                                textTransform: 'capitalize',
                                fontWeight: 'bold',
                                color: colors.text,
                            }}
                        >
                            {name}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        {type.map((val, idx) => {
                            const typeColor =
                                val.type.name in typeDict
                                    ? typeDict[val.type.name]
                                    : 'gray';
                            return (
                                <View
                                    key={idx}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: typeColor,
                                        borderRadius: 16,
                                        paddingVertical: 4,
                                        paddingHorizontal: 15,
                                        marginRight: 5,
                                        marginBottom: 4,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: typeColor,
                                        }}
                                    >
                                        {val.type.name}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
});
