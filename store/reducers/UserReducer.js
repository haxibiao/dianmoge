import types from "../types";
import { List, Record } from "immutable";
import { users } from "../state/users";

class UserReducer {
	static reduce(state = users(), action) {
		if (UserReducer[action.type]) {
			return UserReducer[action.type](state, action);
		} else {
			return state;
		}
	}

	static [types.UPDATE_RESOURCE_COUNT](state, action) {
		let { resource } = action;
		let { user } = state;
		user = {
			...user,
			...resource
		};
		return state.set("user", user);
	}

	static [types.UPDATE_UNREADS](state, action) {
		let { unreads } = action;
		return state.set("count_unreads", unreads);
	}

	static [types.UPDATE_INTRODUCTION](state, action) {
		let { user } = state;
		let { introduction } = action;
		user = {
			...user,
			introduction
		};
		return state.set("user", user);
	}

	static [types.UPDATA_PASSWORD](state, action) {
		let { user } = state;
		let { password } = action;
		user = {
			...user,
			password
		};
		return state.set("user", user);
	}

	static [types.UPDATE_NAME](state, action) {
		let { user } = state;
		let { name } = action;
		user = {
			...user,
			password
		};
		return state.set("user", user);
	}

	static [types.UPDATE_AVATAR](state, action) {
		let { user } = state;
		let { avatar, timestamp } = action;
		user = {
			...user,
			avatar: avatar + "?" + timestamp
		};
		return state.set("user", user);
	}

	static [types.SIGN_IN](state, action) {
		let { user } = action;
		return state.set("user", user).set("login", true);
	}

	static [types.SIGN_OUT](state, action) {
		return state.set("user", {}).set("login", false);
	}
}

export default UserReducer.reduce;
