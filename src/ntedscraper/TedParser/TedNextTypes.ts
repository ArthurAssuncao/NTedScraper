export interface TedNextTypes {
  props?: Props;
  page?: string;
  query?: Query;
  buildId?: string;
  runtimeConfig?: RuntimeConfig;
  isFallback?: boolean;
  gssp?: boolean;
  customServer?: boolean;
  appGip?: boolean;
}

export interface Props {
  pageProps?: PageProps;
  language?: string;
  messages?: Messages;
  responseCode?: number;
  __N_SSP?: boolean;
}

export interface Messages {}

export interface PageProps {
  talksPageBanner?: TalksPageBanner;
  preview?: boolean;
  action?: null;
  videoData?: VideoData;
  hasComments?: boolean;
}

export interface TalksPageBanner {
  banner?: Banner;
  status?: string;
}

export interface Banner {
  title?: string;
  slug?: string;
  bannerLocation?: string;
  displayToExistingMembers?: boolean;
  mainContentHeadline?: string;
  mainContent?: string;
  buttonLabel?: string;
  buttonLink?: string;
  showButtonIcon?: boolean;
  backgroundColor?: string;
  textColor?: string;
  useBackgroundGradient?: boolean;
  imageMobileBreakpoint?: ImageBreakpoint;
  imageTabletBreakpoint?: ImageBreakpoint;
  imageDesktopBreakpoint?: ImageBreakpoint;
  imageXLBreakpoint?: ImageBreakpoint;
}

export interface ImageBreakpoint {
  metadata?: Metadata;
  sys?: ImageDesktopBreakpointSys;
  fields?: Fields;
}

export interface Fields {
  title?: string;
  description?: string;
  file?: File;
}

export interface File {
  url?: string;
  details?: Details;
  fileName?: string;
  contentType?: string;
}

export interface Details {
  size?: number;
  image?: Image;
}

export interface Image {
  width?: number;
  height?: number;
}

export interface Metadata {
  tags?: any[];
}

export interface ImageDesktopBreakpointSys {
  space?: Environment;
  id?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  environment?: Environment;
  revision?: number;
  locale?: string;
}

export interface Environment {
  sys?: EnvironmentSys;
}

export interface EnvironmentSys {
  id?: string;
  type?: string;
  linkType?: string;
}

export interface VideoData {
  __typename?: Typename;
  id?: string;
  slug?: string;
  title?: string;
  socialTitle?: string;
  presenterDisplayName?: string;
  internalLanguageCode?: string;
  recordedOn?: Date;
  curatorApproved?: boolean;
  viewedCount?: number;
  duration?: number;
  publishedAt?: Date;
  topics?: Topics;
  talkExtras?: TalkExtras;
  primaryImageSet?: PrimaryImageSet[];
  relatedVideos?: Type[];
  customContentDetails?: CustomContentDetails;
  speakers?: Speakers;
  description?: string;
  socialDescription?: string;
  partnerName?: null;
  playerData?: string;
  videoContext?: string;
  audioInternalLanguageCode?: string;
  language?: string;
  hasTranslations?: boolean;
  featured?: boolean;
  type?: Type;
}

export enum Typename {
  Topic = "Topic",
  TypeOfVideo = "TypeOfVideo",
  Video = "Video",
}

export interface CustomContentDetails {
  __typename?: string;
  partnerName?: null;
}

export interface PrimaryImageSet {
  __typename?: string;
  url?: string;
  aspectRatioName?: string;
}

export interface Type {
  __typename?: Typename;
  slug?: string;
  id?: string;
  name?: string;
}

export interface Speakers {
  __typename?: string;
  nodes?: Node[];
}

export interface Node {
  __typename?: string;
  photoUrl?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  description?: string;
  isLive?: boolean;
  title?: string;
  whatOthersSay?: string;
  whoTheyAre?: string;
  whyListen?: string;
  slug?: string;
}

export interface TalkExtras {
  __typename?: string;
  recommendations?: any[];
  takeAction?: any[];
  learnModules?: any[];
}

export interface Topics {
  __typename?: string;
  nodes?: Type[];
}

export interface Query {
  slug?: string[];
}

export interface RuntimeConfig {
  STRIPE_PUBLISHABLE_KEY?: string;
  RECAPTCHA_KEY?: string;
  SUPERCAST_TOKEN?: string;
}
