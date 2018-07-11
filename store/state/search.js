import { Record, List } from "immutable";

export const search = Record({
	hot_search: [
		{ id: 1, keywords: "网名" },
		{ id: 2, keywords: "LOL" },
		{ id: 3, keywords: "王者" },
		{ id: 4, keywords: "吃鸡" },
		{ id: 5, keywords: "背景" },
		{ id: 6, keywords: "情侣" },
		{ id: 7, keywords: "王者荣耀" },
		{ id: 8, keywords: "字" },
		{ id: 9, keywords: "qq" },
		{ id: 10, keywords: "头像" },
		{ id: 11, keywords: "QQ昵称" },
		{ id: 12, keywords: "绝地求生" },
		{ id: 13, keywords: "DOTA2" },
		{ id: 14, keywords: "昵称" },
		{ id: 15, keywords: "英雄联盟" }
	],
	histories: [
		{ id: 1, keywords: "Godv" },
		{ id: 2, keywords: "吃鸡更新日志" },
		{ id: 3, keywords: "RNG夺冠" }
	],
	search_detail: {
		users: [
			{
				id: 1,
				name: "齐天大圣",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 2,
				name: "中二少年",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 3,
				name: "王鑫_bbob",
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: true
			},
			{
				id: 4,
				name: "月亮之上",
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 5,
				name: "追风少年",
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 6,
				name: "我是浩南哥",
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: true,
				beFollowed: false
			},
			{
				id: 7,
				name: "女装大佬",
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 8,
				name: "高高高高璇",
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 9,
				name: "嘿嘿嘿",
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 10,
				name: "boss张",
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 11,
				name: "嘻嘻嘻",
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			},
			{
				id: 12,
				name: "张大师",
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				count_words: 11945,
				count_likes: 896,
				followed: false,
				beFollowed: false
			}
		],
		categories: [
			{
				id: 1,
				logo: "https://dongmeiwei.com/images/detail_01.jpg",
				name: "湘满天下",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: true
			},
			{
				id: 2,
				logo: "https://dongmeiwei.com/images/detail_02.jpg",
				name: "川香麻辣",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 3,
				logo: "https://dongmeiwei.com/images/detail_03.jpg",
				name: "粤系风味",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 4,
				logo: "https://dongmeiwei.com/images/detail_04.jpg",
				name: "老北京味儿",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 5,
				logo: "https://dongmeiwei.com/images/detail_05.jpg",
				name: "民俗小吃",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 6,
				logo: "https://dongmeiwei.com/storage/img/14007.small.jpg",
				name: "湘满天下",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: true
			},
			{
				id: 7,
				logo: "https://dongmeiwei.com/storage/img/8728.small.jpg",
				name: "川香麻辣",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 8,
				logo: "https://dongmeiwei.com/storage/img/7619.small.jpg",
				name: "粤系风味",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 9,
				logo: "https://dongmeiwei.com/storage/img/7278.small.jpg",
				name: "老北京味儿",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			},
			{
				id: 10,
				logo: "https://dongmeiwei.com/storage/img/9038.small.jpg",
				name: "民俗小吃",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 1998,
				count_follows: 15890,
				followed: false
			}
		],
		collections: [
			{
				id: 1,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "美食日记",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 2,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "私人菜谱",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 3,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "爱心早点",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 4,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "家常小菜",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 5,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "美食日记",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 6,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "私人菜谱",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 7,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "爱心早点",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			},
			{
				id: 8,
				logo: "https://dongmeiwei.com/images/collection.png",
				name: "家常小菜",
				user: { id: 1996, name: "眸若止水" },
				count_articles: 168,
				count_follows: 296,
				followed: false
			}
		],
		articles: [
			{
				id: 1,
				user: {
					id: 1996,
					name: "眸若止水"
				},
				title: "家常菜谱 | 剁椒蒜苗",
				description:
					"有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，物美价廉的寻常人家美味。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。"
			},
			{
				id: 2,
				user: {
					id: 1996,
					name: "眸若止水"
				},
				title: "懒人食谱 | 海鲜炒饭 — 营养美味",
				description:
					"有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “美味菜王”。"
			},
			{
				id: 3,
				user: {
					id: 1,
					name: "嘿嘿嘿"
				},
				title: "肉丸子烧茄子土豆 — 维生素P的含量很高的美味",
				description:
					"有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处美味，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、美味脆嫩，被誉为“素食第一品”、 “菜王”。"
			},
			{
				id: 4,
				user: {
					id: 1,
					name: "嘿嘿嘿"
				},
				title:
					"养生美味 | 韭黄炒南极磷虾 — 具健胃、提神、止汗固涩、补肾助阳、固精等功效",
				description:
					"有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见的美味，也就是小白菜的价格了。咱又买了一根，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。"
			},
			{
				id: 5,
				user: {
					id: 2,
					name: "boos张大仙"
				},
				title: "养生美味 | 花菇炖鸡 — 味道鲜美，还能滋补益气",
				description:
					"有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根美味，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。"
			},
			{
				id: 6,
				user: {
					id: 2,
					name: "boos张大仙"
				},
				title: "湖南美味 | 笋干炒腊肉 — 香辣、香鲜、软嫩",
				description:
					"有一句老话叫“雨后春笋茁壮成长”，一场春雨过后，市场上随处可见，也就是小白菜的价格了。咱又买了一根美味，吃时令蔬菜，顺应时令才是科学养生之道。春笋洁白如玉、笋体肥大、鲜嫩清香、鲜美脆嫩，被誉为“素食第一品”、 “菜王”。"
			}
		]
	}
});
