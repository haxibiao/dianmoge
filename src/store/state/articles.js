import { Record, List } from "immutable";

export const articles = Record({
	article_detail: {
		user: {
			id: 1,
			name: "嘿嘿嘿",
			avatar: "https://dongmeiwei.com/storage/avatar/17.jpg",
			introduction: "懂美味首席美食主编，兼CEO",
			followed: true,
			be_followed: true,
			reward_description: "我对钱没兴趣，我纯粹是想靠写文章发财养家这个样子"
		},
		time_ago: "2018-02-25 10:30",
		count_words: 2099,
		count_hits: 580,
		count_likes: 48,
		is_like: false,
		collection: "日记本",
		included_categories: [
			{
				id: 1,
				name: "美食日记",
				logo: "https://dongmeiwei.com/images/detail_01.jpg",
				count_articles: 998,
				count_follows: 16970,
				followed: false
			},
			{
				id: 2,
				name: "半夜食堂",
				logo: "https://dongmeiwei.com/images/detail_02.jpg",
				count_articles: 998,
				count_follows: 16970,
				followed: false
			},
			{
				id: 3,
				name: "简单夜宵",
				logo: "https://dongmeiwei.com/images/detail_03.jpg",
				count_articles: 998,
				count_follows: 16970,
				followed: false
			},
			{
				id: 4,
				name: "炒饭大全",
				logo: "https://dongmeiwei.com/images/detail_04.jpg",
				count_articles: 998,
				count_follows: 16970,
				followed: false
			},
			{
				id: 5,
				name: "温馨家常味",
				logo: "https://dongmeiwei.com/images/detail_05.jpg",
				count_articles: 998,
				count_follows: 16970,
				followed: false
			}
		],
		reward_users: [
			{
				id: 1,
				avatar: "https://dongmeiwei.com/images/author_09.jpg",
				name: "月亮之上",
				leave_message: "给你一颗小糖糖",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 2,
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				name: "思思同学",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 3,
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				name: "熊本君",
				leave_message: "为你打call",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 4,
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				name: "只看风月",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 5,
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				name: "春花秋月",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 6,
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				name: "思思同学",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 7,
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				name: "熊本君",
				time_ago: "2018.02.28 09:28",
				money: 5
			},
			{
				id: 8,
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				name: "只看风月",
				time_ago: "2018.02.28 09:28",
				money: 5
			}
		],
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
				time: "02.18 18:30",
				liked: false,
				likes: 68,
				body: "“日不落”黄金海鲜炒饭 — 送给加班至深夜才归家的人",
				reply_comments: [
					{
						id: 111,
						user: { id: 2, name: "熊本君" },
						reply_user: { id: 1, name: "思思同学" },
						body: "为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
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
						body: "为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
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
				id: 6,
				user: {
					id: 2,
					name: "思思同学",
					avatar: "https://dongmeiwei.com/images/author_02.jpg"
				},
				time: "02.18 18:30",
				liked: false,
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
				id: 8,
				user: {
					id: 3,
					name: "熊本君",
					avatar: "https://dongmeiwei.com/images/author_03.jpg"
				},
				time: "02.18 18:30",
				liked: false,
				likes: 12,
				body: "我想减肥，但是看到这么多美味，还是算了吧ㄟ( ▔, ▔ )ㄏ",
				reply_comments: []
			},
			{
				id: 7,
				user: {
					id: 2,
					name: "思思同学",
					avatar: "https://dongmeiwei.com/images/author_02.jpg"
				},
				time: "02.18 18:30",
				liked: false,
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
				id: 9,
				user: {
					id: 3,
					name: "熊本君",
					avatar: "https://dongmeiwei.com/images/author_03.jpg"
				},
				time: "02.18 18:30",
				liked: false,
				likes: 12,
				body: "我想减肥，但是看到这么多美味，还是算了吧ㄟ( ▔, ▔ )ㄏ",
				reply_comments: []
			},
			{
				id: 4,
				user: {
					id: 4,
					name: "美滋滋",
					avatar: "https://dongmeiwei.com/storage/avatar/15.jpg"
				},
				time: "02.18 18:30",
				liked: false,
				likes: 68,
				body: "“日不落”黄金海鲜炒饭 — 送给加班至深夜才归家的人",
				reply_comments: [
					{
						id: 111,
						user: { id: 2, name: "熊本君" },
						reply_user: { id: 1, name: "思思同学" },
						body: "为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
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
						body: "为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
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
			}
		]
	},
	comment: {
		id: 1,
		user: {
			id: 1,
			name: "嘿嘿嘿",
			avatar: "https://dongmeiwei.com/storage/avatar/17.jpg"
		},
		time: "02.18 18:30",
		liked: false,
		likes: 68,
		body: "“日不落”黄金海鲜炒饭 — 送给加班至深夜才归家的人",
		reply_comments: [
			{
				id: 111,
				user: { id: 2, name: "熊本君" },
				reply_user: { id: 1, name: "思思同学" },
				body: "为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
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
				body: "为什么看起来这么好吃，我很想打你知道吗，因为我不会做╭(╯^╰)╮。"
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
	hot_articles: [
		{
			id: 1,
			title: "家常菜谱 | 剁椒蒜苗",
			time_ago: "3小时前",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/13256.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			user: {
				avatar: "https://www.dongmeiwei.com/storage/avatar/17.jpg",
				name: "嘿嘿嘿",
				id: 17
			},
			category: {
				id: 3,
				name: "家常菜菜谱",
				logo: "https://www.dongmeiwei.com/storage/img/118.jpg.logo.jpg"
			}
		}
	],
	poster: [
		{
			id: "001",
			top_image: "https://dongmeiwei.com/images/carousel001.jpg"
		},
		{
			id: "002",
			top_image: "https://dongmeiwei.com/images/carousel002.jpg"
		},
		{
			id: "003",
			top_image: "https://dongmeiwei.com/images/carousel003.jpg"
		},
		{
			id: "004",
			top_image: "https://dongmeiwei.com/images/carousel004.jpg"
		},
		{
			id: "005",
			top_image: "https://dongmeiwei.com/images/carousel005.jpg"
		},
		{
			id: "006",
			top_image: "https://dongmeiwei.com/images/carousel006.jpg"
		},
		{
			id: "007",
			top_image: "https://dongmeiwei.com/images/carousel007.jpg"
		}
	],
	articles: [
		{
			id: 1,
			title: "家常菜谱 | 剁椒蒜苗",
			time_ago: "3小时前",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/13256.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			submited_status: false
		},
		{
			id: 2,
			title: "懒人食谱 | 海鲜炒饭 — 营养美味",
			time_ago: "一天前",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/12743.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			submited_status: false
		},
		{
			id: 3,
			title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高",
			time_ago: "02-25 10:30",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/12737.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			submited_status: false
		},
		{
			id: 4,
			title: "食疗养生 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效",
			time_ago: "02-25 10:30",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/12727.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			submited_status: false
		},
		{
			id: 5,
			title: "食疗养生 | 花菇炖鸡 — 味道鲜美，还能滋补益气",
			time_ago: "02-25 10:30",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/12714.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			submited_status: false
		},
		{
			id: 6,
			title: "湖南美食 | 笋干炒腊肉 — 香辣、香鲜、软嫩",
			time_ago: "02-25 10:30",
			has_image: true,
			image_url: "https://dongmeiwei.com/storage/img/12703.small.jpg",
			description: "有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。",
			hits: 688,
			count_likes: 49,
			count_replies: 9,
			count_tips: 3,
			submited_status: false
		}
	],
	drafts: [
		{ id: 111, title: "今晚吃虾米", time_ago: "3分钟前" },
		{ id: 222, title: "今晚吃鸡", time_ago: "30分钟前" },
		{
			id: 333,
			title: "跟着我的机票一起嗨嗨嗨，飞去世界警察的美利坚共和国，带你去吃美利坚共和国的大火鸡，",
			time_ago: "03.12 21:30"
		},
		{ id: 444, title: "辣椒炒肉", time_ago: "03.11 08:09" },
		{ id: 555, title: "青椒炒蛋", time_ago: "03.09 08:10" },
		{ id: 666, title: "黄瓜炒冬瓜", time_ago: "03.09 21:30" },
		{ id: 777, title: "茄子炒香蕉", time_ago: "03.05 10:00" },
		{ id: 888, title: "西红柿炒玉米", time_ago: "02.12 21:25" },
		{ id: 999, title: "桃花羹的说", time_ago: "02.10 16:16" }
	],
	browsing_history: {
		today: [
			{
				id: 1,
				title: "家常菜谱 | 剁椒蒜苗",
				time_ago: "30分钟前"
			},
			{
				id: 2,
				title: "懒人食谱 | 海鲜炒饭 — 营养美味",
				time_ago: "3小时前"
			},
			{
				id: 3,
				title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高",
				time_ago: "4小时前"
			}
		],
		earlier: [
			{
				id: 1,
				title: "家常菜谱 | 剁椒蒜苗",
				time_ago: "一天前"
			},
			{
				id: 2,
				title: "懒人食谱 | 海鲜炒饭 — 营养美味",
				time_ago: "04-10 11:35"
			},
			{
				id: 3,
				title: "食疗养生 | 肉丸子烧茄子土豆 — 维生素P的含量很高",
				time_ago: "02-25 10:30"
			},
			{
				id: 4,
				title: "食疗养生 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效",
				time_ago: "02-25 10:30"
			},
			{
				id: 5,
				title: "食疗养生 | 花菇炖鸡 — 味道鲜美，还能滋补益气",
				time_ago: "02-25 10:30"
			},
			{
				id: 6,
				title: "湖南美食 | 笋干炒腊肉 — 香辣、香鲜、软嫩",
				time_ago: "02-25 10:30"
			}
		]
	}
});
