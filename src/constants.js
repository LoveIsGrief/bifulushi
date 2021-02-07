export const CONTAINER_LIFETIME_FOREVER = "forever";
export const CONTAINER_LIFETIME_LAST = "untilLastTab";
export const CONTAINER_LIFETIMES = {
  [CONTAINER_LIFETIME_FOREVER]: "Forever",
  [CONTAINER_LIFETIME_LAST]: "Until last tab is closed",
};

/**
 * How long created containers can stay around
 * @type {string}
 */
export const DEFAULT_CONTAINER_LIFETIME = CONTAINER_LIFETIME_LAST;
