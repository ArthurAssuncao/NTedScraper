/*
author
thumbnail
title
posted_date
duration
url
 */

import { Transcript } from "./Transcript";

interface TedTalk {
  author: string;
  thumbnailUrl: string;
  title: string;
  posted_date: string;
  duration: string;
  url: string;
  conference?: string;
  views?: number;
  description?: string;
  topics?: string[];
  authorUrl?: string;
  authorAvatarUrl?: string;
  transcript?: Transcript;
}

export { TedTalk };
