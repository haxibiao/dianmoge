import types from '../types';

export default {
  addWatermark(status) {
    return {
      type: types.ADD_WATER_MARKE,
      status
    };
  },

  showLoadingSpinner() {
    return {
      type: types.SHOW_LOADING_SPINNER,
      status: true
    };
  },

  hiddenLoadingSpinner() {
    return {
      type: types.HIDDEN_LOADING_SPINNER,
      status: false
    };
  },

  qrcodeToUser(user_id) {
    return {
      type: types.QRCODE_TO_USER,
      user_id
    };
  },

  updateUserResource(resource) {
    return {
      type: types.UPDATE_RESOURCE_COUNT,
      resource
    };
  },

  updateUnreads(unreads) {
    return {
      type: types.UPDATE_UNREADS,
      unreads
    };
  },

  updateAvatar(avatar, timestamp) {
    return {
      type: types.UPDATE_AVATAR,
      avatar,
      timestamp
    };
  },

  updateName(name) {
    return {
      type: types.UPDATE_NAME,
      name
    };
  },

  updateIntroduction(introduction) {
    return {
      type: types.UPDATE_INTRODUCTION,
      introduction
    };
  },

  updatePassword(Password) {
    return {
      type: types.UPDATA_PASSWORD,
      Password
    };
  },

  signIn(user) {
    return {
      type: types.SIGN_IN,
      user
    };
  },

  signOut() {
    return {
      type: types.SIGN_OUT
    };
  },

  editCategoryAdmins(userIds) {
    return {
      type: types.EDIT_CATEGORY_ADMINS,
      userIds
    };
  }
};
