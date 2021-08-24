import { Request as ExpressRequest } from "express";
export interface PoemResponse {
  title: string;
  author: string;
  lines: string[];
  linecount: number;
}

export type Request<T> = ExpressRequest<unknown, unknown, T>;

export interface TranslateBody {
  text: string;
  targetLang: string;
}

export interface SpeakBody {
  text: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
}
