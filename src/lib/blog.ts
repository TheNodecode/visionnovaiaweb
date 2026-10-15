import { SITE } from '../config/site';

const SUFFIX = ' | ' + SITE.name;

/** Título para <title>: añade la marca solo si cabe en 65 caracteres. */
export function blogSeoTitle(title: string): string {
  return title.length + SUFFIX.length <= 65 ? title + SUFFIX : title;
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
}
