import { chain, orderBy, times } from "lodash";
import { DateTime, Duration } from "luxon";
import { loremIpsum } from "lorem-ipsum";

const names = [
  "Sunny123",
  "PixelMaster",
  "RainbowGazer",
  "TechGeek42",
  "StarlightDreamer",
  "CoffeeAddict",
  "Moonwalker99",
  "GardenNinja",
  "CaptainAdventure",
  "ChocoLover",
  "EagleEye23",
  "MountainHiker",
  "BookwormGuru",
  "Beachcomber",
  "PandaPal",
  "JazzJunkie",
  "SoccerStar007",
  "MidnightRider",
  "MysterySolver",
  "SkydivingPro",
  "AquaExplorer",
  "GuitarHeroic",
  "TigerTrack",
  "SunflowerSmiles",
  "PizzaConnoisseur",
  "ThunderStormer",
  "DanceFloorKing",
  "CoffeeSipper",
  "GalaxyRoamer",
  "TrailBlazerX",
  "UrbanNomad",
  "LuckyDiceRoll",
  "FlowerPowerChild",
  "SpacePioneer",
  "CandyCraver",
  "ForestWhisperer",
  "CyberWanderer",
  "DragonFlyer",
  "BeardGroomer",
  "SnowboardPro",
  "ChocolateMunch",
  "AstronomyBuff",
  "GamerLegend",
  "SailingCaptain",
  "TropicalSunset",
  "RockClimber",
  "CosmicTraveler",
  "CherryBlossom",
  "GreenThumb",
  "SpeedyCyclist",
  "CleverCoder",
  "SurfingEnthusiast",
  "SilverFox",
  "DreamWeaver",
  "StarGazer",
  "AdventureSeeker",
  "PianoMaestro",
  "Wanderlust",
  "FireworkFrenzy",
  "WildlifeWatcher",
  "PizzaLover",
  "MagicMarker",
  "MountainBiker",
  "PolarBear",
  "SunsetChaser",
  "ZenMaster",
  "ChocolateDipper",
  "MoonLander",
  "SprintKing",
  "JungleExplorer",
  "SkiingFanatic",
  "TeaDrinker",
  "ButterflyFlies",
  "RhythmRider",
  "CampingCraze",
  "GuitarPlucker",
  "DesertNomad",
  "AquaticAdventurer",
  "LunarJourney",
  "SnowflakeDancer",
  "FlameArtist",
  "UrbanGypsy",
  "BungeeJumper",
  "GamerGuru",
  "Skateboarder",
  "DesertOasis",
  "HikingNomad",
  "SushiLover",
  "StarryNight",
  "MysticExplorer",
  "PenguinWatcher",
  "CyclingAce",
  "TrekkingTurtle",
  "RainDancer",
  "MelodyMaker",
];

function getRandom<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeDummyTime(options?: { span: number }) {
  const { span = 1000 } = options || {};

  return DateTime.now()
    .minus(Duration.fromObject({ minutes: Math.random() * span }))
    .toISO()!;
}

export function makeDummyId() {
  return Math.random().toString(32).substring(7);
}

export function makeDummyImageSrc(width: number, height: number = width) {
  const id = makeDummyId();
  return `https://picsum.photos/seed/${id}${width}/${height}`;
}

export function makeDummyUser(): UserData {
  const id = makeDummyId();
  const name = orderBy(names, Math.random)[0];

  return {
    _id: id,
    email: `${name}@aonverse.com`,
    displayName: name,
    profimage: makeDummyImageSrc(250),
    backimage: makeDummyImageSrc(1920, 600),
    displayTut: false,
    title: "title",
    postTut: true,
    bio: "bio",
    bioTut: true,
    qrcode: "qrcode",
    profImageTut: true,
    backImageTut: true,
    tutcomplete: true,
    tutview: true,
    stars: 5,
    slug: "slug",
    achievements: [],
    displayCase: [],
    following: [],
    supporting: [],
    followers: [],
    supporters: [],
    consecutivelogins: 6,
    active: true,
    NSFW: false,
    tagFollowing: [],
    lastlogin: "time"
  };
}

export function makeDummyMeta(options?: {}) {
  const {} = options || {};

  return {
    likes: Math.round(Math.random() * 1000),
    isLiked: Math.random() > 0.5,
    stars: Math.round(Math.random() * 1000),
    isStarred: Math.random() > 0.5,
    reposts: Math.round(Math.random() * 1000),
    isReposted: Math.random() > 0.5,
  };
}



/*export function makeDummyComments(options: { amt: number }): CommentData[] {
  const { amt } = options || {};

  const noOfComments = Math.floor(Math.random() * amt);

  return Array(noOfComments)
    .fill("")
    .map(
      () =>
        ({
          id: makeDummyId(),
          content: loremIpsum({ count: 1, units: "paragraph" }),
          created_at: makeDummyTime(),
          meta: makeDummyMeta(),
          replies: makeDummyComments({ amt: amt * 0.2 }),
          user: getRandom(dummyUsers),
        } satisfies CommentData)
    );
}*/

export function makeDummyMessage(options?: {}) {
  const {} = options || {};

  return {
    id: makeDummyId(),
    created_at: makeDummyTime(),
    user: getRandom(dummyUsers),
    content: loremIpsum({
      count: 2,
      units: "sentences",
    }),
  } satisfies MessageData;
}

