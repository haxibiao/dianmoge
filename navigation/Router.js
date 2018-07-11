import MainTabNavigator from "./MainTabNavigator";

//creation
import CreationScreen from "../screens/creation/CreationScreen";
import ReleaseScreen from "../screens/creation/ReleaseScreen";
import CreationIntroduceScreen from "../screens/creation/IntroduceScreen";
import PublishedScreen from "../screens/creation/PublishedScreen";
import ContributeArticleScreen from "../screens/creation/ContributeScreen";
import ContributeCategoryListScreen from "../screens/creation/CategoryListScreen";
import CreatePostScreen from "../screens/creation/CreatePostScreen";

//notification
import ChatScreen from "../screens/notification/ChatScreen";
import NewChatScreen from "../screens/notification/NewChatScreen";
import CommentsScreen from "../screens/notification/CommentsScreen";
import BeLikedScreen from "../screens/notification/BeLikedScreen";
import FollowNotificationsScreen from "../screens/notification/FollowScreen";
import RequestHomeScreen from "../screens/notification/request/HomeScreen";
import RequestPendingScreen from "../screens/notification/request/PendingScreen";
import RequestCategoryScreen from "../screens/notification/request/CategoryScreen";
import BeRewardScreen from "../screens/notification/BeRewardScreen";
import OtherRemindScreen from "../screens/notification/OtherRemindScreen";
import NotificationSettingScreen from "../screens/notification/SettingScreen";

//recommend
import RecommendHomeScreen from "../screens/recommend/HomeScreen";
import RecommendAuthorsScreen from "../screens/recommend/AuthorsScreen";
import RecommendCategoriesScreen from "../screens/recommend/CategoriesScreen";

//login
import LoginScreen from "../screens/login/LoginScreen";

//my
import BrowsingHistoryScreen from "../screens/my/HistoryScreen";
import HelpScreen from "../screens/my/HelpScreen";
import FeedbackScreen from "../screens/my/FeedbackScreen";

//my editProfile
import EditProfileScreen from "../screens/my/editProfile/HomeScreen";
import EditIntroduceScreen from "../screens/my/editProfile/IntroduceScreen";
import ResetPasswordScreen from "../screens/my/editProfile/ResetPasswordScreen";
import PasswordVerificationScreen from "../screens/my/editProfile/PasswordVerificationScreen";

//my settings
import SettingsScreen from "../screens/my/settings/HomeScreen";
import RewardSettingScreen from "../screens/my/settings/RewardScreen";
import RewardDescriptionScreen from "../screens/my/settings/RewardDescriptionScreen";
import BlacklistScreen from "../screens/my/settings/BlacklistScreen";
import RecycleScreen from "../screens/my/settings/RecycleScreen";
import RecycleDetailScreen from "../screens/my/settings/RecycleDetailScreen";
import AboutUsScreen from "../screens/my/settings/AboutUsScreen";

//my staff
import PrivacyArticle from "../screens/my/staff/DraftsScreen";
import PrivacyArticleDetail from "../screens/my/staff/DraftDetailScreen";
import OpenArticlesScreen from "../screens/my/staff/OpenArticlesScreen";
import FavoritedArticlesScreen from "../screens/my/staff/FavoritedArticlesScreen";
import PaidContentScreen from "../screens/my/staff/PaidContentScreen";
import AllFollowsScreen from "../screens/my/staff/AllFollowsScreen";
import MoveArticleScreen from "../screens/my/staff/MoveArticleScreen";
import ContributeManageScreen from "../screens/my/staff/ContributeManageScreen";

//my wallet
import WalletScreen from "../screens/my/wallet/WalletScreen";
import AnnualIncomeScreen from "../screens/my/wallet/AnnualIncomeScreen";
import TransactionRecordScreen from "../screens/my/wallet/TransactionRecordScreen";
import WithdrawDepositScreen from "../screens/my/wallet/WithdrawDepositScreen";

//user home
import UserHomeScreen from "../screens/user/HomeScreen";
import UserIntroduceScreen from "../screens/user/IntroduceScreen";
import LikedArticlesScreen from "../screens/user/LikedArticlesScreen";
import UserActionsScreen from "../screens/user/ActionsScreen";

//user follows
import FollowersScreen from "../screens/user/follows/FollowersScreen";
import FollowingsScreen from "../screens/user/follows/FollowingsScreen";
import FollowedBooksScreen from "../screens/user/follows/FollowedBooksScreen";

//user category
import CategoriesScreen from "../screens/user/category/ListScreen";
import CategoryCreateScreen from "../screens/user/category/CreateScreen";
import CategoryEditorsScreen from "../screens/user/category/AddAdminsScreen";

//user collection
import CollectionHomeScreen from "../screens/user/collection/HomeScreen";
import CollectionsScreen from "../screens/user/collection/ListScreen";
import CollectionEditScreen from "../screens/user/collection/EditScreen";
import CollectionRankScreen from "../screens/user/collection/RankScreen";

//article
import ArticleDetailScreen from "../screens/article/DetailScreen";
import CommentDetail from "../screens/article/comment/CommentDetailScreen";
import CommentList from "../screens/article/comment/CommentListScreen";
import ArticleRankingScreen from "../screens/article/ranking/ArticleRankingScreen";

//video
import VideoDetailScreen from "../screens/video/DetailScreen";

//category
import CategoryHomeScreen from "../screens/category/HomeScreen";
import CategoryIntroduceScreen from "../screens/category/IntroduceScreen";
import CategoryMembersScreen from "../screens/category/MembersScreen";

