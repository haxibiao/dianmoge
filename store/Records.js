import { Record, List } from "immutable";

export const articleState = Record({
	categories: new List(),
	hot_articles: new List(),
	poster_articles: new List(_getArticleState().poster_articles),
	recommend_articles: new List(),
	cate: new List(),
	all: new List(),
	current_article: _getArticleState().current_article,
	user_articles_dynamic: _getArticleState().user_articles_dynamic,
	search: new List(),
	favorited: new List(),
	visited: new List(),
	refreshing: false,
	loading: false,
	page: 1,
});

export const userState = Record({
	all_follows: _getUserState().all_follows,
	recommend_authors: _getUserState().recommend_authors,
	login: false,
	user: _getUserState().user,
	recommend_follow: _getUserState().recommend_follow,
	user_articles: _getUserState().user_articles,
	be_comments: _getUserState().be_comments,
	be_likes: _getUserState().be_likes,
	followers: _getUserState().followers,
	be_rewards: _getUserState().be_rewards,
	contribute_request: _getUserState().contribute_request,
	all_pending_contribute: _getUserState().all_pending_contribute,
	category_contribute_manage: _getUserState().category_contribute_manage,
	other_remind: _getUserState().other_remind,
	chats: _getUserState().chats,
	followed_users: _getUserState().followed_users,
	backFromUserDetail:false,
});

export const categoryState = Record({
	follows: new List(),
	special_columns: _getCategoryState().special_columns,
	recommend_categories: _getCategoryState().recommend_categories,
	current_category: _getCategoryState().current_category,
	current_collection: _getCategoryState().current_collection,
});

export const defaults = {
	// ..._getUserState(),
	..._getCategoryState()
};

