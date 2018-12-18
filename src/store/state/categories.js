import { Record, List } from "immutable";

export const categories = Record({
	admin_uids: [],
	category_detail: {
		id: 1,
		name: "满汉全席",
		logo: "https://dongmeiwei.com/images/detail_02.jpg",
		creator: { id: 1, name: "嘿嘿嘿" },
		followed: false,
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
				count_likes: 688
			},
			{
				id: 2,
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				name: "眸若止水",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 3,
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				name: "老张",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 4,
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				name: "只看风月",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 5,
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				name: "春花秋月",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 6,
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				name: "思思同学",
				count_words: 23695,
				count_likes: 688
			}
		],
		recommend_author: [
			{
				id: 1,
				avatar: "https://dongmeiwei.com/images/author_09.jpg",
				name: "月亮之上",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 2,
				avatar: "https://dongmeiwei.com/images/author_02.jpg",
				name: "思思同学",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 3,
				avatar: "https://dongmeiwei.com/images/author_03.jpg",
				name: "熊本君",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 4,
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				name: "只看风月",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 5,
				avatar: "https://dongmeiwei.com/images/author_06.jpg",
				name: "春花秋月",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 6,
				avatar: "https://dongmeiwei.com/images/author_07.jpg",
				name: "思思同学",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 7,
				avatar: "https://dongmeiwei.com/images/author_08.jpg",
				name: "熊本君",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 8,
				avatar: "https://dongmeiwei.com/images/author_01.jpg",
				name: "只看风月",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 9,
				avatar: "https://dongmeiwei.com/images/author_05.jpg",
				name: "只看风月",
				count_words: 23695,
				count_likes: 688
			},
			{
				id: 10,
				avatar: "https://dongmeiwei.com/images/author_04.jpg",
				name: "哇咔咔",
				count_words: 23695,
				count_likes: 688
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
	categories: [
		{
			id: 1,
			logo: "https://dongmeiwei.com/images/detail_01.jpg",
			name: "湘满天下",
			creator: { id: 1996, name: "眸若止水" },
			admins: [
				{
					id: 1,
					name: "嘿嘿嘿",
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 2,
					name: "boss张",
					avatar: "https://dongmeiwei.com/images/author_02.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 3,
					name: "萧萧下",
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					count_words: 11945,
					count_likes: 896
				}
			],
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 2,
			logo: "https://dongmeiwei.com/images/detail_02.jpg",
			name: "川香麻辣",
			creator: { id: 1996, name: "眸若止水" },
			admins: [
				{
					id: 1,
					name: "嘿嘿嘿",
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 2,
					name: "boss张",
					avatar: "https://dongmeiwei.com/images/author_02.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 3,
					name: "萧萧下",
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					count_words: 11945,
					count_likes: 896
				}
			],
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 3,
			logo: "https://dongmeiwei.com/images/detail_03.jpg",
			name: "粤系风味",
			creator: { id: 1996, name: "眸若止水" },
			admins: [
				{
					id: 1,
					name: "嘿嘿嘿",
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 2,
					name: "boss张",
					avatar: "https://dongmeiwei.com/images/author_02.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 3,
					name: "萧萧下",
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					count_words: 11945,
					count_likes: 896
				}
			],
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 4,
			logo: "https://dongmeiwei.com/images/detail_04.jpg",
			name: "老北京味儿",
			creator: { id: 1996, name: "眸若止水" },
			admins: [
				{
					id: 1,
					name: "嘿嘿嘿",
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 2,
					name: "boss张",
					avatar: "https://dongmeiwei.com/images/author_02.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 3,
					name: "萧萧下",
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					count_words: 11945,
					count_likes: 896
				}
			],
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 5,
			logo: "https://dongmeiwei.com/images/detail_05.jpg",
			name: "民俗小吃",
			creator: { id: 1996, name: "眸若止水" },
			admins: [
				{
					id: 1,
					name: "嘿嘿嘿",
					avatar: "https://dongmeiwei.com/images/author_01.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 2,
					name: "boss张",
					avatar: "https://dongmeiwei.com/images/author_02.jpg",
					count_words: 11945,
					count_likes: 896
				},
				{
					id: 3,
					name: "萧萧下",
					avatar: "https://dongmeiwei.com/images/author_03.jpg",
					count_words: 11945,
					count_likes: 896
				}
			],
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		}
	],
	administrative: [
		{
			id: 1,
			logo: "https://dongmeiwei.com/storage/img/6706.small.jpg",
			name: "黑暗料理",
			creator: { id: 1996, name: "嘿嘿嘿哟" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 2,
			logo: "https://www.dongmeiwei.com/storage/img/11015.small.jpg",
			name: "欧式糕点",
			creator: { id: 1996, name: "boss张哟" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 3,
			logo: "https://dongmeiwei.com/storage/img/8019.small.jpg",
			name: "土家味大全",
			creator: { id: 1996, name: "小可爱哟" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		}
	],
	followed_categories: [
		{
			id: 1,
			logo: "https://dongmeiwei.com/images/detail_01.jpg",
			name: "湘满天下",
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 2,
			logo: "https://dongmeiwei.com/images/detail_02.jpg",
			name: "川香麻辣",
			creator: { id: 2, name: "boos张" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 3,
			logo: "https://dongmeiwei.com/images/detail_03.jpg",
			name: "粤系风味",
			creator: { id: 3, name: "小萝莉" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 4,
			logo: "https://dongmeiwei.com/images/detail_04.jpg",
			name: "老北京味儿",
			creator: { id: 4, name: "盖伦" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 5,
			logo: "https://dongmeiwei.com/images/detail_05.jpg",
			name: "民俗小吃",
			creator: { id: 5, name: "洛克萨斯" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 6,
			logo: "https://dongmeiwei.com/images/detail_01.jpg",
			name: "湘满天下",
			creator: { id: 6, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 7,
			logo: "https://dongmeiwei.com/images/detail_02.jpg",
			name: "川香麻辣",
			creator: { id: 7, name: "boos张" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 8,
			logo: "https://dongmeiwei.com/images/detail_03.jpg",
			name: "粤系风味",
			creator: { id: 8, name: "小萝莉" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 9,
			logo: "https://dongmeiwei.com/images/detail_04.jpg",
			name: "老北京味儿",
			creator: { id: 9, name: "盖伦" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		},
		{
			id: 10,
			logo: "https://dongmeiwei.com/images/detail_05.jpg",
			name: "民俗小吃",
			creator: { id: 10, name: "洛克萨斯" },
			count_articles: 1998,
			count_follows: 15890,
			followed: true
		}
	],
	collection_detail: {
		id: 1,
		name: "美味日记",
		logo: "https://dongmeiwei.com/images/collection.png",
		creator: {
			id: 1,
			name: "boss张",
			avatar: "https://dongmeiwei.com/images/author_06.jpg",
			count_words: 26812,
			count_likes: 688
		},
		followed: true,
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
	},
	collections: [
		{
			id: 1,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "美食日记",
			creator: { id: 1996, name: "眸若止水" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 2,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "私人菜谱",
			creator: { id: 1996, name: "眸若止水" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 3,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "爱心早点",
			creator: { id: 1996, name: "眸若止水" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 4,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "家常小菜",
			creator: { id: 1996, name: "眸若止水" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		}
	],
	followed_collections: [
		{
			id: 1,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "美食日记",
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 2,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "吃货日记",
			creator: { id: 2, name: "boos张" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 3,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "胖子日记",
			creator: { id: 3, name: "小萝莉" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 4,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "懒人日记",
			creator: { id: 4, name: "PDD" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		},
		{
			id: 5,
			logo: "https://dongmeiwei.com/images/collection.png",
			name: "瘦子日记",
			creator: { id: 5, name: "三毛" },
			count_articles: 168,
			count_follows: 296,
			followed: true
		}
	],
	recommend_categories: [
		{
			id: 1,
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/images/detail_01.jpg",
			name: "老司机教程",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 1,
				name: "老李"
			}
		},
		{
			id: 2,
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/images/detail_02.jpg",
			name: "脸上笑嘻嘻",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 2,
				name: "老雷"
			}
		},
		{
			id: 3,
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/images/detail_03.jpg",
			name: "黑暗料理大全",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 3,
				name: "老张"
			}
		},
		{
			id: 4,
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/images/detail_04.jpg",
			name: "老司机教程",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 4,
				name: "老李"
			}
		},
		{
			id: 5,
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/images/detail_05.jpg",
			name: "脸上笑嘻嘻的炒着美味的菜",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 5,
				name: "老雷"
			}
		},
		{
			id: 6,
			creator: { id: 1, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/14007.small.jpg",
			name: "黑暗料理大全",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 6,
				name: "老张"
			}
		},
		{
			id: 7,
			creator: { id: 7, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/8728.small.jpg",
			name: "老司机教程",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 7,
				name: "老李"
			}
		},
		{
			id: 8,
			creator: { id: 8, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/7619.small.jpg",
			name: "脸上笑嘻嘻",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 8,
				name: "老雷"
			}
		},
		{
			id: 9,
			creator: { id: 9, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/7278.small.jpg",
			name: "黑暗料理大全",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 9,
				name: "老张"
			}
		},
		{
			id: 10,
			creator: { id: 10, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/9038.small.jpg",
			name: "老司机教程",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 10,
				name: "老李"
			}
		},
		{
			id: 11,
			creator: { id: 11, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/732.small.jpg",
			name: "脸上笑嘻嘻",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 1,
				name: "老雷"
			}
		},
		{
			id: 12,
			creator: { id: 12, name: "嘿嘿嘿" },
			count_articles: 1998,
			count_follows: 15890,
			logo: "https://dongmeiwei.com/storage/img/7014.small.jpg",
			name: "黑暗料理大全",
			followed: false,
			describe: "这里是全网最新最全的老司机教程中心，无论是手动挡还是自动挡，兰博基尼还是五菱宏光，这里都能教，没有你学不到，只有你想不到！",
			latest_follower: {
				id: 12,
				name: "老张"
			}
		}
	],
	contribute_request: [
		{
			category: { id: 1, name: "佛系炒菜", logo: "https://dongmeiwei.com/images/detail_01.jpg" },
			latest_article: "佛跳墙怎么做才能好吃的跳起来",
			latest_contribute_count: 2,
			pending: 4
		},
		{
			category: { id: 2, name: "满汉全席", logo: "https://dongmeiwei.com/images/detail_02.jpg" },
			latest_article: null,
			latest_contribute_count: 0,
			pending: 5
		},
		{
			category: { id: 3, name: "黑暗料理", logo: "https://dongmeiwei.com/images/detail_03.jpg" },
			latest_article: null,
			latest_contribute_count: 0,
			pending: 0
		}
	],
	all_pending_contribute: [
		{
			user: { id: 5, name: "小猪佩奇", avatar: "https://dongmeiwei.com/images/author_05.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 5, title: "爆炒宁乡花猪肉" },
			status: "pending",
			time_ago: "10分钟前"
		},
		{
			user: { id: 4, name: "喵喵喵", avatar: "https://dongmeiwei.com/images/author_04.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 4, title: "给你来二两猫屎咖啡？" },
			status: "pending",
			time_ago: "30分钟前"
		},
		{
			user: { id: 1, name: "齐天大圣", avatar: "https://dongmeiwei.com/images/author_01.jpg" },
			category: { id: 3, name: "黑暗料理" },
			article: { id: 1, title: "无机鸡和乌鸡" },
			status: "pending",
			time_ago: "2018.02.18 09:21"
		},
		{
			user: { id: 2, name: "我是一个小瓜皮", avatar: "https://dongmeiwei.com/images/author_02.jpg" },
			category: { id: 1, name: "佛系炒菜" },
			article: { id: 2, title: "冬瓜皮炒西瓜皮" },
			status: "pending",
			time_ago: "2018.02.18 09:21"
		},
		{
			user: { id: 3, name: "boss张", avatar: "https://dongmeiwei.com/images/author_03.jpg" },
			category: { id: 1, name: "佛系炒菜" },
			article: { id: 3, title: "清蒸猪头" },
			status: "pending",
			time_ago: "2018.02.18 09:21"
		}
	],
	category_contribute_manage: [
		{
			user: { id: 5, name: "小猪佩奇", avatar: "https://dongmeiwei.com/images/author_05.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 5, title: "爆炒宁乡花猪肉" },
			status: "pending",
			time_ago: "10分钟前"
		},
		{
			user: { id: 4, name: "喵喵喵", avatar: "https://dongmeiwei.com/images/author_04.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 4, title: "给你来二两猫屎咖啡？" },
			status: "pending",
			time_ago: "30分钟前"
		},
		{
			user: { id: 1, name: "齐天大圣", avatar: "https://dongmeiwei.com/images/author_01.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 1, title: "潮汕砂锅粥" },
			status: "successful",
			time_ago: "2018.02.18 09:21"
		},
		{
			user: { id: 2, name: "我是一个小瓜皮", avatar: "https://dongmeiwei.com/images/author_02.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 2, title: "瓜皮炒鸡蛋" },
			status: "rejected",
			time_ago: "2018.02.18 09:21"
		},
		{
			user: { id: 3, name: "boss张", avatar: "https://dongmeiwei.com/images/author_03.jpg" },
			category: { id: 2, name: "满汉全席" },
			article: { id: 3, title: "我只会土豆丝炒肉" },
			status: "withdraw",
			time_ago: "2018.02.18 09:21"
		}
	]
});