// search
import SearchHomeScreen from "../screens/search/HomeScreen";
import SearchArticlesScreen from "../screens/search/ArticlesScreen";
import SearchCategoriesScreen from "../screens/search/CategoriesScreen";
import SearchDetailScreen from "../screens/search/DetailScreen";
import RelatedUsersScreen from "../screens/search/RelatedUsersScreen";
import RelatedCategoriesScreen from "../screens/search/RelatedCategoriesScreen";
import RelatedCollectionsScreen from "../screens/search/RelatedCollectionsScreen";

export default {
  主页: {
    screen: MainTabNavigator
  },
  创作: {
    screen: CreationScreen
  },
  发布: {
    screen: ReleaseScreen
  },
  创作封面: {
    screen: CreationIntroduceScreen
  },
  发布分享: {
    screen: PublishedScreen
  },
  发布动态: {
    screen: CreatePostScreen
  },
  文章投稿: {
    screen: ContributeArticleScreen
  },
  全部专题投稿: {
    screen: ContributeCategoryListScreen
  },
  设置: {
    screen: SettingsScreen
  },
  简介编辑: {
    screen: EditIntroduceScreen
  },
  重置密码: {
    screen: ResetPasswordScreen
  },
  密码验证: {
    screen: PasswordVerificationScreen
  },
  赞赏设置: {
    screen: RewardSettingScreen
  },
  更改赞赏描述: {
    screen: RewardDescriptionScreen
  },
  黑名单: {
    screen: BlacklistScreen
  },
  回收站: {
    screen: RecycleScreen
  },
  回收详情: {
    screen: RecycleDetailScreen
  },
  关于我们: {
    screen: AboutUsScreen
  },
  文章详情: {
    screen: ArticleDetailScreen
  },
  视频详情: {
    screen: VideoDetailScreen
  },
  聊天页: {
    screen: ChatScreen
  },
  新消息: {
    screen: NewChatScreen
  },
  搜索中心: {
    screen: SearchHomeScreen
  },
  搜索详情: {
    screen: SearchDetailScreen
  },
  搜索文章: {
    screen: SearchArticlesScreen
  },
  搜索专题: {
    screen: SearchCategoriesScreen
  },
  相关用户: {
    screen: RelatedUsersScreen
  },
  相关专题: {
    screen: RelatedCategoriesScreen
  },
  相关文集: {
    screen: RelatedCollectionsScreen
  },
  浏览记录: {
    screen: BrowsingHistoryScreen
  },
  常见帮助: {
    screen: HelpScreen
  },
  意见反馈: {
    screen: FeedbackScreen
  },
  推荐关注: {
    screen: RecommendHomeScreen
  },
  推荐作者: {
    screen: RecommendAuthorsScreen
  },
  推荐专题: {
    screen: RecommendCategoriesScreen
  },
  用户详情: {
    screen: UserHomeScreen
  },
  个人介绍: {
    screen: UserIntroduceScreen
  },
  喜欢: {
    screen: LikedArticlesScreen
  },
  动态: {
    screen: UserActionsScreen
  },
  专题详情: {
    screen: CategoryHomeScreen
  },
  专题介绍: {
    screen: CategoryIntroduceScreen
  },
  专题成员: {
    screen: CategoryMembersScreen
  },
  个人专题: {
    screen: CategoriesScreen
  },
  新建专题: {
    screen: CategoryCreateScreen
  },
  编辑列表: {
    screen: CategoryEditorsScreen
  },
  文集详情: {
    screen: CollectionHomeScreen
  },
  个人文集: {
    screen: CollectionsScreen
  },
  文集排序: {
    screen: CollectionRankScreen
  },
  编辑文集: {
    screen: CollectionEditScreen
  },
  关注的专题和文集: {
    screen: FollowedBooksScreen
  },
  编辑个人资料: {
    screen: EditProfileScreen
  },
  评论详情: {
    screen: CommentDetail
  },
  评论中心: {
    screen: CommentList
  },
  登录注册: {
    screen: LoginScreen
  },
  私密作品: {
    screen: PrivacyArticle
  },
  私密文章详情: {
    screen: PrivacyArticleDetail
  },
  我的发布: {
    screen: OpenArticlesScreen
  },
  我的收藏: {
    screen: FavoritedArticlesScreen
  },
  已购内容: {
    screen: PaidContentScreen
  },
  我的钱包: {
    screen: WalletScreen
  },
  我的收入: {
    screen: AnnualIncomeScreen
  },
  交易记录: {
    screen: TransactionRecordScreen
  },
  提现: {
    screen: WithdrawDepositScreen
  },
  新的关注: {
    screen: FollowNotificationsScreen
  },
  全部关注: {
    screen: AllFollowsScreen
  },
  选择文集: {
    screen: MoveArticleScreen
  },
  投稿管理: {
    screen: ContributeManageScreen
  },
  排行榜: {
    screen: ArticleRankingScreen
  },
  评论: {
    screen: CommentsScreen
  },
  喜欢和赞: {
    screen: BeLikedScreen
  },
  关注: {
    screen: FollowingsScreen
  },
  粉丝: {
    screen: FollowersScreen
  },
  投稿请求: {
    screen: RequestHomeScreen
  },
  全部未处理请求: {
    screen: RequestPendingScreen
  },
  专题投稿管理: {
    screen: RequestCategoryScreen
  },
  赞赏和付费: {
    screen: BeRewardScreen
  },
  其它提醒: {
    screen: OtherRemindScreen
  },
  推送通知: {
    screen: NotificationSettingScreen
  }
};
