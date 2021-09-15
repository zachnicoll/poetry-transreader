import { LanguageResponse } from 'API/types';

export interface SelectOption {
  value: string;
  label: string;
}

export const languagesToSelectOptions = (
  languages: LanguageResponse[]
): SelectOption[] =>
  languages.map((language) => ({
    value: language.code,
    label: language.name
  }));
