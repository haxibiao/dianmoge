import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Text, FlatList, ScrollView, Dimensions } from "react-native";
import { Iconfont } from "../../utils/Fonts";
import { Colors } from "../../constants";
import { SlideInUpModal } from "../../components/Modal";
import { CategoryGroup } from "../../components/MediaGroup";
import { ContentEnd } from "../../components/Pure";

const { width, height } = Dimensions.get("window");

class BeSelectedCategory extends Component {
  constructor(props) {
    super(props);
    this.toggleVisible = this.toggleVisible.bind(this);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    let { categories, navigation } = this.props;
    let { modalVisible } = this.state;
    if (!categories.length) {
      return null;
    }
    return (
      <View style={styles.beSelectedCategory}>
        {categories.slice(0, 2).map(function(elem, index) {
          if (elem) {
            return (
              <TouchableOpacity key={index} style={styles.beSelectedCategoryItem} onPress={() => navigation.navigate("专题详情", { category: elem })}>
                <Text style={styles.beSelectedCategoryItemText} numberOfLines={1}>
                  {elem.name}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
        {categories.length >= 3 && (
          <TouchableOpacity style={styles.beSelectedCategoryItem} onPress={this.toggleVisible}>
            <Iconfont name={"more"} size={16} color={Colors.themeColor} style={{ marginHorizontal: 6 }} />
          </TouchableOpacity>
        )}
        <SlideInUpModal visible={modalVisible} toggleVisible={this.toggleVisible}>
          <View style={{ height: height * 0.6 }}>
            <View style={styles.beSelectedHeader}>
              <Text style={{ fontSize: 13, color: Colors.tintFontColor }}>入选专题</Text>
            </View>
            <FlatList
              data={categories}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.categoryItem}>
                  <CategoryGroup category={item} onPress={this.toggleVisible} />
                </View>
              )}
              ListFooterComponent={() => <ContentEnd />}
            />
          </View>
        </SlideInUpModal>
      </View>
    );
  }

  toggleVisible() {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  }
}

const styles = StyleSheet.create({
  beSelectedCategory: {
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  beSelectedCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: 150,
    height: 30,
    paddingHorizontal: 5,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.themeColor,
    borderRadius: 5
  },
  beSelectedCategoryItemText: {
    fontSize: 15,
    color: Colors.themeColor
  },
  beSelectedHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  },
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBorderColor
  }
});

export default BeSelectedCategory;
