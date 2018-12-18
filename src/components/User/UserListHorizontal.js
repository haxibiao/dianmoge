"use strict";

import React, { Component } from "react";

import { StyleSheet, View, Image, Text, FlatList } from "react-native";

class UserListHorizontal extends Component {
	_renderItems() {
		const { users, radius } = this.props;
		return users.slice(0, 6).map((user, index) => {
			return (
				<View key={index}>
					<View
						style={{
							marginRight: -radius / 2,
							borderRadius: radius,
							borderWidth: radius / 6,
							borderColor: "transparent"
						}}
					>
						<Image
							style={{
								width: radius * 2,
								height: radius * 2,
								borderRadius: radius
							}}
							source={{ uri: user.avatar }}
						/>
					</View>
				</View>
			);
		});
	}

	render() {
		const { radius } = this.props;
		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					paddingRight: radius / 2
				}}
			>
				{this._renderItems()}
			</View>
		);
	}
}

const styles = StyleSheet.create({});

export default UserListHorizontal;
