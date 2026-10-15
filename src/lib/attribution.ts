import { ATTRIBUTION_KEYS } from './lead';

const KEY = 'vn-attribution';

export function readAttribution(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(KEY);
    const o = raw ? JSON.parse(raw) : {};
    return o && typeof o === 'object' ? o : {};
  } catch { return {}; }
}

/** Primer contacto: guarda los parámetros de campaña de la URL sin pisar los ya guardados en la sesión. */
export function captureAttribution() {
  try {
    const q = new URLSearchParams(location.search);
    const saved = readAttribution();
    let changed = false;
    for (const k of ATTRIBUTION_KEYS) {
      const v = q.get(k);
      if (v && !saved[k]) { saved[k] = v.slice(0, 200); changed = true; }
    }
    if (changed) sessionStorage.setItem(KEY, JSON.stringify(saved));
  } catch { /* almacenamiento no disponible */ }
}