function _getArticleState() {
	return {
		poster_articles: [
			{ id: "001", uri: "https://dongmeiwei.com/images/carousel001.jpg" },
			{ id: "002", uri: "https://dongmeiwei.com/images/carousel002.jpg" },
			{ id: "003", uri: "https://dongmeiwei.com/images/carousel003.jpg" },
			{ id: "004", uri: "https://dongmeiwei.com/images/carousel004.jpg" },
			{ id: "005", uri: "https://dongmeiwei.com/images/carousel005.jpg" },
			{ id: "006", uri: "https://dongmeiwei.com/images/carousel006.jpg" },
			{ id: "007", uri: "https://dongmeiwei.com/images/carousel007.jpg" }
		],
		current_article: {
			author: {
				id: 1,
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/storage/avatar/17.jpg",
				describe: "懂美味首席美食主编，兼CEO",
				followed: 0,
				type: "user",
				reward_describe: ""
			},
			info: {
				time_ago: "2018-02-25 10:30",
				words: 1099,
				reading: 580,
				likes: 48,
				relevance_collection: "日记本",
				be_selected_category: [
					{
						id: 1,
						name: "美食日记",
						avatar: "https://dongmeiwei.com/storage/avatar/17.jpg",
						count_articles:998,
						count_follows:16970,
					},
					{
						id: 2,
						name: "半夜食堂",
						avatar: "https://dongmeiwei.com/images/author_02.jpg",
						count_articles:998,
						count_follows:16970,
					},
					{
						id: 3,
						name: "简单夜宵",
						avatar: "https://dongmeiwei.com/images/author_03.jpg",
						count_articles:998,
						count_follows:16970,
					},
					{
						id: 4,
						name: "炒饭大全",
						avatar: "https://dongmeiwei.com/images/author_04.jpg",
						count_articles:998,
						count_follows:16970,
					},
					{
						id: 5,
						name: "温馨家常味",
						avatar: "https://dongmeiwei.com/images/author_05.jpg",
						count_articles:998,
						count_follows:16970,
					}
				],
				reward_users: [
					{
						id: 1,
						avatar: "https://dongmeiwei.com/images/author_09.jpg",
						name: "月亮之上",
						leaveMessage: "给你一颗小糖糖",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 2,
						avatar: "https://dongmeiwei.com/images/author_02.jpg",
						name: "思思同学",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 3,
						avatar: "https://dongmeiwei.com/images/author_03.jpg",
						name: "熊本君",
						leaveMessage: "为你打call",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 4,
						avatar: "https://dongmeiwei.com/images/author_05.jpg",
						name: "只看风月",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 5,
						avatar: "https://dongmeiwei.com/images/author_06.jpg",
						name: "春花秋月",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 6,
						avatar: "https://dongmeiwei.com/images/author_07.jpg",
						name: "思思同学",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 7,
						avatar: "https://dongmeiwei.com/images/author_08.jpg",
						name: "熊本君",
						time: "2018.02.28 09:28",
						money: 5
					},
					{
						id: 8,
						avatar: "https://dongmeiwei.com/images/author_01.jpg",
						name: "只看风月",
						time: "2018.02.28 09:28",
						money: 5
					}
				]
			},
			content: {
				title: "“日不落”黄金海鲜炒饭 — 送给加班至深夜才归家的人",
				body: `
				<article><p>一碗“日不落”黄金海鲜炒饭，送给加班至深夜才归家的人，即使没有了太阳，也能感受到如日光般的温暖。</p><p><img width="300" height="240" src="https://dongmeiwei.com/storage/img/12090.jpg" width="660" height="369"><br></p><p>用料 &nbsp;</p><p>冷饭	1碗</p><p>虾	7-8只</p><p>八爪鱼	1只</p><p>贝柱	7-8颗</p><p>鸡蛋	1-2只</p><p>小葱	一小把</p><p>生姜	2-3片</p><p>料酒	1勺</p><p>盐	少许</p><p>色拉油	少许</p><p>&nbsp;&nbsp;</p><p>准备食材，海鲜可根据个人喜好选择，虾去壳去沙线，八爪鱼剪开去内脏，鸡蛋的蛋清蛋黄分开。&nbsp;</p><p><img alt="12a70f4999a54475b6af2f9d0332c796_2168w_1535h (1).jpg" src="https://dongmeiwei.com/storage/img/12085.jpg" width="300" height="212"><br></p><p>1.冷饭里倒入蛋黄、少许色拉油，搅拌均匀。</p><p>2.虾头、虾尾分开，虾头备用，虾仁倒入蛋清里。</p><p>3.八爪鱼剪碎，和贝柱放在一起，倒入料酒抓匀。&nbsp;</p><p><img alt="8ca3a79f0a284286b721b03be9c7485c_2048w_1536h.jpg" src="https://dongmeiwei.com/storage/img/12088.jpg" width="300" height="225"><br></p><p>起油锅，葱姜爆香，以大火将虾仁、八爪鱼、贝柱迅速炒熟后盛出。时间不宜过长，否则口感会老。不想浪费的话拌虾仁剩余的蛋清也可一同炒熟盛出。</p><p>&nbsp;<img alt="3d6b0df8e409463a9f7d88180b349c9c_2610w_1536h.jpg" src="https://dongmeiwei.com/storage/img/12087.jpg" width="300" height="177"></p><p>&nbsp;</p><p>1.另起油锅，放入虾头炸虾油。</p><p><img alt="04112412005a4cd9a66a84cfe990a5aa_2134w_1535h.jpg" src="https://dongmeiwei.com/storage/img/12086.jpg" width="300" height="216"><br></p><p>2.虾油炸好后把虾头扔掉，倒入裹好蛋液的冷饭以小火迅速翻炒，当米饭可以在炒锅里愉快地跳跃时转成大火，倒入小葱和炒好的海鲜、蛋清，撒少许盐调味，翻炒片刻后盛出。</p><p><img alt="2230759febde4febacc129458d77e435_1055w_590h.jpg" src="https://dongmeiwei.com/storage/img/12089.jpg" width="300" height="168">&nbsp;</p><p>&nbsp;</p><p>最后，别忘了拍个美照发朋友圈。&nbsp;</p><p>小贴士</p><p>嫌麻烦的童鞋可以忽略虾仁裹蛋清和炸虾油这两步，对口味的影响不会相差太多，火候是做这道炒饭中最关键的，其实做的好与不好不是最重要，最重要的是深夜里的那一份温情。</p></article>
				`
			},
			comments: [
				{
					id: 1,
					user: {
						id: 1,
						name: "嘿嘿嘿",
						avatar: "https://dongmeiwei.com/storage/avatar/17.jpg"
					},
					time: "6楼·02.18 18:30",
					liked: 1,
					likes: 68,
					body: "“日不落”黄金海鲜炒饭 — 送给加班至深夜才归家的人",
					reply_comments: [
						{
							id: 111,
							user: { id: 2, name: "熊本君" },
							reply_user: { id: 1, name: "思思同学" },
							body:
								"为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
						},
						{
							id: 112,
							user: { id: 3, name: "只看风月" },
							reply_user: { id: 1, name: "熊本君" },
							body: "哇塞，已get！都快流口水了！回家马上尝试🤤。"
						},
						{
							id: 113,
							user: { id: 4, name: "思思同学" },
							reply_user: { id: 1, name: "嘿嘿嘿" },
							body: "今晚就想做这个当晚饭，可惜木有虾啊！"
						},
						{
							id: 114,
							user: { id: 5, name: "熊本君" },
							reply_user: { id: 1, name: "只看风月" },
							body:
								"为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
						},
						{
							id: 115,
							user: { id: 6, name: "只看风月" },
							reply_user: {},
							body: "哇塞，已get！都快流口水了！回家马上尝试🤤。"
						},
						{
							id: 116,
							user: { id: 7, name: "思思同学" },
							reply_user: {},
							body: "今晚就想做这个当晚饭，可惜木有虾啊！"
						},
						{
							id: 117,
							user: { id: 8, name: "熊本君" },
							reply_user: {},
							body: "哇塞，已get！都快流口水了！回家马上尝试🤤。"
						},
						{
							id: 118,
							user: { id: 9, name: "只看风月" },
							reply_user: {},
							body: "今晚就想做这个当晚饭，可惜木有虾啊！"
						}
					]
				},
				{
					id: 2,
					user: {
						id: 2,
						name: "思思同学",
						avatar: "https://dongmeiwei.com/images/author_02.jpg"
					},
					time: "3楼·02.18 18:30",
					liked: 0,
					likes: 26,
					body: "第一次尝试，家人都说好好吃，O(∩_∩)O",
					reply_comments: [
						{
							user: { id: 3, name: "熊本君" },
							body: "好厉害，我也要吃。嘻嘻"
						}
					]
				},
				{
					id: 3,
					user: {
						id: 3,
						name: "熊本君",
						avatar: "https://dongmeiwei.com/images/author_03.jpg"
					},
					time: "8楼·02.18 18:30",
					liked: 0,
					likes: 12,
					body:
						"我想减肥，但是看到这么多美味，还是算了吧ㄟ( ▔, ▔ )ㄏ",
					reply_comments: []
				}
			]
		},
		user_articles_dynamic: {
			author: {
				id: 1,
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/storage/avatar/17.jpg",
				describe: "懂美味首席美食主编，兼CEO",
				followed: 0,
				type: "user",
				reward_describe: ""
			},
			newest_publish: [
				{
					id: 1,
					title: "家常菜谱 | 剁椒蒜苗",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12755.small.jpg"
				},
				{
					id: 2,
					title: "懒人食谱 | 海鲜炒饭 — 营养美味",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12743.small.jpg"
				},
				{
					id: 3,
					title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12737.small.jpg"
				},
				{
					id: 4,
					title:
						"食疗养生 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12727.small.jpg"
				},
				{
					id: 5,
					title: "食疗养生 | 花菇炖鸡 — 味道鲜美，还能滋补益气",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12714.small.jpg"
				},
				{
					id: 6,
					title: "湖南美食 | 笋干炒腊肉 — 香辣、香鲜、软嫩",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12703.small.jpg"
				},
				{
					id: 7,
					title:
						"美食 |  避风塘炒虾 — 色泽金黄，蒜香，肉香交织一起，尽是如此完美的味道",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12696.small.jpg"
				}
			],
			newest_comments: [
				{
					id: 3,
					title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12737.small.jpg"
				},
				{
					id: 4,
					title:
						"食疗养生 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12727.small.jpg"
				},
				{
					id: 5,
					title: "食疗养生 | 花菇炖鸡 — 味道鲜美，还能滋补益气",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12714.small.jpg"
				},
				{
					id: 1,
					title: "家常菜谱 | 剁椒蒜苗",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12755.small.jpg"
				},
				{
					id: 2,
					title: "懒人食谱 | 海鲜炒饭 — 营养美味",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12743.small.jpg"
				},
				{
					id: 6,
					title: "湖南美食 | 笋干炒腊肉 — 香辣、香鲜、软嫩",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12703.small.jpg"
				},
				{
					id: 7,
					title:
						"美食 |  避风塘炒虾 — 色泽金黄，蒜香，肉香交织一起，尽是如此完美的味道",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12696.small.jpg"
				}
			],
			hot: [
				{
					id: 5,
					title: "食疗养生 | 花菇炖鸡 — 味道鲜美，还能滋补益气",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12714.small.jpg"
				},
				{
					id: 6,
					title: "湖南美食 | 笋干炒腊肉 — 香辣、香鲜、软嫩",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12703.small.jpg"
				},
				{
					id: 7,
					title:
						"美食 |  避风塘炒虾 — 色泽金黄，蒜香，肉香交织一起，尽是如此完美的味道",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12696.small.jpg"
				},
				{
					id: 1,
					title: "家常菜谱 | 剁椒蒜苗",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12755.small.jpg"
				},
				{
					id: 2,
					title: "懒人食谱 | 海鲜炒饭 — 营养美味",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12743.small.jpg"
				},
				{
					id: 3,
					title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12737.small.jpg"
				},
				{
					id: 4,
					title:
						"食疗养生 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效",
					time: "3小时前",
					meta: ["阅读5", "评论0", "喜欢0", "赞赏0"],
					pic:
						"https://www.dongmeiwei.com/storage/img/12727.small.jpg"
				}
			]
		},
	};
}

