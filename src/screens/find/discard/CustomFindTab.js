import React from "react";
import Search from "../../components/Header/Search";
import { Colors, Divice } from "../../constants";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList, StatusBar } from "react-native";

export default class CustomFindTab extends React.Component {
    renderItem = (route, index) => {
        const { navigation, jumpToIndex } = this.props;

        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        const borderColor = focused ? this.props.activeTintColor : "transparent";
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        return (
            <TouchableOpacity key={route.key} onPress={() => jumpToIndex(index)}>
                <View style={{ ...styles.tabItem, borderColor }}>
                    <Text style={{ ...styles.tabText, color }}>{this.props.getLabel(TabScene)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { navigation } = this.props;
        const { routes } = navigation.state;
        return (
            <View style={styles.tab}>
                {routes && routes.map((route, index) => this.renderItem(route, index))}
                <View style={styles.right}>
                    <Search navigation={navigation} />
                </View>
            </View>
        );
    }
}

const styles = {
    tab: {
        paddingLeft: 15,
        paddingRight: 20,
        height: Divice.HEADER_HEIGHT,
        paddingTop: Divice.STATUSBAR_HEIGHT,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: Colors.tintBorderColor,
        backgroundColor: Colors.skinColor,
        flexDirection: "row",
        alignItems: "center"
    },
    tabItem: {
        paddingHorizontal: 5,
        height: 42,
        borderBottomWidth: 2,
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    tabText: {
        fontSize: 18
    },
    right: {
        position: "absolute",
        right: 20,
        top: 30
    }
};
