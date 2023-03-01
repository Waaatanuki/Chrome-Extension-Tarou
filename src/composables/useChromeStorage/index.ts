import { nextTick, ref, shallowRef } from 'vue'
import type {
  Awaitable,
  ConfigurableEventFilter,
  ConfigurableFlush,
  MaybeComputedRef,
  RemovableRef,
} from '@vueuse/shared'
import { isFunction, pausableWatch, resolveUnref } from '@vueuse/shared'
import { useEventListener } from '@vueuse/core'
import { guessSerializerType } from './guess'

export interface Serializer<T> {
  read(raw: string): T
  write(value: T): string
}

export interface SerializerAsync<T> {
  read(raw: string): Awaitable<T>
  write(value: T): Awaitable<string>
}

export const StorageSerializers: Record<
  'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date',
  Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) =>
      JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
}

export interface UseStorageOptions<T>
  extends ConfigurableEventFilter,
    ConfigurableFlush {
  /**
   * Watch for deep changes
   *
   * @default true
   */
  deep?: boolean

  /**
   * Listen to storage changes, useful for multiple tabs application
   *
   * @default true
   */
  listenToStorageChanges?: boolean

  /**
   * Write the default value to the storage when it does not exist
   *
   * @default true
   */
  writeDefaults?: boolean

  /**
   * Merge the default value with the value read from the storage.
   *
   * When setting it to true, it will perform a **shallow merge** for objects.
   * You can pass a function to perform custom merge (e.g. deep merge), for example:
   *
   * @default false
   */
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T)

  /**
   * Custom data serialization
   */
  serializer?: Serializer<T>

  /**
   * On error callback
   *
   * Default log error to `console.error`
   */
  onError?: (error: unknown) => void

  /**
   * Use shallow ref as reference
   *
   * @default false
   */
  shallow?: boolean
}

export function useChromeStorage(
  key: string,
  defaults: MaybeComputedRef<string>,
  storage?: chrome.storage.StorageArea,
  options?: UseStorageOptions<string>
): RemovableRef<string>
export function useChromeStorage(
  key: string,
  defaults: MaybeComputedRef<boolean>,
  storage?: chrome.storage.StorageArea,
  options?: UseStorageOptions<boolean>
): RemovableRef<boolean>
export function useChromeStorage(
  key: string,
  defaults: MaybeComputedRef<number>,
  storage?: chrome.storage.StorageArea,
  options?: UseStorageOptions<number>
): RemovableRef<number>
export function useChromeStorage<T>(
  key: string,
  defaults: MaybeComputedRef<T>,
  storage?: chrome.storage.StorageArea,
  options?: UseStorageOptions<T>
): RemovableRef<T>
export function useChromeStorage<T = unknown>(
  key: string,
  defaults: MaybeComputedRef<null>,
  storage?: chrome.storage.StorageArea,
  options?: UseStorageOptions<T>
): RemovableRef<T>

/**
 * Reactive ChromeStorage.
 *
 * @see https://vueuse.org/useStorage
 */
export function useChromeStorage<
  T extends string | number | boolean | object | null
>(
  key: string,
  defaults: MaybeComputedRef<T>,
  storage: chrome.storage.StorageArea | undefined,
  options: UseStorageOptions<T> = {}
): RemovableRef<T> {
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = false,
    shallow,
    eventFilter,
    onError = e => {
      console.error(e)
    },
  } = options

  const data = (shallow ? shallowRef : ref)(defaults) as RemovableRef<T>
  if (!storage) {
    try {
      storage = chrome.storage.local
    } catch (e) {
      onError(e)
    }
  }
  if (!storage) return data
  const rawInit: T = resolveUnref(defaults)
  const type = guessSerializerType<T>(rawInit)
  const serializer = options.serializer ?? StorageSerializers[type]

  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(
    data,
    () => write(data.value),
    { flush, deep, eventFilter }
  )

  if (window && listenToStorageChanges)
    useEventListener(window, 'storage', update)

  update()

  return data

  async function write(v: unknown) {
    try {
      if (v == null) {
        storage!.remove(key)
      } else {
        const serialized = serializer.write(v)
        const result = await storage!.get(key)
        const oldValue = result[key]
        const newValue: any = {}
        if (oldValue !== serialized) {
          newValue[key] = serialized
          storage!.set(newValue)
        }
      }
    } catch (e) {
      onError(e)
    }
  }

  async function read() {
    const result = await storage!.get(key)
    const rawValue = result[key]

    if (rawValue == null) {
      if (writeDefaults && rawInit !== null) {
        const newValue: any = {}
        newValue[key] = serializer.write(rawInit)
        storage!.set(newValue)
      }
      return rawInit
    } else if (mergeDefaults) {
      const value = serializer.read(rawValue)
      if (isFunction(mergeDefaults)) return mergeDefaults(value, rawInit)
      else if (type === 'object' && !Array.isArray(value))
        return { ...(rawInit as any), ...value }
      return value
    } else if (typeof rawValue !== 'string') {
      return rawValue
    } else {
      return serializer.read(rawValue)
    }
  }

  async function update() {
    pauseWatch()
    try {
      data.value = await read()
    } catch (e) {
      onError(e)
    } finally {
      resumeWatch()
    }
  }
}
