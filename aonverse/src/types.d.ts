/// <reference types="vite/client" />
/// <reference types="@earthling-ui/themed/reference" />

declare type UserData = {
  _id: string;
  displayName: string;
  displayTut: boolean;
  title: string;
  postTut: boolean;
  bio: string;
  bioTut: boolean;
  qrcode: string;
  profImageTut: boolean;
  backImageTut: boolean;
  tutcomplete: boolean;
  tutview: boolean;
  stars: number;
  slug: string;
  achievements: string[];
  displayCase: string[];
  following: string[];
  supporting: string[];
  followers: string[];
  supporters: string[];
  consecutivelogins: number;
  active: boolean;
  NSFW: boolean;
  tagFollowing: string[];
  lastlogin: string;
  profimage: string;
  email: string;
  backimage: string;
};
declare type PostData = {
  _id: string;
  content: string;
  category: string;
  createdAt: string;
  collaborator: UserData;
  ranked?: number;
  point: number;
  tags: string[];
  slug: string;
  NSFW: boolean;
  Remix: boolean;
  PostTime: string;
  currentrank: number;
  highestrank: number;
  likes: number;
  likesUsers: Array;
  shares: number;
  shareUsers: Array;
  comments: number;
  stars: number;
  starDonator: Array;
  user: string;
  profimage: string;
  profileImage: string;
  text: string;
  postimage: string;
  visibility: string;
} & (
  | {
      privacy: "public";
      media: MediaData[];
      comments: CommentData[];
    }
  | { privacy: "hidden" }
);
declare type MetaData = {
  likes: number;
  isLiked: boolean;
  likesUsers: string[];
  stars: number;
  isStarred: boolean;
  starDonator: string[];
  shares: number;
  isReposted: boolean;
  shareUsers: string[];
};
declare type images = {
  content: string[];
};
declare type MediaData = {
  id: string;
  src: string;
  caption?: string;
  tags: string[];
};
declare type CommentData = {
  id: string;
  user: UserData;
  content: string;
  meta: MetaData;
  replies: CommentData[];
  created_at: string;
};

declare type MessageData = {
  id: string;
  user: UserData;
  content: string;
  created_at: string;
};

declare type FollowData = {
  followed: UserData;
  follower: UserData;
};

declare type SupportData = {
  currency: string;
  amount: number;
  supported: UserData;
  supporter: UserData;
};

//PaymentMethodData is already taken by something else?
declare type AonPaymentMethodData = { id: string } & (
  | {
      type: "stars";
      balance: number;
    }
  | {
      type: "account";
      service: "paypal" | "metamask";
      balance: number;
      currency: "USD" | "BTC" | "ETH";
    }
  | {
      type: "card";
      network: "visa" | "mastercard" | "discover" | "amex";
      number: number;
      expMonth: number;
      expYear: number;
      currency: "USD";
    }
);

declare type PollData = {
  _id: string;
  question: string;
  answers: { id: string; text: string; votes?: number }[];
  submittedBy: UserData;
  openedAt: string;
  closedAt: string;
  myVote?: {
    answerId: string;
    stars: number;
  };
};

declare type AvatarFrameData = {
  id: string;
  image: string;
  title: string;
  description: string;
};

declare type TrophyData = {
  id: string;
  crown: string;
  goal: string;
  image: string;
  title: string;
  description: string;
  progress: number;
  progressText: string;
};

declare type TransactionData = {
  id: string;
  amount: number;
  currency: "USD" | "ETH" | "BTC";
  user: UserData;
  createdAt: string;
} & (
  | {
      type: "subscription";
      subscribedTo: UserData;
    }
  | {
      type: "purchase";
      //idk could be other stuff
    }
);
