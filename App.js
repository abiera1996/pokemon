import { View } from 'react-native';
import Router from './src/router';
import store from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {
    return (
        <Provider store={store}>
            <View style={{ flex: 1 }}>
                <Router />
            </View>
        </Provider>
    );
}
