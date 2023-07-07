import { useEffect, useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';

import { getPokemonDetails } from 'helpers/api';
import { Main, PageLoader, EmptyDisplay, IconButton } from 'components';
import { setSystemData } from 'redux_actions/system/actions';
import { ScrollView } from 'react-native-gesture-handler';
import { typeDict } from 'helpers';
import TabBar from 'components/Tab';

export default function PokemonDetails({ navigation, route }) {
    const pokemon = route.params ? route.params.pokemon : null;
    const { colors } = useTheme();

    const [details, setDetails] = useState(null);
    const [tab, setTab] = useState(0);

    let detailsRequest;

    let tabs = [
        {
            label: 'Stats',
        },
        {
            label: 'Abilities',
        },
    ];
    useEffect(() => {
        // mount
        detailsRequest = fetchDetails(pokemon);
        return () => {
            // unmount
            try {
                if (detailsRequest) detailsRequest.cancelRequest();
            } catch (err) {}
        };
    }, []);

    const fetchDetails = (name) => {
        const request = getPokemonDetails(name);
        request
            .requestAPI()
            .then((data) => {
                console.log(data);
                setDetails(data);
            })
            .catch((error) => {
                console.log('API Request Error:', error);
            });
        return request;
    };

    return (
        <Main>
            <View style={[styles.container]}>
                <View style={styles.headerStyle}>
                    <IconButton
                        name="arrow-left"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    {details ? (
                        <>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={{
                                        uri: details.sprites['front_default'],
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 260,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'white',
                                    textTransform: 'capitalize',
                                    fontSize: 35,
                                    fontWeight: 'bold',
                                }}
                            >
                                {details.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 18,
                                }}
                            >
                                {details.types.map((val, idx) => {
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
                            <TabBar
                                tabs={tabs}
                                style={{ marginTop: 30, marginHorizontal: 10 }}
                            >
                                <ScrollView
                                    contentContainerStyle={{
                                        flex: 1,
                                        paddingHorizontal: 17,
                                        paddingVertical: 20,
                                        marginTop: 10,
                                    }}
                                >
                                    {details.stats.map((val, idx) => {
                                        return (
                                            <View key={idx}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 17,
                                                        marginBottom: 5,
                                                    }}
                                                >
                                                    {val.stat.name}
                                                    {' : '}
                                                    {val.base_stat}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                                <ScrollView
                                    contentContainerStyle={{
                                        flex: 1,
                                        paddingHorizontal: 17,
                                        paddingVertical: 20,
                                        marginTop: 10,
                                    }}
                                >
                                    {details.abilities.map((val, idx) => {
                                        return (
                                            <View
                                                key={idx}
                                                style={{
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 8,
                                                    }}
                                                >
                                                    {'●'}{' '}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: 17,
                                                    }}
                                                >
                                                    {val.ability.name}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                            </TabBar>
                        </>
                    ) : (
                        <PageLoader />
                    )}
                </View>
            </View>
        </Main>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingTop: 150,
    },
    header: {
        zIndex: 1,
        padding: 20,
    },
    headerStyle: {
        padding: 16,
        zIndex: 4,
        alignItems: 'flex-start',
    },
    label1: {
        color: 'white',
        fontSize: 27,
        fontWeight: 'bold',
    },
});
