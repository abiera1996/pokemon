import { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    RefreshControl,
    Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemonDetails, getPokemons } from 'helpers/api';
import { Main, PageLoader, EmptyDisplay, IconButton } from 'components';
import { LoadingPokemon, PokemonComponent } from './Components';
import { setSystemData } from 'redux_actions/system/actions';

export default function DashboardScreen({ navigation }) {
    const limitPage = 10;
    let searchRequest = null;

    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.system.pokemons);

    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(0);
    const [loadingPage, setLoadingPage] = useState(false);
    const [pageMax, setPageMax] = useState(false);

    useEffect(() => {
        // mount
        searchRequest = fetchSearch(0);
        return () => {
            // unmount
            try {
                if (searchRequest) searchRequest.cancelRequest();
            } catch (err) {}
        };
    }, []);

    const fetchDetails = (name) => {
        const request = getPokemonDetails(name);
        return request.requestAPI().then((data) => data);
    };

    const fetchSearch = (
        currentPage,
        isRefresh = false,
        isGetMoreData = false,
    ) => {
        if (isRefresh) setRefresh(true);
        console.log({
            offset: currentPage + limitPage,
            limit: limitPage,
        });
        const request = getPokemons({
            offset: currentPage,
            limit: limitPage,
        });

        request
            .requestAPI()
            .then((data) => {
                const promises = [];
                data.results.map((val) => {
                    promises.push(fetchDetails(val.name));
                });

                Promise.all(promises).then((results) => {
                    const pokemon = results.map((result) => ({
                        name: result.name,
                        image: result.sprites['front_default'],
                        type: result.types,
                        id: result.id,
                    }));

                    let newPokemon = [];
                    if (pokemons && isGetMoreData) {
                        newPokemon = [...pokemons, ...pokemon];
                    } else {
                        newPokemon = [...pokemon];
                    }
                    if ([undefined, null, '', []].includes(pokemon)) {
                        setPageMax(true);
                    }

                    let toSave = {
                        key: 'pokemons',
                        value: newPokemon,
                    };
                    dispatch(setSystemData(toSave));
                    setLoadingPage(false);
                    setRefresh(false);
                    setPage(currentPage + limitPage);
                });
            })
            .catch((error) => {
                if (isRefresh) setRefresh(false);
                console.log('API Request Error:', error);
            });
        return request;
    };

    const onRefresh = async () => {
        setPage(0);
        setPageMax(false);
        setTimeout(() => {
            fetchSearch(0, true);
        }, 1000);
    };

    const reloadMorePokemon = () => {
        if (!pageMax && !loadingPage && !refresh) {
            if (pokemons) {
                if (pokemons.length != 0) setLoadingPage(true);
                fetchSearch(page, false, true);
            }
        }
    };

    return (
        <Main>
            <View style={[styles.container]}>
                <View style={styles.headerStyle}>
                    <IconButton
                        name="menu"
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    />
                </View>
                <View
                    style={{
                        ...styles.header,
                    }}
                >
                    <Text style={styles.label1}>
                        What Pokémon are you looking for?
                    </Text>
                </View>

                {pokemons ? (
                    pokemons.length == 0 ? (
                        <EmptyDisplay
                            image={require('assets/empty.png')}
                            message="No Available Pokemon"
                        />
                    ) : (
                        <FlatList
                            data={pokemons}
                            renderItem={({ item }) => (
                                <PokemonComponent {...item} />
                            )}
                            keyExtractor={(item, index) => String(index)}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refresh}
                                    colors={['white']}
                                    tintColor="white"
                                    progressViewOffset={20}
                                    onRefresh={onRefresh}
                                />
                            }
                            numColumns={2} // Set the number of columns
                            columnWrapperStyle={{
                                justifyContent: 'space-between',
                            }}
                            style={{ flex: 1 }}
                            onEndReached={reloadMorePokemon}
                            scrollEventThrottle={16}
                            contentContainerStyle={{
                                paddingTop: 20,
                                paddingBottom: 30,
                            }}
                        />
                    )
                ) : (
                    <View style={{ marginTop: 10 }}>
                        <LoadingPokemon />
                    </View>
                )}
                {loadingPage ? <PageLoader /> : null}
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
