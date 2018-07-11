import { Record, List } from "immutable";

export const users = Record({
	login: false,
	count_unreads: 0,
	user: {
		// id: 1996,
		// name: "眸若止水",
		// email: "wang@haxibiao.com",
		// avatar: "https://dongmeiwei.com/images/xbx.jpg",
		// cover: "https://dongmeiwei.com/images/app/cover05.jpg",
		// token: null,
		// introduction: "可以说是非常的完美了~~",
		// reward_description: "谁稀罕你的臭钱？？？",
		// count_words: 26800,
		// count_likes: 228,
		// count_articles: 68,
		// count_follows: 98,
		// count_followings: 5200,
		// count_drafts: 10,
		// collect_articles: 28,
		// count_favorites: 16,
		// purchased_content: 0,
		// count_categories: 3,
		// count_collections: 6,
		// count_followed_books: 22,
		// balance: 99.0
	},
	// 关注（作者） 订阅（专题、文集） 喜欢（文章、评论） 发表 文章 评论@ 不@
	dynamic: [
		{
			id: 1,
			type: "follow",
			user: { id: 1, name: "菇凉大大" },
			time: "03-05 11:45"
		},
		{
			id: 2,
			type: "follow",
			user: { id: 2, name: "王大锤" },
			time: "03-05 11:45"
		},
		{
			id: 3,
			type: "comment",
			article: { id: 3, title: "茄汁油焖大虾简易教程！" },
			comment: {
				user: { id: 3, name: "眸若止水" },
				body: "我对你的敬仰犹豫滔滔江水,绵绵不绝"
			},
			time: "03-05 11:45"
		},
		{
			id: 4,
			type: "comment",
			article: { id: 4, title: "糖醋排骨" },
			comment: { body: "感觉好吃的一匹aaaa" },
			time: "03-05 11:45"
		},
		{
			id: 5,
			type: "praise",
			praise: {
				article: { id: 5, title: "糖醋排骨" },
				user: { id: 5, name: "眸若止水" },
				comment: {
					id: 5,
					body: "嘻嘻😝"
				}
			},
			time: "03-05 11:45"
		},
		{
			id: 6,
			type: "like",
			article: { id: 6, title: "茄汁油焖大虾简易教程！" },
			time: "03-05 11:45"
		},
		{
			id: 7,
			type: "publish",
			article: {
				id: 7,
				title: "简单美味的蛋包饭",
				description: "蛋包饭是日本一种比较普通且很受亲睐的主食，一种由蛋皮包裹炒饭而成的饭料理。一般是将打匀的蛋汁倒入平底锅煎成厚薄均匀的蛋皮，再放上炒好的炒饭、韩式辣椒酱、番茄酱、色拉油和其他各种材料包好制成。"
			},
			time: "03-05 11:45"
		},
		{
			id: 8,
			type: "subscription",
			category: { id: 8, name: "美食美容，只胃你美" },
			time: "03-05 11:45"
		},
		{
			id: 9,
			type: "subscription",
			collection: { id: 9, name: "私美人" },
			time: "03-05 11:45"
		},
		{ id: 10, type: "join", time: "03-05 11:45" }
	],
	all_follows: [
		{
			id: 1,
			type: "category",
			name: "满汉全席",
			logo: "https://dongmeiwei.com/images/detail_01.jpg",
			push_update: true,
			latest_update: "白毛浮绿水，红掌拨清波。一行白鹭上青天--我也不知道在说什么",
			updates: 18
		},
		{
			id: 4,
			type: "user",
			name: "嘿嘿嘿",
			avatar: "https://dongmeiwei.com/images/author_01.jpg",
			push_update: true,
			latest_update: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界",
			updates: 16
		},
		{
			id: 2,
			type: "category",
			name: "青椒炒蛋你会了吗",
			logo: "https://dongmeiwei.com/images/detail_02.jpg",
			push_update: false,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 9
		},
		{
			id: 5,
			type: "category",
			name: "辣椒炒肉你懂吗",
			logo: "https://dongmeiwei.com/images/author_02.jpg",
			push_update: true,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 8
		},
		{
			id: 3,
			type: "category",
			name: "海天盛筵",
			logo: "https://dongmeiwei.com/images/detail_05.jpg",
			push_update: false,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 12
		},
		{
			id: 6,
			type: "category",
			name: "好好看好好学",
			logo: "https://dongmeiwei.com/images/author_03.jpg",
			push_update: false,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 9
		},
		{
			id: 7,
			type: "category",
			name: "佛系炒菜",
			logo: "https://dongmeiwei.com/images/author_04.jpg",
			push_update: true,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 10
		},
		{
			id: 8,
			type: "category",
			name: "黑暗料理",
			logo: "https://dongmeiwei.com/images/author_05.jpg",
			push_update: false,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 0
		},
		{
			id: 9,
			type: "category",
			name: "懒人食谱",
			logo: "https://dongmeiwei.com/images/author_06.jpg",
			push_update: false,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 0
		},
		{
			id: 10,
			type: "category",
			name: "懒猪食谱",
			logo: "https://dongmeiwei.com/images/author_07.jpg",
			push_update: false,
			latest_update: "吃花嚼草更养生--金雀花&辣芥 今天，你吃苦了吗？--论苦瓜的吃法",
			updates: 5
		},
		{
			id: 11,
			type: "collection",
			name: "社会人专属食谱",
			logo: "https://dongmeiwei.com/images/collection.png",
			push_update: true,
			latest_update: "这是我的第一篇美食日记，专门记录我的每日吃货",
			updates: 2
		},
		{
			id: 12,
			type: "collection",
			name: "美味日记",
			logo: "https://dongmeiwei.com/images/collection.png",
			push_update: false,
			latest_update: "这是我的第一篇美食日记，专门记录我的每日吃货",
			updates: 0
		},
		{
			id: 13,
			type: "user",
			name: "螺旋走累",
			avatar: "https://dongmeiwei.com/images/author_08.jpg",
			push_update: false,
			latest_update: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界",
			updates: 0
		},
		{
			id: 14,
			type: "user",
			name: "高高高高璇",
			avatar: "https://dongmeiwei.com/images/author_09.jpg",
			push_update: false,
			latest_update: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界",
			updates: 0
		},
		{
			id: 15,
			type: "user",
			name: "磨人的小妖精",
			avatar: "https://dongmeiwei.com/images/author_01.jpg",
			push_update: false,
			latest_update: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界",
			updates: 1
		},
		{
			id: 16,
			type: "user",
			name: "社会大姐大",
			avatar: "https://dongmeiwei.com/images/author_02.jpg",
			push_update: false,
			latest_update: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界",
			updates: 2
		}
	],
	be_comments: [
		{
			id: 1,
			user: {
				id: 1,
				name: "艾灸",
				avatar: "https://dongmeiwei.com/images/author_01.jpg"
			},
			type: "mention",
			article: { id: 1, title: "佛系炒青蛙" },
			body: "我觉得你真的是屌的一批，我只想为你打call",
			time_ago: "02-28 09:21"
		},
		{
			id: 2,
			user: {
				id: 2,
				name: "月亮之上",
				avatar: "https://dongmeiwei.com/images/author_02.jpg"
			},
			type: "comment",
			article: { id: 2, title: "西北佛跳墙" },
			body: "我觉得你真的是屌的一批，我只想为你打call",
			time_ago: "17-12-28 19:21"
		},
		{
			id: 3,
			user: {
				id: 3,
				name: "月亮之上",
				avatar: "https://dongmeiwei.com/images/author_02.jpg"
			},
			type: "add",
			article: { id: 2, title: "西北佛跳墙" },
			body: "我觉得你真的是屌的一批，我只想为你打call",
			time_ago: "17-11-28 19:21"
		},
		{
			id: 4,
			user: {
				id: 4,
				name: "boss张",
				avatar: "https://dongmeiwei.com/images/author_06.jpg"
			},
			type: "comment",
			article: { id: 4, title: "南北豆腐之争，豆花是甜的好还是咸的好" },
			body: "我觉得可以，这个豆花应该非常的好吃😋",
			time_ago: "67-11-28 19:21"
		},
		{
			id: 5,
			user: {
				id: 5,
				name: "boss张",
				avatar: "https://dongmeiwei.com/images/author_06.jpg"
			},
			type: "comment",
			article: { id: 4, title: "东北大萝卜" },
			body: "我觉得可以，这个萝卜应该非常的好吃😋",
			time_ago: "17-11-28 19:21"
		}
	],
	be_likes: [
		{
			id: 9,
			user: { id: 9, name: "wuli坤坤" },
			type: "praise",
			comment: { id: 9, body: "我觉得这很社会人" },
			time_ago: "17-12-28 11:30"
		},
		{
			id: 1,
			user: { id: 1, name: "老瓜皮" },
			type: "like",
			article: { id: 1, title: "瓜皮炒菜" },
			time_ago: "02-28 09:21"
		},
		{
			id: 2,
			user: { id: 2, name: "我是boss张" },
			type: "like",
			article: { id: 2, title: "南北豆腐之争，豆花是甜的好还是咸的好" },
			time_ago: "02-28 09:21"
		},
		{
			id: 3,
			user: { id: 3, name: "月亮之上的那只兔子" },
			type: "like",
			article: { id: 3, title: "我讨厌吃兔子" },
			time_ago: "02-28 09:21"
		},
		{
			id: 4,
			user: { id: 4, name: "我是浩南哥" },
			type: "like",
			article: { id: 4, title: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界" },
			time_ago: "02-28 09:21"
		},
		{
			id: 5,
			user: { id: 5, name: "老瓜皮" },
			type: "like",
			article: { id: 5, title: "瓜皮炒菜" },
			time_ago: "02-28 09:21"
		},
		{
			id: 6,
			user: { id: 6, name: "我是boss张" },
			type: "like",
			article: { id: 6, title: "南北豆腐之争，豆花是甜的好还是咸的好" },
			time_ago: "02-28 09:21"
		},
		{
			id: 7,
			user: { id: 7, name: "月亮之上的那只兔子" },
			type: "like",
			article: { id: 7, title: "我讨厌吃兔子" },
			time_ago: "02-28 09:21"
		},
		{
			id: 8,
			user: { id: 8, name: "我是浩南哥" },
			type: "like",
			article: { id: 8, title: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界" },
			time_ago: "02-28 09:21"
		}
	],
	followers: [
		{
			user: {
				id: 1,
				name: "齐天大圣",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				followed: false,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 2,
				name: "中二少年",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				followed: false,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 3,
				name: "王鑫_bbob",
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 4,
				name: "月亮之上",
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 5,
				name: "追风少年",
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 6,
				name: "我是浩南哥",
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 7,
				name: "女装大佬",
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				followed: false,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 8,
				name: "高高高高璇",
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 9,
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		},
		{
			user: {
				id: 10,
				name: "boss张",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				followed: true,
				beFollowed: true
			},
			time_ago: "02-28 09:21"
		}
	],
	be_rewards: [
		{
			id: 1,
			user: {
				id: 1,
				name: "艾灸",
				avatar: "https://dongmeiwei.com/images/author_01.jpg"
			},
			article: { id: 1, title: "带你来看看看什么是佛系炒青蛙" },
			money: 10,
			account: 9.6,
			leave_meaasge: "我觉得你真的是屌的一批，我只想为你打call",
			time_ago: "2018年2月18日 18:48",
			pattern_payment: "支付宝"
		},
		{
			id: 2,
			user: {
				id: 2,
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/images/author_02.jpg"
			},
			article: { id: 2, title: "南北豆腐之争，豆花是甜的好还是咸的好" },
			money: 1,
			account: 0.96,
			leave_meaasge: null,
			time_ago: "2018年2月18日 18:48",
			pattern_payment: "支付宝"
		},
		{
			id: 3,
			user: {
				id: 3,
				name: "boss张",
				avatar: "https://dongmeiwei.com/images/author_06.jpg"
			},
			article: { id: 3, title: "社会人吃的小猪佩奇饼干做法--get！" },
			money: 100,
			account: 96,
			leave_meaasge: null,
			time_ago: "2018年2月18日 18:48",
			pattern_payment: "支付宝"
		},
		{
			id: 4,
			user: {
				id: 4,
				name: "王思聪",
				avatar: "https://dongmeiwei.com/images/author_04.jpg"
			},
			article: { id: 4, title: "如何成为一名合格的大厨！" },
			money: 10000,
			account: 9600,
			leave_meaasge: "有钱任性",
			time_ago: "2018年2月08日 18:48",
			pattern_payment: "支付宝"
		}
	],
	follows: [
		{
			user: {
				id: 1,
				name: "齐天大圣",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: false
			}
		},
		{
			user: {
				id: 2,
				name: "中二少年",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: false
			}
		},
		{
			user: {
				id: 3,
				name: "王鑫_bbob",
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 4,
				name: "月亮之上",
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: false
			}
		},
		{
			user: {
				id: 5,
				name: "追风少年",
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 6,
				name: "我是浩南哥",
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 7,
				name: "女装大佬",
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: false
			}
		},
		{
			user: {
				id: 8,
				name: "高高高高璇",
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 9,
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 10,
				name: "boss张",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 11,
				name: "嘻嘻嘻",
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		},
		{
			user: {
				id: 12,
				name: "张大师",
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			}
		}
	],
	other_remind: [
		{
			id: 1,
			type: "关注了专题",
			user: { id: 1, name: "咕噜咕噜球" },
			category: { id: 1, name: "佛系炒菜" },
			time_ago: "2018.02.18 09:21"
		},
		{
			id: 2,
			type: "gift",
			info: "恭喜！你获得懂美味优惠券一张，已存入你的钱包，购买付费内容时可用",
			time_ago: "2018.02.18 09:21"
		},
		{
			id: 3,
			type: "收录了文章",
			article: { id: 3, title: "社会人都是吃的小猪佩奇饼干是什么，带你大开眼界" },
			category: { id: 3, name: "网红美食" },
			time_ago: "2018.02.18 09:21"
		},
		{
			id: 4,
			type: "拒绝了文章",
			article: { id: 4, title: "我喜欢吃兔子" },
			category: { id: 4, name: "动物组织保护协会" },
			time_ago: "2018.02.18 09:21"
		},
		{
			id: 5,
			type: "gift",
			info: "恭喜！你获得懂美味优惠券一张，已存入你的钱包，购买付费内容时可用",
			time_ago: "2018.02.18 09:21"
		},
		{
			id: 6,
			type: "关注了专题",
			user: { id: 6, name: "boss张大仙" },
			category: { id: 6, name: "满汉全席" },
			time_ago: "2018.02.18 09:21"
		}
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
			time_ago: "刚刚",
			new_requests: 1
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
			time_ago: "1小时前",
			new_requests: 0
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
			time_ago: "1天前",
			new_requests: 0
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
			time_ago: "03-28 16:30",
			new_requests: 0
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
			time_ago: "02-28 11:28",
			new_requests: 0
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
			time_ago: "2017-12-25 16:06",
			new_requests: 0
		}
	],
	account: {
		balance: 99.0,
		annual_income: {
			general_income: 37.0,
			monthly_income: [{ month: 4, income: 5 }, { month: 3, income: 12 }, { month: 2, income: 9 }, { month: 1, income: 11 }]
		},
		transaction_record: [
			{
				type: "recharge",
				money: 10,
				time_ago: "2018-01-15 11:31",
				status: 1
			},
			{
				type: "receive_reward",
				money: 5,
				user: {
					id: 2,
					name: "张大boss"
				},
				article: {
					id: 2,
					title: "如何成为一名合格的大厨！"
				},
				time_ago: "2018-01-15 11:31",
				status: 1
			},
			{
				type: "reward",
				money: 5,
				user: {
					id: 1,
					name: "嘿嘿嘿"
				},
				article: {
					id: 1,
					title: "吃什么可以滋阴补肾？"
				},
				time_ago: "2018-01-15 11:31",
				status: 0
			},
			{
				type: "receive_award",
				money: 10,
				user: {
					id: 2,
					name: "张大boss"
				},
				time_ago: "2018-01-15 11:31",
				status: 1
			},
			{
				type: "award",
				money: 5,
				user: {
					id: 1,
					name: "嘿嘿嘿"
				},
				time_ago: "2018-01-15 11:31",
				status: 0
			}
		]
	},
	recommend_follows: [
		{
			user: {
				id: 1,
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				name: "春花秋月",
				followed: false,
				describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
				latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
				latest_follower: {
					id: 1,
					name: "老张"
				}
			}
		},
		{
			user: {
				id: 2,
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				name: "春花秋月",
				followed: false,
				describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
				latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
				latest_follower: {
					id: 2,
					name: "老张"
				}
			}
		},
		{
			user: {
				id: 3,
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				name: "春花秋月",
				followed: false,
				describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
				latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
				latest_follower: {
					id: 3,
					name: "老张"
				}
			}
		},
		{
			category: {
				id: 4,
				creator: { id: 1, name: "嘿嘿嘿" },
				count_articles: 1998,
				count_follows: 15890,
				logo: "https://dongmeiwei.com/images/detail_01.jpg",
				name: "老司机教程",
				latest_follower: {
					id: 4,
					name: "老李"
				},
				followed: false,
				describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！"
			}
		},
		{
			category: {
				id: 5,
				creator: { id: 1, name: "嘿嘿嘿" },
				count_articles: 1998,
				count_follows: 15890,
				logo: "https://dongmeiwei.com/images/detail_02.jpg",
				name: "老司机教程",
				latest_follower: {
					id: 5,
					name: "老李"
				},
				followed: false,
				describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！"
			}
		}
	],
	recommend_authors: [
		{
			id: 1,
			avatar: "https://dongmeiwei.com/images/author_03.jpg",
			name: "春花秋月",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 1,
				name: "老张"
			}
		},
		{
			id: 2,
			avatar: "https://dongmeiwei.com/images/author_04.jpg",
			name: "秋月春花",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 2,
				name: "老张"
			}
		},
		{
			id: 3,
			avatar: "https://dongmeiwei.com/images/author_05.jpg",
			name: "花月秋春",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 3,
				name: "老张"
			}
		},
		{
			id: 4,
			avatar: "https://dongmeiwei.com/images/author_06.jpg",
			name: "秋春花月",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 4,
				name: "老雷"
			}
		},
		{
			id: 5,
			avatar: "https://dongmeiwei.com/images/author_07.jpg",
			name: "花秋春月",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 5,
				name: "老高"
			}
		},
		{
			id: 6,
			avatar: "https://dongmeiwei.com/images/author_08.jpg",
			name: "月春花秋",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 6,
				name: "老王"
			}
		},
		{
			id: 7,
			avatar: "https://dongmeiwei.com/images/author_01.jpg",
			name: "熊本君",
			followed: false,
			describe: "因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！",
			latest_article: ["吃花嚼草更养生--金雀花&辣芥", "今天，你吃苦了吗？--论苦瓜的吃法"],
			latest_follower: {
				id: 7,
				name: "老王"
			}
		}
	]
});
