import React, { PureComponent } from "react";
import { ScrollView, StyleSheet, View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";

import { Colors } from "../../constants";
import { Iconfont } from "../../utils/Fonts";
import { Avatar } from "../../components/Pure";
import { userFollowedCategoriesQuery } from "../../graphql/user.graphql";
import { visitCategoryQuery, deleteVisitMutation } from "../../graphql/category.graphql";

import { connect } from "react-redux";
import { Query, compose, graphql, withApollo } from "react-apollo";

class ListHeader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			deleteVisible: false,
			privacy: false
		};
	}

	componentDidMount() {
		let { navigation } = this.props;
		this.willBlurSubscription = navigation.addListener("willBlur", payload => {
			this.setState({ deleteVisible: false });
		});
	}

	componentWillUnmount() {
		this.willBlurSubscription.remove();
	}

	render() {
		let { privacy } = this.state;
		return (
			<Query query={visitCategoryQuery} fetchPolicy="network-only">
				{({ loading, error, data, refetch, fetchMore }) => {
					if (!(data && data.visits && data.visits.length > 0)) return null;
					return (
						<View style={styles.officialColumnWarp}>
							<View style={styles.header}>
								<View>
									<Text style={styles.tintText}>最近逛的专题</Text>
								</View>
								<View>{this._headerStatus()}</View>
							</View>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								style={privacy ? { display: "none" } : { marginBottom: 10 }}
							>
								{this._renderContent(data.visits)}
							</ScrollView>
						</View>
					);
				}}
			</Query>
		);
	}

	_headerStatus = () => {
		let { deleteVisible, privacy } = this.state;
		switch (true) {
			case deleteVisible:
				return (
					<TouchableOpacity style={styles.headerRight} onPress={() => this.setState(prevState => ({ deleteVisible: false }))}>
						<Text style={styles.linkText}>完成</Text>
					</TouchableOpacity>
				);
				break;
			case privacy:
				return (
					<TouchableOpacity style={styles.headerRight} onPress={() => this.setState(prevState => ({ privacy: !prevState.privacy }))}>
						<Iconfont name="privacy" size={16} color={Colors.tintFontColor} />
					</TouchableOpacity>
				);
				break;
			default:
				return (
					<TouchableOpacity style={styles.headerRight} onPress={() => this.setState(prevState => ({ privacy: !prevState.privacy }))}>
						<Iconfont name="browse" size={15} color={Colors.tintFontColor} />
					</TouchableOpacity>
				);
		}
	};

	_renderContent = visits => {
		return visits.map((item, index) => {
			return this._renderItem({ item, index });
		});
	};

	_renderItem = ({ item, index }) => {
		let { deleteVisible } = this.state;
		const { navigation } = this.props;
		let category = item.visited;
		let { logo, title } = category;
		return (
			<TouchableOpacity
				key={index.toString()}
				style={[styles.category, index == 0 && { marginLeft: 5 }]}
				onPress={() => {
					const navigateAction = NavigationActions.navigate({
						routeName: "专题详情",
						params: { category }
					});
					navigation.dispatch(navigateAction);
				}}
				onLongPress={() => this.setState({ deleteVisible: true })}
			>
				<Avatar uri={logo} size={50} type="category" />
				<View style={{ marginTop: 5, marginHorizontal: 5 }}>
					<Text style={styles.darkText} numberOfLines={1}>
						{title}
					</Text>
				</View>
				{deleteVisible && (
					<TouchableOpacity style={styles.deleteBox} onPress={() => this.deleteVisitHandler(item)}>
						<View style={styles.deleteBadge}>
							<View style={styles.deleteBadgeLine} />
						</View>
					</TouchableOpacity>
				)}
			</TouchableOpacity>
		);
	};

	deleteVisitHandler = item => {
		this.props.deleteVisit({
			variables: {
				id: item.id
			},
			optimisticResponse: {
				__typename: "Mutation",
				deleteVisit: {
					__typename: "Visit",
					id: item.id
				}
			},
			update: (cache, { data: { deleteVisit } }) => {
				let { visits } = cache.readQuery({
					query: visitCategoryQuery
				});
				visits = visits.filter((elem, index) => {
					return elem.id !== deleteVisit.id;
				});
				cache.writeQuery({
					query: visitCategoryQuery,
					data: {
						visits
					}
				});
			}
		});
	};

	// _renderFooter = () => {
	// 	const { navigation } = this.props;
	// 	return (
	// 		<TouchableOpacity style={styles.lastChild} onPress={() => navigation.navigate("推荐专题")}>
	// 			<View style={styles.addMore}>
	// 				<Iconfont name="add" size={30} color={Colors.tintFontColor} />
	// 			</View>
	// 			<View>
	// 				<Text style={styles.darkText}>发现更多</Text>
	// 			</View>
	// 		</TouchableOpacity>
	// 	);
	// };
}

const styles = StyleSheet.create({
	officialColumnWarp: {
		paddingHorizontal: 5,
		borderBottomWidth: 6,
		borderBottomColor: Colors.lightBorderColor
	},
	header: {
		padding: 15,
		paddingBottom: 10,
		paddingLeft: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerRight: {
		paddingHorizontal: 5,
		height: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	deleteBox: {
		position: "absolute",
		padding: 6,
		right: -5,
		top: -5
	},
	deleteBadge: {
		width: 12,
		height: 12,
		borderRadius: 6,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ff0000"
	},
	deleteBadgeLine: {
		width: 8,
		height: 1,
		backgroundColor: "#fff"
	},
	category: {
		width: 60,
		paddingVertical: 5,
		marginRight: 5,
		position: "relative",
		justifyContent: "center",
		alignItems: "center"
	},
	logo: {
		width: 50,
		height: 50,
		resizeMode: "cover"
	},
	lastChild: {
		height: 70,
		marginHorizontal: 15,
		justifyContent: "space-between"
	},
	addMore: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: Colors.lightBorderColor,
		alignItems: "center",
		justifyContent: "center"
	},
	darkText: {
		fontSize: 12,
		color: Colors.primaryFontColor,
		textAlign: "center"
	},
	tintText: {
		fontSize: 13,
		color: Colors.tintFontColor
	},
	linkText: {
		fontSize: 13,
		color: Colors.themeColor
	}
});

export default compose(
	withApollo,
	connect(store => ({ id: store.users.user.id })),
	graphql(deleteVisitMutation, { name: "deleteVisit" })
)(ListHeader);
