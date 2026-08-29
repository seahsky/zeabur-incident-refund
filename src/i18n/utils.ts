import zhTW from './locales/zh-TW';
import en from './locales/en';
import zhTWTemplate from './templates/zh-TW';
import enTemplate from './templates/en';
import type { Dictionary, TemplateDictionary } from './dictionary';

export type Locale = 'zh-TW' | 'en';

const dictionaries: Record<Locale, Dictionary> = { 'zh-TW': zhTW, en };
const templates: Record<Locale, TemplateDictionary> = { 'zh-TW': zhTWTemplate, en: enTemplate };

export function useTranslations(lang: Locale): Dictionary {
  return dictionaries[lang] ?? dictionaries['zh-TW'];
}

export function getTemplateDictionary(lang: Locale): TemplateDictionary {
  return templates[lang] ?? templates['zh-TW'];
}
