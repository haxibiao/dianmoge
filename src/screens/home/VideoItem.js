import React, { PureComponent } from "react";
import { StyleSheet, View, Image, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

import { Iconfont } from "../../utils/Fonts";
import { Colors, Methods, Divice } from "../../constants";
import { PlaceholderImage } from "../../components";

class VideoItem extends React.Component {
	constructor(props) {
		super(props);
		let liked = props.video.liked;
		this.state = {
			liked
		};
	}

	render() {
		const { video, navigation, itemWidth, calculatorHeight } = this.props;
		const { cover, user, category } = video;
		let { liked } = this.state;
		let videoHeight = calculatorHeight({ item: video });
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("推荐视频", { video })}>
				<View style={styles.videoItemStyle}>
					<PlaceholderImage
						source={cover ? { uri: cover } : null}
						style={{ width: itemWidth, height: videoHeight, backgroundColor: "#fff" }}
					/>
					<View style={styles.videoInfo}>
						<View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
							<Image source={{ uri: user.avatar }} style={styles.userAvatar} />
							<View style={{ flex: 1 }}>
								<Text style={styles.userName} numberOfLines={1}>
									{user.name}
								</Text>
							</View>
						</View>
						<TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({ liked: !liked })}>
							<Iconfont name={liked ? "like-fill" : "like"} size={20} color={liked ? Colors.ruby : Colors.shade1} />
						</TouchableOpacity>
					</View>
					{category && (
						<View style={styles.toPic}>
							<Text style={styles.toPicText} numberOfLines={1}>
								#{category.name}#
							</Text>
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	videoItemStyle: {
		borderRadius: 4,
		margin: 5,
		backgroundColor: "#fff",
		overflow: "hidden"
	},
	toPic: {
		position: "absolute",
		right: 8,
		top: 8,
		paddingHorizontal: 4,
		alignItems: "center",
		justifyContent: "center",
		height: 16,
		borderRadius: 8,
		maxWidth: 100,
		backgroundColor: "rgba(0,163,238,0.4)"
	},
	toPicText: {
		fontSize: 10,
		color: "rgba(255,255,255,0.8)"
	},
	videoInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		height: 34
	},
	userAvatar: {
		width: 24,
		height: 24,
		borderRadius: 12,
		resizeMode: "cover"
	},
	userName: {
		fontSize: 12,
		color: Colors.theme1,
		marginLeft: 5
	}
});

export default withNavigation(VideoItem);