//static dummy data / mock database
export const dummySession = {
  user: makeDummyUser(),
};
export const dummyUsers = times(20).map(() => makeDummyUser());
/*export const dummyPosts = times(1000).map(() =>
  makeDummyPost({
    author: orderBy([...dummyUsers, dummySession.user], Math.random)[0],
  })
);*/
export const dummyInboxMessages = times(300).map(() => makeDummyMessage());

export const dummySupports = chain(dummyUsers)
  .orderBy(Math.random)
  .take(Math.round(Math.random() * 50))
  .map(
    (x) =>
      ({
        amount: (Math.round(Math.random() * 4) + 1) * 5,
        supporter: dummySession.user,
        supported: x,
        currency: "USD",
      } as SupportData)
  )
  .value();

export const dummyFollows = chain(dummyUsers)
  .orderBy(Math.random)
  .take(Math.round(Math.random() * 50))
  .map(
    (x) =>
      ({
        follower: dummySession.user,
        followed: x,
      } as FollowData)
  )
  .value();

export const dummyPaymentMethods: AonPaymentMethodData[] = [
  { id: makeDummyId(), type: "stars", balance: Math.random() * 100000 },
  {
    id: makeDummyId(),
    type: "account",
    service: "paypal",
    balance: Math.random() * 1000,
    currency: "USD",
  },
  {
    id: makeDummyId(),
    type: "account",
    service: "metamask",
    balance: Math.random() * 100,
    currency: "ETH",
  },
  {
    id: makeDummyId(),
    type: "card",
    network: "visa",
    expMonth: 4,
    expYear: 26,
    number: 4242424242424242,
    currency: "USD",
  },
];

export const dummyTransactions: TransactionData[] = times(20).map(() => ({
  id: makeDummyId(),
  user: dummySession.user,
  amount: Math.random() * 20,
  currency: "USD",
  createdAt: makeDummyTime({ span: 3000 }),
  type: "subscription",
  subscribedTo: chain(dummyUsers).orderBy(Math.random).first().value(),
}));

export const dummyPolls: PollData[] = [
  {
    _id: makeDummyId(),
    question: "SHOULD  WE ALLOW FEET VIDEO OR JUST FEET PICS?",
    answers: [
      { id: makeDummyId(), text: "Feet pics all the way" },
      { id: makeDummyId(), text: "Nah, Vids all the way, bro. " },
    ],
    submittedBy: chain(dummyUsers).orderBy(Math.random).first().value(),
    openedAt: makeDummyTime({ span: 100000 }),
    closedAt: makeDummyTime({ span: -100000 }),
  },
  {
    _id: makeDummyId(),
    question: "HOW SHOULD NAZI'S BE PUNISHED HERE?",
    answers: [
      { id: makeDummyId(), text: "Punches" },
      { id: makeDummyId(), text: "Bitchslaps, since they wanna be bitches" },
    ],
    submittedBy: chain(dummyUsers).orderBy(Math.random).first().value(),
    openedAt: makeDummyTime({ span: 100000 }),
    closedAt: makeDummyTime({ span: -100000 }),
  },
  {
    _id: makeDummyId(),
    question: "SHOULD WE ALLOW MALE NIPPLES OR NAH?",
    answers: [
      { id: makeDummyId(), text: "Nope" },
      { id: makeDummyId(), text: "Is a free social site, bruh." },
    ],
    submittedBy: chain(dummyUsers).orderBy(Math.random).first().value(),
    openedAt: makeDummyTime({ span: 100000 }),
    closedAt: makeDummyTime({ span: -100000 }),
  },
];

const avatarFrameImages = [
  "/frames/Frame 3.png",
  "/frames/Frame 4.png",
  "/frames/Frame 5.png",
  "/frames/Frame 6.png",
  "/frames/Frame 7.png",
];

export const dummyAvatarFrames: AvatarFrameData[] = [
  {
    id: makeDummyId(),
    image: avatarFrameImages[0],
    title: "AMBER CROWN",
    description: "Beta Tester #21",
  },
  {
    id: makeDummyId(),
    image: avatarFrameImages[1],
    title: "SNAKE CROWN",
    description: "First 1000 Users",
  },
  {
    id: makeDummyId(),
    image: avatarFrameImages[2],
    title: "HERO'S CROWN",
    description: "Kickstarter Hero",
  },
  {
    id: makeDummyId(),
    image: avatarFrameImages[3],
    title: "HERO'S CROWN",
    description: "First 1000 Users",
  },
  {
    id: makeDummyId(),
    image: avatarFrameImages[4],
    title: "None",
    description: "",
  },
];

/*const trophyImages = [
  "/trophies/017-diamond Copy.png",
  "/trophies/025-pschent Copy.png",
  "/trophies/025-pschent.png",
  "/trophies/crown.png",
  "/trophies/Object-1.png",
  "/trophies/Object-2.png",
  "/trophies/Object-3.png",
  "/trophies/Object-4.png",
  "/trophies/Object-5.png",
  "/trophies/Object-6.png",
  "/trophies/Object.png",
];*/
/*export const dummyTrophies1: TrophyData[] = times(15).map(() => ({
  id: makeDummyId(),
  image: chain(trophyImages).orderBy(Math.random).first().value(),
  title: "(X 12) ARTIC CROWN",
  description: "Logon for 30 days straight",
  progress: Math.random() * 100,
  progressText: "35 days / 50 days",
}));*/
export const dummyTags: string[] = [
  "Anime",
  "Manga",
  "Classical Art",
  "Paw Patrol",
  "Goth Chicks",
  "Rap",
];
