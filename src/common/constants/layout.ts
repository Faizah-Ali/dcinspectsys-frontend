/**
 * Shared layout dimensions for the authenticated shell.
 *
 * Values mirror the current desktop layout — do not change these without
 * verifying desktop regression at viewports >= DESKTOP_MIN (1200px).
 *
 * Header (components/header/style.ts) has no explicit height; it is derived from
 * 16px vertical padding + 72px emblem row + 1px border (~105px rendered).
 * The shell uses the offsets below, which are the source of truth in layout code.
 */
export const SIDEBAR_WIDTH = 350;

/** Horizontal offset for main content (matches sidebar width). */
export const CONTENT_OFFSET = SIDEBAR_WIDTH;

/**
 * Offset subtracted from 100vh for sidebar height (`calc(100vh - Npx)`).
 * Also referenced by mainContainer comment as ~100px header clearance.
 */
export const HEADER_HEIGHT = 100;

/** sidebar/style.ts — fixed sidebar `top` below the header. */
export const SIDEBAR_TOP_OFFSET = 90;

/** mainContainer paddingTop — clears the fixed header. */
export const CONTENT_PADDING_TOP = 110;
