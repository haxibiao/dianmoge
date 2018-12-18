import types from "../types";
import { List } from "immutable";
import { articles } from "../state/articles";

class ArticleReducer {
  static reduce(state = articles(), action) {
    if (ArticleReducer[action.type]) {
      return ArticleReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [types.SET_HOME_ARTICLES](state, action) {
    return state.set("hot_articles", new List(action.articles));
  }

  static [types.SET_USER_ARTICLES](state, action) {
    return state.set("user_articles_dynamic", new List(action.articles));
  }
}

export default ArticleReducer.reduce;
