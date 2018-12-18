import types from "../types";
import { List } from "immutable";
import { categories } from "../state/categories";

class CategoryReducer {
	static reduce(state = categories(), action) {
		if (CategoryReducer[action.type]) {
			return CategoryReducer[action.type](state, action);
		} else {
			return state;
		}
	}

	static [types.EDIT_CATEGORY_ADMINS](state, actions) {
		return state.set("admin_uids", actions.userIds);
	}
}

export default CategoryReducer.reduce;
