import { resolve } from 'node:path'

export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
