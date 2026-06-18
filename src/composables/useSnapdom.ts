import type { CaptureResult, SnapdomOptions } from '@zumer/snapdom'
import { snapdom } from '@zumer/snapdom'

const snapdomOptions = {
  embedFonts: true,
  localFonts: [
    {
      family: 'LXGW WenKai Screen',
      src: '/src/assets/font/LXGWWenKaiScreen.min.woff2',
    },
  ],
} satisfies SnapdomOptions

export function useSnapdom(element: Element): Promise<CaptureResult> {
  return snapdom(element, snapdomOptions)
}

export default useSnapdom
