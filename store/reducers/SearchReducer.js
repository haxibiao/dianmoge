import types from "../types";
import { List } from "immutable";
import { search } from "../state/search";

class SearchReducer {
	static reduce(state = search(), action) {
		if (SearchReducer[action.type]) {
			return SearchReducer[action.type](state, action);
		} else {
			return state;
		}
	}
}

export default SearchReducer.reduce;
