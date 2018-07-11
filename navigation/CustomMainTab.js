import React from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from "react-native";
import Color from "../constants/Colors";
import { Badge } from "../components/Pure";
import { Iconfont } from "../utils/Fonts";
import { connect } from "react-redux";
import actions from "../store/actions";

class CustomMainTab extends React.Component {
    renderItem = (route, index) => {
        const { navigation, jumpToIndex } = this.props;

        const focused = index === navigation.state.index;
        const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
        let TabScene = {
            focused: focused,
            route: route,
            tintColor: color
        };
        return (
            <TouchableOpacity key={route.key} style={styles.tabItem} onPress={() => jumpToIndex(index)}>
                <View style={styles.tabItem}>
                    {this.props.renderIcon(TabScene)}
                    <Text style={{ fontSize: 11, color }}>{this.props.getLabel(TabScene)}</Text>
                </View>
                {this.props.getLabel(TabScene) == "通知" && (
                    <View style={{ position: "absolute", right: 0, top: 2 }}>
                        <Badge count={this.props.unreads} radius={7} />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    renderCreation() {
        const { navigation, login } = this.props;
        return (
            <TouchableOpacity
                key={"creation"}
                onPress={() => navigation.navigate(login ? "发布动态" : "创作封面")}
                onLongPress={() => navigation.navigate(login ? "创作" : "创作封面")}
            >
                <View>
                    <Iconfont name={"fill-add"} size={38} color={Color.themeColor} />
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { navigation } = this.props;
        const { routes } = navigation.state;
        const creationItem = this.renderCreation();
        let routerItem = routes && routes.map((route, index) => this.renderItem(route, index));
        routerItem.splice(2, 0, creationItem);
        return <View style={styles.tab}>{routerItem}</View>;
    }
}

const styles = {
    tab: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: 50,
        borderTopWidth: 1, //在大屏幕上0.5会显示异常，比如iphone 8 plus上
        borderTopColor: Color.tintBorderColor,
        backgroundColor: Color.skinColor
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: 50,
        position: "relative"
    }
};

export default connect(store => ({ login: store.users.login, unreads: store.users.count_unreads }))(CustomMainTab);
