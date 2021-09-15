export interface PoemResponse {
  title: string;
  author: string;
  lines: string[];
  linecount: number;
}

export enum SearchType {
  TITLE = 'title',
  AUTHOR = 'author'
}

export type TranslateResponse = string;

export interface LanguageResponse {
  code: string;
  name: string;
}
