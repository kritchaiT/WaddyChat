export interface Chat {
  id: string;
  name: string;
  avatar: any;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

export interface Post {
  id: string;
  username: string;
  userAvatar: any;
  image: any;
  caption: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
}

export interface Reel {
  id: string;
  username: string;
  userAvatar: any;
  thumbnail: any;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

const defaultAvatar = require("../../assets/images/avatar-default.png");

export const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: defaultAvatar,
    lastMessage: "That sounds great! Let's meet tomorrow",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: defaultAvatar,
    lastMessage: "Did you see the new update?",
    timestamp: "15m ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: defaultAvatar,
    lastMessage: "Thanks for sharing those photos!",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "Alex Rivera",
    avatar: defaultAvatar,
    lastMessage: "See you at the event tonight",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: "5",
    name: "Jordan Lee",
    avatar: defaultAvatar,
    lastMessage: "The project is almost done",
    timestamp: "5h ago",
    unreadCount: 0,
    isOnline: true,
  },
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    { id: "1", chatId: "1", text: "Hey! How are you doing?", timestamp: "10:30 AM", isSent: false },
    { id: "2", chatId: "1", text: "I'm great, thanks for asking!", timestamp: "10:32 AM", isSent: true },
    { id: "3", chatId: "1", text: "Want to grab coffee later?", timestamp: "10:33 AM", isSent: false },
    { id: "4", chatId: "1", text: "That sounds great! Let's meet tomorrow", timestamp: "10:35 AM", isSent: true },
  ],
  "2": [
    { id: "1", chatId: "2", text: "Check out this new feature", timestamp: "9:00 AM", isSent: false },
    { id: "2", chatId: "2", text: "Did you see the new update?", timestamp: "9:15 AM", isSent: false },
  ],
  "3": [
    { id: "1", chatId: "3", text: "Here are the photos from yesterday", timestamp: "Yesterday", isSent: true },
    { id: "2", chatId: "3", text: "Thanks for sharing those photos!", timestamp: "Yesterday", isSent: false },
  ],
  "4": [
    { id: "1", chatId: "4", text: "Are you coming tonight?", timestamp: "2:00 PM", isSent: false },
    { id: "2", chatId: "4", text: "Yes! I'll be there at 7", timestamp: "2:05 PM", isSent: true },
    { id: "3", chatId: "4", text: "See you at the event tonight", timestamp: "2:10 PM", isSent: false },
  ],
  "5": [
    { id: "1", chatId: "5", text: "How's the progress?", timestamp: "11:00 AM", isSent: true },
    { id: "2", chatId: "5", text: "The project is almost done", timestamp: "11:30 AM", isSent: false },
  ],
};

export const mockPosts: Post[] = [
  {
    id: "1",
    username: "nature_lover",
    userAvatar: defaultAvatar,
    image: require("../../assets/images/sample-post-1.png"),
    caption: "Golden hour at the mountains. Nothing beats this view!",
    likes: 342,
    comments: 28,
    isLiked: false,
    timestamp: "2h ago",
  },
  {
    id: "2",
    username: "urban_explorer",
    userAvatar: defaultAvatar,
    image: require("../../assets/images/sample-post-2.png"),
    caption: "City vibes. The architecture here is incredible.",
    likes: 189,
    comments: 15,
    isLiked: true,
    timestamp: "4h ago",
  },
  {
    id: "3",
    username: "foodie_adventures",
    userAvatar: defaultAvatar,
    image: require("../../assets/images/sample-post-3.png"),
    caption: "Morning fuel. Starting the day right with this delicious bowl!",
    likes: 521,
    comments: 43,
    isLiked: false,
    timestamp: "6h ago",
  },
  {
    id: "4",
    username: "macro_world",
    userAvatar: defaultAvatar,
    image: require("../../assets/images/sample-post-4.png"),
    caption: "The little things in life. Morning dew on a fresh leaf.",
    likes: 267,
    comments: 19,
    isLiked: false,
    timestamp: "8h ago",
  },
];

export const mockReels: Reel[] = [
  {
    id: "1",
    username: "wave_rider",
    userAvatar: defaultAvatar,
    thumbnail: require("../../assets/images/sample-reel-1.png"),
    caption: "Catching the perfect wave today! Summer vibes all the way.",
    likes: 1542,
    comments: 89,
    shares: 45,
    isLiked: false,
  },
  {
    id: "2",
    username: "art_in_motion",
    userAvatar: defaultAvatar,
    thumbnail: require("../../assets/images/sample-reel-2.png"),
    caption: "Creating magic with colors. Art is everywhere!",
    likes: 2103,
    comments: 156,
    shares: 78,
    isLiked: true,
  },
  {
    id: "3",
    username: "life_moments",
    userAvatar: defaultAvatar,
    thumbnail: require("../../assets/images/sample-reel-3.png"),
    caption: "Best memories are made with best friends. Love these people!",
    likes: 892,
    comments: 67,
    shares: 23,
    isLiked: false,
  },
];

export const currentUser = {
  id: "current",
  name: "Alex Thompson",
  username: "@alexthompson",
  avatar: defaultAvatar,
  bio: "Photography enthusiast. Coffee lover. Adventure seeker.",
  postsCount: 42,
  followersCount: 1234,
  followingCount: 567,
};
