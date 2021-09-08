export interface PoemResponse {
  title: string;
  author: string;
  lines: string[];
  linecount: number;
}

export type SearchType = "title" | "author";

export type TranslateResponse = string;

export interface LanguageResult {
  code: string;
  name: string;
}
