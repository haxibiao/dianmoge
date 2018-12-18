import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';

import { connect } from 'react-redux';

type Props = {
  isVisible?: boolean
};

class LoadingSpinner extends Component<Props> {
  render() {
    const { visible } = this.props;

    return (
      <Modal transparent={true} onRequestClose={() => {}} visible={visible} animationType={'fade'}>
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    minHeight: 80,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10
  }
});

export default connect(store => ({
  visible: store.screenStatus.loading
}))(LoadingSpinner);
