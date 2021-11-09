import { Request as ExpressRequest } from "express";
export interface PoemResponse {
  title: string;
  author: string;
  lines: string[];
  linecount: string;
}

export interface PoemError {
  status: number;
  reason: string;
}

export type Request<T> = ExpressRequest<unknown, unknown, T>;

export interface TranslateBody {
  text: string;
  targetLang: string;
}

export interface SpeakBody {
  text: string;
  languageCode: string;
}

export type VoiceList = string[] | null;
