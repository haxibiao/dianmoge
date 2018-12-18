import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, FlatList } from 'react-native';
import { StackNavigator, TabBarBottom, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { Colors, Divice } from '../constants';
import { Iconfont } from '../utils/Fonts';
import { Badge } from '../components/Pure';

import { connect } from 'react-redux';
import actions from '../store/actions';

import HomeScreen from '../screens/home/HomeScreen';
import FindScreen from '../screens/find/FindScreen';
import NotificationHome from '../screens/notification/HomeScreen';
import MyHome from '../screens/my/HomeScreen';
import TabBar from './TabBar';

const MainTab = createBottomTabNavigator(
    {
        首页: {
            screen: HomeScreen,
            navigationOptions: () => TabOptions('首页')
        },
        发现: {
            screen: FindScreen,
            navigationOptions: () => TabOptions('发现')
        },
        通知: {
            screen: NotificationHome,
            navigationOptions: () => TabOptions('通知')
        },
        个人: {
            screen: MyHome,
            navigationOptions: () => TabOptions('个人')
        }
    },
    {
        initialRouteName: '首页',
        lazy: false,
        backBehavior: 'none',
        tabBarComponent: TabBar,
        tabBarOptions: {
            safeAreaInset: {
                bottom: 'always',
                top: 'never'
            },
            showLabel: false
        },
        navigationOptions: ({ navigation }) => {
            const routes = navigation.state.routes;
            const params = routes ? routes[navigation.state.index].params : null;

            const headerTitle = params ? params.title : '';

            const headerTitleStyle = {
                color: 'white',
                flex: 1,
                textAlign: 'center'
            };
            const headerBackTitle = null;
            const headerTintColor = 'white';
            const headerStyle = {
                backgroundColor: Colors.skinColor,
                shadowColor: 'transparent',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                borderBottomColor: 'transparent',
                elevation: 0
            };
            const header = null;
            return {
                swipeEnabled: true,
                headerTitle,
                headerStyle,
                headerTitleStyle,
                headerBackTitle,
                headerTintColor,
                header
            };
        }
    }
);

const TabOptions = routeName => {
    const title = routeName;
    const tabBarIcon = ({ focused }: { focused: boolean }) => {
        let source, iconName;
        switch (routeName) {
            case '首页':
                iconName = `home${focused ? '-fill' : ''}`;
                break;
            case '发现':
                iconName = `discover${focused ? '-fill' : ''}`;
                break;
            case '通知':
                iconName = `notification${focused ? '-fill' : ''}`;
                break;
            case '个人':
                iconName = `person${focused ? '-fill' : ''}`;
        }
        return <Iconfont name={iconName} size={26} style={{ marginBottom: -1 }} color={focused ? '#616161' : '#969696'} />;
    };
    const tabBarVisible = true;
    return { title, tabBarVisible, tabBarIcon };
};

// class MainTab extends React.Component {
//     renderItem = (route, index) => {
//         const { navigation, jumpToIndex, getOnPress, getLabel, client, login } = this.props;
//         const focused = index === navigation.state.index;
//         const color = focused ? this.props.activeTintColor : this.props.inactiveTintColor;
//         const scene = {
//             index: index,
//             focused: focused,
//             route: route,
//             tintColor: color
//         };
//         //react-navigation => tabview传递的props
//         const { routes } = navigation.state;
//         const previousScene = routes[navigation.state.index];
//         // 获取传递的tabBarOnPress
//         const onPress = getOnPress(previousScene, scene);
//         return (
//             <TouchableOpacity
//                 key={route.key}
//                 style={styles.tabItem}
//                 onPress={() => {
//                     onPress
//                         ? onPress({
//                               previousScene,
//                               scene,
//                               jumpToIndex
//                           })
//                         : jumpToIndex(index);
//                 }}
//             >
//                 <View style={styles.tabItem}>
//                     {this.props.renderIcon(scene)}
//                     <Text style={{ fontSize: 11, color }}>{getLabel(scene)}</Text>
//                 </View>
//                 {getLabel(scene) == '通知' && (
//                     <View style={{ position: 'absolute', right: 0, top: 2 }}>
//                         <Badge count={this.props.unreads} radius={7} />
//                     </View>
//                 )}
//             </TouchableOpacity>
//         );
//     };

//     renderCreation() {
//         const { navigation, login } = this.props;
//         return (
//             <TouchableOpacity
//                 key={'creation'}
//                 onPress={() => navigation.navigate(login ? '发布动态' : '登录注册')}
//                 onLongPress={() => navigation.navigate(login ? '创作' : '登录注册')}
//             >
//                 <View>
//                     <Iconfont name={'fill-add'} size={38} color={Colors.themeColor} />
//                 </View>
//             </TouchableOpacity>
//         );
//     }

//     render() {
//         const { navigation } = this.props;
//         const { routes } = navigation.state;
//         const creationItem = this.renderCreation();
//         let routerItem = routes && routes.map((route, index) => this.renderItem(route, index));
//         routerItem.splice(2, 0, creationItem);
//         return <View style={styles.tab}>{routerItem}</View>;
//     }
// }

const styles = {
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: Divice.HAS_HOME_INDICATOR ? 70 : 50,
        paddingBottom: Divice.HAS_HOME_INDICATOR ? 15 : 0,
        borderTopWidth: 1, //在大屏幕上0.5会显示异常，比如iphone 8 plus上
        borderTopColor: Colors.tintBorderColor,
        backgroundColor: Colors.skinColor
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        position: 'relative'
    }
};

export default MainTab;
