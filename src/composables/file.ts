export function getLocalImg(prop: string, type: string = 'common') {
  return new URL(`/src/assets/image/${type}/${prop}.png`, import.meta.url).href
}
