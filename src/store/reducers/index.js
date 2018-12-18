import ArticleReducer from './ArticleReducer';
import UserReducer from './UserReducer';
import CategoryReducer from './CategoryReducer';
import SearchReducer from './SearchReducer';
import ScreenStatusReducer from './ScreenStatusReducer';

export default {
	articles: ArticleReducer,
	users: UserReducer,
	categories: CategoryReducer,
	search: SearchReducer,
	screenStatus: ScreenStatusReducer
};
