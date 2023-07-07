import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TabItem = ({ label, isActive, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 15,
                    }}
                >
                    {label}
                </Text>
                <View
                    style={[
                        {
                            width: '50%',
                            borderBottomColor: 'white',
                            borderBottomWidth: 3,
                            marginTop: 8,
                            opacity: isActive ? 1 : 0,
                        },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
};

export default function TabBar(props) {
    const [tab, setTab] = useState(0);

    return (
        <View
            style={[
                {
                    flex: 1,
                },
                props?.style,
            ]}
        >
            <View
                style={{
                    flexDirection: 'row',
                }}
            >
                {props.tabs.map((val, idx) => {
                    return (
                        <TabItem
                            key={idx}
                            label={val.label}
                            isActive={idx == tab}
                            onPress={() => setTab(idx)}
                        />
                    );
                })}
            </View>

            <View style={{ flex: 1 }}>
                {props.children.map((val, idx) => {
                    if (idx == tab) return val;
                })}
            </View>
        </View>
    );
}
