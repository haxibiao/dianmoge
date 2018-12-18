'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Iconfont } from '../../utils/Fonts';
import { Colors } from '../../constants';

class SelectList extends Component {
	static defaultProps = {
		data: []
	};

	constructor(props) {
		super(props);
		this.state = {
			data: props.data
		};
	}

	selectHandler = (item, selectId) => {
		if (item.select) {
			return;
		}
		this.state.data.some((item, index) => {
			if (item.select) {
				this.state.data[index].select = false;
				return true;
			}
		});
		this.state.data[selectId].select = true;
		this.setState({ data: this.state.data }, () => {
			this.props.selectedItem(item);
		});
	};

	renderItem = ({ item, index }) => {
		const { listItem } = this.props;
		let Item;
		if (listItem) {
			Item = listItem(item);
		} else {
			Item = (
				<React.Fragment>
					<Text style={styles.text}>{item.text}</Text>
					<Iconfont name={item.select ? 'radio-check' : 'radio-uncheck'} color={item.select ? Colors.theme1 : Colors.font3} size={20} />
				</React.Fragment>
			);
		}
		return (
			<TouchableOpacity style={styles.item} onPress={() => this.selectHandler(item, index)}>
				{Item}
			</TouchableOpacity>
		);
	};

	render() {
		return (
			<FlatList keyExtractor={(item, index) => 'item_' + index} data={this.state.data} extraData={this.state} renderItem={this.renderItem} />
		);
	}
}

SelectList.propTypes = {
	data: PropTypes.array.isRequired,
	selectedItem: PropTypes.func,
	listItem: PropTypes.func
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		color: Colors.font1
	},
	item: {
		height: 50,
		paddingRight: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopWidth: 1,
		borderTopColor: Colors.shade4
	}
});

export default SelectList;
