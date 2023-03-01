export const getImgSrc = (prop: string) =>
  new URL(`/src/assets/image/${prop}`, import.meta.url).href
