import { Record, List } from 'immutable';

export const users = Record({
	addWatermark: false,
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
		// count_production: 111,
		// count_likes: 228,
		// count_articles: 68,
		// count_follows: 98,
		// count_followings: 5200,
		// count_drafts: 10,
		// count_favorites: 16,
		// count_categories: 3,
		// count_collections: 6,
		// balance: 99.0
		qrcode_user_id: 0 //记录最后一次识别分享的二维码里的用户id,避免重复跳转
	},
	// 关注（作者） 订阅（专题、文集） 喜欢（文章、评论） 发表 文章 评论@ 不@
	dynamic: [
		{
			id: 3,
			type: 'comment',
			article: { id: 3, title: '茄汁油焖大虾简易教程！' },
			comment: {
				user: { id: 3, name: '眸若止水' },
				body: '我对你的敬仰犹豫滔滔江水,绵绵不绝'
			},
			time: '03-05 11:45'
		},
		{ id: 10, type: 'join', time: '03-05 11:45' }
	],
	all_follows: [
		{
			id: 1,
			type: 'category',
			name: '满汉全席',
			logo: 'https://dongmeiwei.com/images/detail_01.jpg',
			push_update: true,
			latest_update: '白毛浮绿水，红掌拨清波。一行白鹭上青天--我也不知道在说什么',
			updates: 18
		}
	],
	be_comments: [
		{
			id: 1,
			user: {
				id: 1,
				name: '艾灸',
				avatar: 'https://dongmeiwei.com/images/author_01.jpg'
			},
			type: 'mention',
			article: { id: 1, title: '佛系炒青蛙' },
			body: '我觉得你真的是屌的一批，我只想为你打call',
			time_ago: '02-28 09:21'
		}
	],
	be_likes: [
		{
			id: 9,
			user: { id: 9, name: 'wuli坤坤' },
			type: 'praise',
			comment: { id: 9, body: '我觉得这很社会人' },
			time_ago: '17-12-28 11:30'
		}
	],
	followers: [
		{
			user: {
				id: 1,
				name: '齐天大圣',
				avatar: 'https://dongmeiwei.com/images/author_01.jpg',
				followed: false,
				beFollowed: true
			},
			time_ago: '02-28 09:21'
		}
	],
	be_rewards: [
		{
			id: 1,
			user: {
				id: 1,
				name: '艾灸',
				avatar: 'https://dongmeiwei.com/images/author_01.jpg'
			},
			article: { id: 1, title: '带你来看看看什么是佛系炒青蛙' },
			money: 10,
			account: 9.6,
			leave_meaasge: '我觉得你真的是屌的一批，我只想为你打call',
			time_ago: '2018年2月18日 18:48',
			pattern_payment: '支付宝'
		}
	],
	follows: [
		{
			user: {
				id: 1,
				name: '齐天大圣',
				avatar: 'https://dongmeiwei.com/images/author_01.jpg',
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: false
			}
		}
	],
	other_remind: [
		{
			id: 1,
			type: '关注了专题',
			user: { id: 1, name: '咕噜咕噜球' },
			category: { id: 1, name: '佛系炒菜' },
			time_ago: '2018.02.18 09:21'
		}
	],
	chats: [
		{
			id: 1,
			last_message: {
				message: '不曾在你辉煌时慕名而来,也未曾在你低谷时离你而去,我来了,只为你O(∩_∩)O~~'
			},
			with_user: {
				id: 1,
				name: '漂洋过海来看你',
				avatar: 'https://dongmeiwei.com/images/author_01.jpg'
			},
			time_ago: '刚刚',
			new_requests: 1
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
				type: 'recharge',
				money: 10,
				time_ago: '2018-01-15 11:31',
				status: 1
			},
			{
				type: 'receive_reward',
				money: 5,
				user: {
					id: 2,
					name: '张大boss'
				},
				article: {
					id: 2,
					title: '如何成为一名合格的大厨！'
				},
				time_ago: '2018-01-15 11:31',
				status: 1
			}
		]
	},
	recommend_follows: [
		{
			user: {
				id: 1,
				avatar: 'https://dongmeiwei.com/images/author_03.jpg',
				name: '春花秋月',
				followed: false,
				describe: '因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！',
				latest_article: ['吃花嚼草更养生--金雀花&辣芥', '今天，你吃苦了吗？--论苦瓜的吃法'],
				latest_follower: {
					id: 1,
					name: '老张'
				}
			}
		}
	],
	recommend_authors: [
		{
			id: 1,
			avatar: 'https://dongmeiwei.com/images/author_03.jpg',
			name: '春花秋月',
			followed: false,
			describe: '因为热爱，所以专注，一位爱做美食的人，偶尔也会和大家分享故事。坚持持图原创，内容原创！转载请注明原创作者！',
			latest_article: ['吃花嚼草更养生--金雀花&辣芥', '今天，你吃苦了吗？--论苦瓜的吃法'],
			latest_follower: {
				id: 1,
				name: '老张'
			}
		}
	]
});