function _getUserState() {
	return {
		recommend_follow: [
			{
				id: 1,
				user: {
					id: 1,
					name: "老张",
				},
				author: {
					id: 1,
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					name: '春花秋月',
					followed: 0,
					describe: '因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！',
					recently_updata: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"]
				}
			},
			{
				id: 2,
				user: {
					id: 2,
					name: "老张",
				},
				author: {
					id: 2,
					avatar: "https://dongmeiwei.com/images/author_04.jpg",
					name: '春花秋月',
					followed: 0,
					describe: '因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！',
					recently_updata: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"]
				}
			},
			{
				id: 3,
				user: {
					id: 3,
					name: "老张",
				},
				author: {
					id: 3,
					avatar: "https://dongmeiwei.com/images/author_05.jpg",
					name: '春花秋月',
					followed: 0,
					describe: '因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！',
					recently_updata: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"]
				}
			},
			{
				id: 4,
				user: {
					id: 4,
					name: "老李",
				},
				category: {
					id: 4,
					count_articles:1998,
					count_follows:15890,
					avatar: "https://dongmeiwei.com/images/detail_01.jpg",
					name: '老司机教程',
					followed: 0,
					describe: '这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！',
				}
			},
			{
				id: 5,
				user: {
					id: 5,
					name: "老李",
				},
				category: {
					id: 5,
					count_articles:1998,
					count_follows:15890,
					avatar: "https://dongmeiwei.com/images/detail_02.jpg",
					name: '老司机教程',
					followed: 0,
					describe: '这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！',
				}
			},
		],
		recommend_authors: [
			{
				id: 1,
				avatar: "https://dongmeiwei.com/images/author_09.jpg",
				name: "春花秋月",
				info: "懂美味推荐",
				followed: 0,
			},
			{
				id: 2,
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				name: "思思同学",
				info: "嘿嘿嘿关注",
				followed: 0,
			},
			{
				id: 3,
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				name: "熊本君",
				info: "懂美味推荐",
				followed: 0,
			},
			{
				id: 4,
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				name: "只看风月",
				info: "嘿嘿嘿关注",
				followed: 0,
			},
			{
				id: 5,
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				name: "春花秋月",
				info: "懂美味推荐",
				followed: 0,
			},
			{
				id: 6,
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				name: "思思同学",
				info: "嘿嘿嘿关注",
				followed: 0,
			},
			{
				id: 7,
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				name: "熊本君",
				info: "懂美味推荐",
				followed: 0,
			},
			{
				id: 8,
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				name: "只看风月",
				info: "嘿嘿嘿关注",
				followed: 0,
			}
		],
		user: {
			id:666,
			name: "眸若止水",
			avatar: "https:dongmeiwei.com/images/xbx.jpg",
			introduce: "我很懒，什么也不想留下",
			// words: 26800,
			// likes: 228,
			// articles: 68,
			// followed: 98,
			// follower: 5200,
			// privacy_articles: 10,
			// collect_articles: 28,
			// liked_articles: 16,
			// own_diamond_articles: 0,
			// categories: 3,
			// collections: 6,
			// followed_works: 22,
			balance: 99.0
		},
		user_articles: [
			{id:1,title:'我就随便写点，不要当真'},
			{id:2,title:'你现在学会了了什么'},
			{id:3,title:'苦瓜炒蛋学会了吗'},
			{id:4,title:'我来教你青椒炒蛋'},
			{id:5,title:'你炒的是什么玩意'},
			{id:6,title:'你会炒菜了吗'},
		],
		all_follows: [
			{
				id: 1,
				type: "category",
				name: "满汉全席",
				avatar: "https://dongmeiwei.com/images/detail_01.jpg",
				push_update: true,
				recent_update: '白毛浮绿水，红掌拨清波。一行白鹭上青天--我也不知道在说什么',
				updates: 18,
			},
			{
				id: 4,
				type: "user",
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				push_update: true,
				recent_update: '社会人都是吃的小猪佩奇饼干是什么，带你大开眼界',
				updates: 16,
			},
			{
				id: 2,
				type: "category",
				name: "青椒炒蛋你会了吗",
				avatar: "https://dongmeiwei.com/images/detail_02.jpg",
				push_update: false,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 9,
			},
			{
				id: 5,
				type: "category",
				name: "辣椒炒肉你懂吗",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				push_update: true,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 8,
			},
			{
				id: 3,
				type: "category",
				name: "海天盛筵",
				avatar: "https://dongmeiwei.com/images/detail_05.jpg",
				push_update: false,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 12,
			},
			{
				id: 6,
				type: "category",
				name: "好好看好好学",
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				push_update: false,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 9,
			},
			{
				id: 7,
				type: "category",
				name: "佛系炒菜",
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				push_update: true,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 10,
			},
			{
				id: 8,
				type: "category",
				name: "黑暗料理",
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				push_update: false,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 0,
			},
			{
				id: 9,
				type: "category",
				name: "懒人食谱",
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				push_update: false,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 0,
			},
			{
				id: 10,
				type: "category",
				name: "懒猪食谱",
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				push_update: false,
				recent_update: '吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法',
				updates: 5,
			},
			{
				id: 11,
				type: "collection",
				name: "社会人专属食谱",
				avatar: "https://dongmeiwei.com/images/collection.png",
				push_update: true,
				recent_update: '这是我的第一篇美食日记，专门记录我的每日吃货',
				updates: 2,
			},
			{
				id: 12,
				type: "collection",
				name: "美味日记",
				avatar: "https://dongmeiwei.com/images/collection.png",
				push_update: false,
				recent_update: '这是我的第一篇美食日记，专门记录我的每日吃货',
				updates: 0,
			},
			{
				id: 13,
				type: "user",
				name: "螺旋走累",
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				push_update: false,
				recent_update: '社会人都是吃的小猪佩奇饼干是什么，带你大开眼界',
				updates: 0,
			},
			{
				id: 14,
				type: "user",
				name: "高高高高璇",
				avatar: "https://dongmeiwei.com/images/author_09.jpg",
				push_update: false,
				recent_update: '社会人都是吃的小猪佩奇饼干是什么，带你大开眼界',
				updates: 0,
			},
			{
				id: 15,
				type: "user",
				name: "磨人的小妖精",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				push_update: false,
				recent_update: '社会人都是吃的小猪佩奇饼干是什么，带你大开眼界',
				updates: 1,
			},
			{
				id: 16,
				type: "user",
				name: "社会大姐大",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				push_update: false,
				recent_update: '社会人都是吃的小猪佩奇饼干是什么，带你大开眼界',
				updates: 2,
			},
		],
		be_comments: [
			{id:1,user:{id:1,name:'艾灸',avatar: "https://dongmeiwei.com/images/author_01.jpg"},type:'mention',article:{id:1,title:'佛系炒青蛙'},body:'我觉得你真的是屌的一批，我只想为你打call',time_ago:'02-28 09:21'},
			{id:2,user:{id:2,name:'月亮之上',avatar: "https://dongmeiwei.com/images/author_02.jpg"},type:'comment',article:{id:2,title:'西北佛跳墙'},body:'我觉得你真的是屌的一批，我只想为你打call',time_ago:'17-12-28 19:21'},
			{id:3,user:{id:3,name:'月亮之上',avatar: "https://dongmeiwei.com/images/author_02.jpg"},type:'add',article:{id:2,title:'西北佛跳墙'},body:'我觉得你真的是屌的一批，我只想为你打call',time_ago:'17-11-28 19:21'},
			{id:4,user:{id:4,name:'boss张',avatar: "https://dongmeiwei.com/images/author_06.jpg"},type:'comment',article:{id:4,title:'南北豆腐之争，豆花是甜的好还是咸的好'},body:'我觉得可以，这个豆花应该非常的好吃😋',time_ago:'67-11-28 19:21'},
			{id:5,user:{id:5,name:'boss张',avatar: "https://dongmeiwei.com/images/author_06.jpg"},type:'comment',article:{id:4,title:'东北大萝卜'},body:'我觉得可以，这个萝卜应该非常的好吃😋',time_ago:'17-11-28 19:21'},
		],
		be_likes: [
			{id:9,user:{id:9,name:'wuli坤坤'},type:'praise',comment:{id:9,body:'我觉得这很社会人'},time_ago:'17-12-28 11:30'},
			{id:1,user:{id:1,name:'老瓜皮'},type:'like',article:{id:1,title:'瓜皮炒菜'},time_ago:'02-28 09:21'},
			{id:2,user:{id:2,name:'我是boss张'},type:'like',article:{id:2,title:'南北豆腐之争，豆花是甜的好还是咸的好'},time_ago:'02-28 09:21'},
			{id:3,user:{id:3,name:'月亮之上的那只兔子'},type:'like',article:{id:3,title:'我讨厌吃兔子'},time_ago:'02-28 09:21'},
			{id:4,user:{id:4,name:'我是浩南哥'},type:'like',article:{id:4,title:'社会人都是吃的小猪佩奇饼干是什么，带你大开眼界'},time_ago:'02-28 09:21'},
			{id:5,user:{id:5,name:'老瓜皮'},type:'like',article:{id:5,title:'瓜皮炒菜'},time_ago:'02-28 09:21'},
			{id:6,user:{id:6,name:'我是boss张'},type:'like',article:{id:6,title:'南北豆腐之争，豆花是甜的好还是咸的好'},time_ago:'02-28 09:21'},
			{id:7,user:{id:7,name:'月亮之上的那只兔子'},type:'like',article:{id:7,title:'我讨厌吃兔子'},time_ago:'02-28 09:21'},
			{id:8,user:{id:8,name:'我是浩南哥'},type:'like',article:{id:8,title:'社会人都是吃的小猪佩奇饼干是什么，带你大开眼界'},time_ago:'02-28 09:21'},
		],
		followers: [
			{user:{id:1,name:'齐天大圣',avatar:'https://dongmeiwei.com/images/author_01.jpg',followed:false,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:2,name:'中二少年',avatar:'https://dongmeiwei.com/images/author_02.jpg',followed:false,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:3,name:'王鑫_bbob',avatar:'https://dongmeiwei.com/images/author_03.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:4,name:'月亮之上',avatar:'https://dongmeiwei.com/images/author_04.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:5,name:'追风少年',avatar:'https://dongmeiwei.com/images/author_05.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:6,name:'我是浩南哥',avatar:'https://dongmeiwei.com/images/author_06.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:7,name:'女装大佬',avatar:'https://dongmeiwei.com/images/author_07.jpg',followed:false,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:8,name:'高高高高璇',avatar:'https://dongmeiwei.com/images/author_08.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:9,name:'嘿嘿嘿',avatar:'https://dongmeiwei.com/images/author_01.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
			{user:{id:10,name:'boss张',avatar:'https://dongmeiwei.com/images/author_02.jpg',followed:true,beFollowed:true},time_ago:'02-28 09:21'},
		],
		be_rewards: [
			{
				id:1,
				user:{id:1,name:'艾灸',avatar: "https://dongmeiwei.com/images/author_01.jpg"},article:{id:1,title:'带你来看看看什么是佛系炒青蛙'},
				money: 10,
				account: 9.6,
				leave_meaasge:'我觉得你真的是屌的一批，我只想为你打call',
				time_ago:'2018年2月18日 18:48',
				pattern_payment:'支付宝',
			},
			{
				id:2,
				user:{id:2,name:'嘿嘿嘿',avatar: "https://dongmeiwei.com/images/author_02.jpg"},article:{id:2,title:'南北豆腐之争，豆花是甜的好还是咸的好'},
				money: 1,
				account: 0.96,
				leave_meaasge:null,
				time_ago:'2018年2月18日 18:48',
				pattern_payment:'支付宝',
			},
			{
				id:3,
				user:{id:3,name:'boss张',avatar: "https://dongmeiwei.com/images/author_06.jpg"},article:{id:3,title:'社会人吃的小猪佩奇饼干做法--get！'},
				money: 100,
				account: 96,
				leave_meaasge:null,
				time_ago:'2018年2月18日 18:48',
				pattern_payment:'支付宝',
			},
			{
				id:4,
				user:{id:4,name:'王思聪',avatar: "https://dongmeiwei.com/images/author_04.jpg"},article:{id:4,title:'如何成为一名合格的大厨！'},
				money: 10000,
				account: 9600,
				leave_meaasge:'有钱任性',
				time_ago:'2018年2月08日 18:48',
				pattern_payment:'支付宝',
			},
		],
		contribute_request: [
			{
				category:{id:1,name:'佛系炒菜',avatar:"https://dongmeiwei.com/images/detail_01.jpg"},
				newest_article:"佛跳墙怎么做才能好吃的跳起来",
				newest_contribute_count: 2,
				pending: 4,
			},
			{
				category:{id:2,name:'满汉全席',avatar:"https://dongmeiwei.com/images/detail_02.jpg"},
				newest_article:null,
				newest_contribute_count: 0,
				pending: 5,
			},
			{
				category:{id:3,name:'黑暗料理',avatar:"https://dongmeiwei.com/images/detail_03.jpg"},
				newest_article:null,
				newest_contribute_count: 0,
				pending: 0,
			}
		],
		all_pending_contribute: [
			{
				user:{id:5,name:'小猪佩奇',avatar:'https://dongmeiwei.com/images/author_05.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:5,title:'爆炒宁乡花猪肉'},
				status:'pending',
				time_ago:'10分钟前'
			},
			{
				user:{id:4,name:'喵喵喵',avatar:'https://dongmeiwei.com/images/author_04.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:4,title:'给你来二两猫屎咖啡？'},
				status:'pending',
				time_ago:'30分钟前'
			},
			{
				user:{id:1,name:'齐天大圣',avatar:'https://dongmeiwei.com/images/author_01.jpg'},
				category:{id:3,name:'黑暗料理'},
				article:{id:1,title:'无机鸡和乌鸡'},
				status:'pending',
				time_ago:'2018.02.18 09:21'
			},
			{
				user:{id:2,name:'我是一个小瓜皮',avatar:'https://dongmeiwei.com/images/author_02.jpg'},
				category:{id:1,name:'佛系炒菜'},
				article:{id:2,title:'冬瓜皮炒西瓜皮'},
				status:'pending',
				time_ago:'2018.02.18 09:21'
			},
			{
				user:{id:3,name:'boss张',avatar:'https://dongmeiwei.com/images/author_03.jpg'},
				category:{id:1,name:'佛系炒菜'},
				article:{id:3,title:'清蒸猪头'},
				status:'pending',
				time_ago:'2018.02.18 09:21'
			}
		],
		category_contribute_manage: [
			{
				user:{id:5,name:'小猪佩奇',avatar:'https://dongmeiwei.com/images/author_05.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:5,title:'爆炒宁乡花猪肉'},
				status:'pending',
				time_ago:'10分钟前'
			},
			{
				user:{id:4,name:'喵喵喵',avatar:'https://dongmeiwei.com/images/author_04.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:4,title:'给你来二两猫屎咖啡？'},
				status:'pending',
				time_ago:'30分钟前'
			},
			{
				user:{id:1,name:'齐天大圣',avatar:'https://dongmeiwei.com/images/author_01.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:1,title:'潮汕砂锅粥'},
				status:'successful',
				time_ago:'2018.02.18 09:21'
			},
			{
				user:{id:2,name:'我是一个小瓜皮',avatar:'https://dongmeiwei.com/images/author_02.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:2,title:'瓜皮炒鸡蛋'},
				status:'rejected',
				time_ago:'2018.02.18 09:21'
			},
			{
				user:{id:3,name:'boss张',avatar:'https://dongmeiwei.com/images/author_03.jpg'},
				category:{id:2,name:'满汉全席'},
				article:{id:3,title:'我只会土豆丝炒肉'},
				status:'withdraw',
				time_ago:'2018.02.18 09:21'
			}
		],
		other_remind: [
			{id:1,type:'be_followed',user:{id:1,name:'咕噜咕噜球'},category:{id:1,name:'佛系炒菜'},time_ago:'2018.02.18 09:21'},
			{id:2,type:'gift',info:'恭喜！你获得懂美味优惠券一张，已存入你的钱包，购买付费内容时可用',time_ago:'2018.02.18 09:21'},
			{id:3,type:'successful',article:{id:3,title:'社会人都是吃的小猪佩奇饼干是什么，带你大开眼界'},category:{id:3,name:'网红美食'},time_ago:'2018.02.18 09:21'},
			{id:4,type:'rejected',article:{id:4,title:'我喜欢吃兔子'},category:{id:4,name:'动物组织保护协会'},time_ago:'2018.02.18 09:21'},
			{id:5,type:'gift',info:'恭喜！你获得懂美味优惠券一张，已存入你的钱包，购买付费内容时可用',time_ago:'2018.02.18 09:21'},
			{id:6,type:'be_followed',user:{id:6,name:'boss张大仙'},category:{id:6,name:'满汉全席'},time_ago:'2018.02.18 09:21'},
		],
		chats: [
			{
				id: 1,
				last_message: {
					message: "不曾在你辉煌时慕名而来,也未曾在你低谷时离你而去,我来了,只为你O(∩_∩)O~~"
				},
				with_user: {
					id: 1,
					name: "漂洋过海来看你",
					avatar: "https://dongmeiwei.com/images/author_01.jpg"
				},
				time_ago: '刚刚',
			},
			{
				id: 2,
				last_message: {
					message: "我，秦始皇，打钱！"
				},
				with_user: {
					id: 2,
					name: "秦始皇",
					avatar: "https://dongmeiwei.com/images/author_02.jpg"
				},
				time_ago: '1小时前',
			},
			{
				id: 3,
				last_message: {
					message: "听说你会佛系炒菜"
				},
				with_user: {
					id: 3,
					name: "如来大仙",
					avatar: "https://dongmeiwei.com/images/author_03.jpg"
				},
				time_ago: '1天前',
			},
			{
				id: 4,
				last_message: {
					message: "我是你的小迷妹"
				},
				with_user: {
					id: 4,
					name: "暴走萝莉",
					avatar: "https://dongmeiwei.com/images/author_04.jpg"
				},
				time_ago: '03-28 16:30',
			},
			{
				id: 5,
				last_message: {
					message: "我要和你切磋一下，敢不敢？"
				},
				with_user: {
					id: 5,
					name: "我是厨神",
					avatar: "https://dongmeiwei.com/images/author_05.jpg"
				},
				time_ago: '02-28 11:28',
			},
			{
				id: 6,
				last_message: {
					message: "新东方要不要来了解一下😊"
				},
				with_user: {
					id: 6,
					name: "俞敏洪",
					avatar: "https://dongmeiwei.com/images/author_06.jpg"
				},
				time_ago: '2017-12-25 16:06',
			}
		],
		followed_users: [
			{user:{id:1,name:'齐天大圣',avatar:'https://dongmeiwei.com/images/author_01.jpg',words:11945,likes:896,followed:true,beFollowed:false}},
			{user:{id:2,name:'中二少年',avatar:'https://dongmeiwei.com/images/author_02.jpg',words:11945,likes:896,followed:true,beFollowed:false}},
			{user:{id:3,name:'王鑫_bbob',avatar:'https://dongmeiwei.com/images/author_03.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:4,name:'月亮之上',avatar:'https://dongmeiwei.com/images/author_04.jpg',words:11945,likes:896,followed:true,beFollowed:false}},
			{user:{id:5,name:'追风少年',avatar:'https://dongmeiwei.com/images/author_05.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:6,name:'我是浩南哥',avatar:'https://dongmeiwei.com/images/author_06.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:7,name:'女装大佬',avatar:'https://dongmeiwei.com/images/author_07.jpg',words:11945,likes:896,followed:true,beFollowed:false}},
			{user:{id:8,name:'高高高高璇',avatar:'https://dongmeiwei.com/images/author_08.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:9,name:'嘿嘿嘿',avatar:'https://dongmeiwei.com/images/author_01.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:10,name:'boss张',avatar:'https://dongmeiwei.com/images/author_02.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:11,name:'嘻嘻嘻',avatar:'https://dongmeiwei.com/images/author_03.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
			{user:{id:12,name:'张大师',avatar:'https://dongmeiwei.com/images/author_04.jpg',words:11945,likes:896,followed:true,beFollowed:true}},
		]
	};
}

function _getCategoryState() {
	return {
		special_columns: [
			{
				id: 1,
				avatar: "https://www.dongmeiwei.com/images/app/follows.png",
				name: "关注的专题",
				type: "用户关注",
			},
			{
				id: 2,
				avatar: "https://www.dongmeiwei.com/images/app/rank.png",
				name: "排行榜",
				type: "排行榜",
			},
			{
				id: 3,
				avatar: "https://www.dongmeiwei.com/images/app/categories.png",
				name: "官方专题",
				type: "都有专属页面",
			},
			{
				id: 4,
				avatar: "https://www.dongmeiwei.com/images/app/study.png",
				name: "美食学堂",
				type: "都有专属页面",
			},
			{
				id: 5,
				avatar: "https://www.dongmeiwei.com/images/app/wallet.png",
				name: "我的钱包",
				type: "都有专属页面",
			},
			{
				id: 6,
				avatar: "https://www.dongmeiwei.com/images/app/food01.png",
				name: "私房菜",
				type: "都有专属页面",
			},
			{
				id: 7,
				avatar: "https://www.dongmeiwei.com/images/app/food03.png",
				name: "日韩料理",
				type: "都有专属页面",
			},
			{
				id: 8,
				avatar: "https://www.dongmeiwei.com/images/app/food04.png",
				name: "西式甜点",
				type: "都有专属页面",
			},
			{
				id: 9,
				avatar: "https://www.dongmeiwei.com/images/app/food05.png",
				name: "私房菜",
				type: "都有专属页面",
			},
			{
				id: 10,
				avatar: "https://www.dongmeiwei.com/images/app/food06.png",
				name: "地方菜",
				type: "都有专属页面",
			},
			{
				id: 11,
				avatar: "https://www.dongmeiwei.com/images/app/food07.png",
				name: "日韩料理",
				type: "都有专属页面",
			},
			{
				id: 12,
				avatar: "https://www.dongmeiwei.com/images/app/food08.png",
				name: "西式甜点",
				type: "都有专属页面",
			},
			{
				id: 13,
				avatar: "https://www.dongmeiwei.com/images/app/food02.png",
				name: "地方菜",
				type: "都有专属页面",
			},
			{
				id: 14,
				avatar: "https://www.dongmeiwei.com/images/app/food09.png",
				name: "西式甜点",
				type: "都有专属页面",
			},
			{
				id: 15,
				avatar: "https://www.dongmeiwei.com/images/app/food10.png",
				name: "海鲜活禽",
				type: "都有专属页面",
			}
		],
		recommend_categories: [
			{
				id: 1,
				avatar: "https://www.dongmeiwei.com/images/detail_01.jpg",
				name: "日报寿司",
				follow_count: "5860",
				follow_dynamic: "春花秋月"
			},
			{
				id: 2,
				avatar: "https://www.dongmeiwei.com/images/detail_02.jpg",
				name: "面食大全",
				follow_count: "2.1万",
				follow_dynamic: "老张"
			},
			{
				id: 3,
				avatar: "https://www.dongmeiwei.com/images/detail_03.jpg",
				name: "啤酒炸鸡",
				follow_count: "3.1万",
				follow_dynamic: "丽丽"
			},
			{
				id: 4,
				avatar: "https://www.dongmeiwei.com/images/detail_04.jpg",
				name: "冰淇淋",
				follow_count: "8690",
				follow_dynamic: "老张"
			},
			{
				id: 5,
				avatar: "https://www.dongmeiwei.com/images/detail_05.jpg",
				name: "水果沙拉",
				follow_count: "3500",
				follow_dynamic: "嘿嘿嘿"
			},
			{
				id: 6,
				avatar: "https://www.dongmeiwei.com/images/dissertation_04.jpg",
				name: "湖南菜",
				follow_count: "2.1万",
				follow_dynamic: "春花秋月"
			},
			{
				id: 7,
				avatar: "https://www.dongmeiwei.com/images/dissertation_05.jpg",
				name: "四川菜",
				follow_count: "5.1万",
				follow_dynamic: "丽丽"
			},
			{
				id: 8,
				avatar: "https://www.dongmeiwei.com/images/dissertation_06.jpg",
				name: "广东菜",
				follow_count: "2.1万",
				follow_dynamic: "巴啦啦"
			},
			{
				id: 9,
				avatar: "https://www.dongmeiwei.com/images/dissertation_07.jpg",
				name: "懒人食谱",
				follow_count: "9860",
				follow_dynamic: "嘿嘿嘿"
			},
			{
				id: 10,
				avatar: "https://www.dongmeiwei.com/images/detail_01.jpg",
				name: "日报寿司",
				follow_count: "5860",
				follow_dynamic: "春花秋月"
			},
			{
				id: 11,
				avatar: "https://www.dongmeiwei.com/images/detail_02.jpg",
				name: "面食大全",
				follow_count: "2.1万",
				follow_dynamic: "老张"
			},
			{
				id: 12,
				avatar: "https://www.dongmeiwei.com/images/detail_03.jpg",
				name: "啤酒炸鸡",
				follow_count: "3.1万",
				follow_dynamic: "丽丽"
			},
			{
				id: 13,
				avatar: "https://www.dongmeiwei.com/images/detail_04.jpg",
				name: "冰淇淋",
				follow_count: "8690",
				follow_dynamic: "老张"
			},
			{
				id: 14,
				avatar: "https://www.dongmeiwei.com/images/detail_05.jpg",
				name: "水果沙拉",
				follow_count: "3500",
				follow_dynamic: "嘿嘿嘿"
			},
			{
				id: 15,
				avatar: "https://www.dongmeiwei.com/images/dissertation_04.jpg",
				name: "湖南菜",
				follow_count: "2.1万",
				follow_dynamic: "春花秋月"
			},
			{
				id: 16,
				avatar: "https://www.dongmeiwei.com/images/dissertation_05.jpg",
				name: "四川菜",
				follow_count: "5.1万",
				follow_dynamic: "丽丽"
			},
			{
				id: 17,
				avatar: "https://www.dongmeiwei.com/images/dissertation_06.jpg",
				name: "广东菜",
				follow_count: "2.1万",
				follow_dynamic: "巴啦啦"
			},
			{
				id: 18,
				avatar: "https://www.dongmeiwei.com/images/dissertation_07.jpg",
				name: "懒人食谱",
				follow_count: "9860",
				follow_dynamic: "嘿嘿嘿"
			}
		],
		current_category: {
			id: 1,
			name: "满汉全席",
			avatar: "https://dongmeiwei.com/images/detail_02.jpg",
			creator: { id: 1, name: "嘿嘿嘿" },
			followed:false,
			count_include: 6822,
			count_follows: 19822,
			description: "因为热爱，所以专注，只为献给最好的你，欢迎关注满汉全席！",
			audit_time: "4小时",
			audit_timeAgo: "8小时前",
			administrator: [
				{
					id: 1,
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					name: "嘿嘿嘿",
					creator: true,
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 2,
					avatar: "https://dongmeiwei.com/images/author_08.jpg",
					name: "眸若止水",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 3,
					avatar: "https://dongmeiwei.com/images/author_04.jpg",
					name: "老张",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 4,
					avatar: "https://dongmeiwei.com/images/author_05.jpg",
					name: "只看风月",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 5,
					avatar: "https://dongmeiwei.com/images/author_06.jpg",
					name: "春花秋月",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 6,
					avatar: "https://dongmeiwei.com/images/author_07.jpg",
					name: "思思同学",
					count_words: 23695,
					count_likes: 688,
				}
			],
			recommend_author: [
				{
					id: 1,
					avatar: "https://dongmeiwei.com/images/author_09.jpg",
					name: "月亮之上",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 2,
					avatar: "https://dongmeiwei.com/images/author_02.jpg",
					name: "思思同学",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 3,
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					name: "熊本君",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 4,
					avatar: "https://dongmeiwei.com/images/author_05.jpg",
					name: "只看风月",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 5,
					avatar: "https://dongmeiwei.com/images/author_06.jpg",
					name: "春花秋月",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 6,
					avatar: "https://dongmeiwei.com/images/author_07.jpg",
					name: "思思同学",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 7,
					avatar: "https://dongmeiwei.com/images/author_08.jpg",
					name: "熊本君",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 8,
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					name: "只看风月",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 9,
					avatar: "https://dongmeiwei.com/images/author_05.jpg",
					name: "只看风月",
					count_words: 23695,
					count_likes: 688,
				},
				{
					id: 10,
					avatar: "https://dongmeiwei.com/images/author_04.jpg",
					name: "哇咔咔",
					count_words: 23695,
					count_likes: 688,
				}
			],
			follower: [
				{
					id: 1,
					avatar: "https://dongmeiwei.com/images/author_07.jpg",
					name: "月亮之上"
				},
				{
					id: 2,
					avatar: "https://dongmeiwei.com/images/detail_01.jpg",
					name: "思思同学"
				},
				{
					id: 3,
					avatar: "https://dongmeiwei.com/images/detail_03.jpg",
					name: "熊本君"
				},
				{
					id: 4,
					avatar: "https://dongmeiwei.com/images/detail_04.jpg",
					name: "只看风月"
				},
				{
					id: 5,
					avatar: "https://dongmeiwei.com/images/detail_05.jpg",
					name: "春花秋月"
				},
				{
					id: 6,
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					name: "思思同学"
				},
				{
					id: 7,
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					name: "熊本君"
				},
				{
					id: 8,
					avatar: "https://dongmeiwei.com/images/author_05.jpg",
					name: "只看风月"
				},
				{
					id: 9,
					avatar: "https://dongmeiwei.com/images/author_04.jpg",
					name: "思思同学"
				},
				{
					id: 10,
					avatar: "https://dongmeiwei.com/images/author_09.jpg",
					name: "熊本君"
				}
			]
		},
		current_collection: {
			id: 1,
			name: "美味日记",
			avatar: "https://dongmeiwei.com/images/collection.png",
			creator: { id: 1, name: "boss张",avatar: "https://dongmeiwei.com/images/author_06.jpg",count_words:26812,count_likes:688},
			followed:true,
			count_include: 122,
			count_follows: 808,
			follower: [
				{
					id: 1,
					avatar: "https://dongmeiwei.com/images/author_07.jpg",
					name: "月亮之上"
				},
				{
					id: 2,
					avatar: "https://dongmeiwei.com/images/detail_01.jpg",
					name: "思思同学"
				},
				{
					id: 3,
					avatar: "https://dongmeiwei.com/images/detail_03.jpg",
					name: "熊本君"
				},
				{
					id: 4,
					avatar: "https://dongmeiwei.com/images/detail_04.jpg",
					name: "只看风月"
				},
				{
					id: 5,
					avatar: "https://dongmeiwei.com/images/detail_05.jpg",
					name: "春花秋月"
				},
				{
					id: 6,
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					name: "思思同学"
				},
				{
					id: 7,
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					name: "熊本君"
				},
				{
					id: 8,
					avatar: "https://dongmeiwei.com/images/author_05.jpg",
					name: "只看风月"
				},
				{
					id: 9,
					avatar: "https://dongmeiwei.com/images/author_04.jpg",
					name: "思思同学"
				},
				{
					id: 10,
					avatar: "https://dongmeiwei.com/images/author_09.jpg",
					name: "熊本君"
				}
			]
		}
	};
}
