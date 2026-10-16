export const ICON_NAMES = [
  'camera', 'film', 'megaphone', 'target', 'chat', 'phone', 'crm',
  'bolt', 'shield', 'chart', 'calendar', 'globe', 'users', 'spark',
] as const;
export type IconName = (typeof ICON_NAMES)[number];
