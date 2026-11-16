import { marked } from 'marked';
import type { Lang } from '../i18n/ui';
import site from '../content/settings/site.json';

export { site };

export const loc = (obj: Record<string, any> | undefined, key: string, lang: Lang): string =>
  obj?.[`${key}_${lang}`] || obj?.[`${key}_ro`] || obj?.[`${key}_en`] || '';

export const md = (value: string | undefined): string =>
  marked.parse(value ?? '', { async: false }) as string;

export const formatDate = (date: Date | undefined, lang: Lang): string =>
  date
    ? new Intl.DateTimeFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    : '';

export const formatMonth = (date: Date | undefined, lang: Lang): string =>
  date
    ? new Intl.DateTimeFormat(lang === 'ro' ? 'ro-RO' : 'en-GB', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    : '';

export const PLACEHOLDER = '/images/placeholder.svg';
