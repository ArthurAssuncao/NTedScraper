/*
author
thumbnail
title
posted_date
duration
url
 */

import { Transcript } from "./Transcript";

type PostedDate = {
  month: number;
  year: number;
};

type TedTalk = {
  author: string;
  thumbnailUrl: string;
  title: string;
  postedDate: PostedDate;
  duration: number;
  url: string;
  conference?: string; // spearkes[0].videoContext
  views?: number; // viewedCount
  description?: string;
  topics?: string[];
  authorUrl?: string;
  authorAvatarUrl?: string;
  authorDescription?: string; // description
  language?: string; // internalLanguageCode
  id?: number; //id
  publishedAt?: Date; // publishedAt
  talkType?: string; // type.name
  transcript?: Transcript;
};

export { TedTalk };
