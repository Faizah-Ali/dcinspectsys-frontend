/**
 * Project-wide responsive breakpoint boundaries (px).
 *
 * Desktop UI is frozen at viewports >= DESKTOP_MIN (1200px).
 * Responsive overrides for later phases should target viewports below DESKTOP_MIN.
 *
 * Aligns with existing media queries in login (900px, 1200px),
 * select-staff / upload-file (600px), and MUI sx breakpoints (xs/sm at 600px).
 */
export const MOBILE_MAX = 599;
export const TABLET_MIN = 600;
export const TABLET_MAX = 899;
export const RESPONSIVE_MIN = 900;
export const RESPONSIVE_MAX = 1199;
export const DESKTOP_MIN = 1200;
