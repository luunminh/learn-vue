/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import { parse } from 'qs'
import { v4 as uuidv4 } from 'uuid'
import { common, DateFormat, deepKeysHookFormErrors, formatDate, isEmpty } from '..'

export const emptyFunction = (..._args: any[]) => {}

export const getRandomId = (): string => uuidv4()

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}

export const generateArray = (length: number, initial = '') => Array(length).fill(initial)

export const handleGetError = (touched: any, errors: any, prefix: any) => {
  return _.get(touched, prefix) ? _.get(errors, prefix) : ''
}

export const waiter = (time = 100) => {
  return new Promise<Array<any>>((res) => setTimeout(() => res([]), time))
}

export const trimUrlHasEndDate = (url: string) => {
  const trimUrl = url.split('?')[0]
  const items = trimUrl.split('_')
  return items.slice(0, items.length - 1).join('')
}

export const trimUrl = (url: string) => {
  if (!url) return null
  return url.split('?')[0]
}

// link https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript
export const deepKeys = (t: any, path: string[] = []) => {
  const res: string[] =
    Object(t) === t
      ? Object.entries(t) // 1
          .flatMap(([k, v]) => deepKeys(v, [...path, k]))
      : [path.join('.')] // 2
  return res?.filter((x: string) => !/\d$/.test(x))
}

export const scrollToTopError = (error: string[]) => {
  if (!isEmpty(error)) {
    const input = document.querySelector(`[name='${error[0]}']`)
    if (input) {
      const { parentElement } = input
      parentElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      parentElement?.focus({ preventScroll: true })
      ;(input as HTMLInputElement)?.focus({ preventScroll: true })
    }
  }
}

export const handleScrollToTopHookFormError = <T>(errors: T) => {
  setTimeout(() => {
    scrollToTopError(deepKeysHookFormErrors(errors))
  }, 100)
}

export const handleScrollToTopError = <T>(errors: T) =>
  setTimeout(() => {
    scrollToTopError(deepKeys(errors))
  }, 100)

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const getFieldNameByPrefix = (prefix: string, name: string) => {
  if (!prefix) return name

  return `${prefix}.${name}`
}

export const getAttachmentUrl = (attachmentId: string) =>
  `${common.INFOR_MIGRATION_HIPOP_API_URL}/v1/attachments/${attachmentId}`

/**
 * Convert file types to string
 * @param fileTypes : Accept
 * @returns string
 * @example 'png, jpg, jpeg, webp, pdf, docx, xlsx, csv, pptx, mp4'
 */
export const convertFileTypesToString = (fileTypes: any): string => {
  const extensions: string[] = []
  for (const key in fileTypes) {
    const fileTypeKey = key as keyof typeof fileTypes
    extensions.push(fileTypes[fileTypeKey][0].substring(1))
  }
  return extensions.join(', ')
}

export function createPrefixedObject<T extends string | number | symbol>(
  prefix: string,
  enumObject: any,
): Record<T, string> {
  return Object.keys(enumObject).reduce(
    (acc: Record<T, string>, key) => {
      return { ...acc, [enumObject[key]]: `${prefix}.${enumObject[key]}` }
    },
    {} as Record<T, string>,
  )
}

export const omitKeys = (obj: any, keys: string[]) => {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result
}

/**
 * Format date range to URL search params
 * @param date : [Date, Date]
 * @param key : [string, string]
 * @param format : string
 * @param searchParams : URLSearchParams
 * @example
 * formatDateRangeToSearchParams({
 *  date: [new Date(), new Date()],
 *  key: ['arrival_start_date', 'arrival_end_date'],
 *  searchParams: new URLSearchParams(),
 *  format: DateFormat.YEAR_MONTH_DATE,
 * })
 */

export const formatDateRangeToSearchParams = ({
  date: [startDate, endDate],
  key: [keyStart, keyEnd],
  format = DateFormat.YEAR_MONTH_DATE,
  searchParams,
}: {
  date: [Date, Date]
  key: [string, string]
  format?: string
  searchParams: URLSearchParams
}) => {
  searchParams.set(keyStart, formatDate(startDate, format))
  searchParams.set(keyEnd, formatDate(endDate, format))
}
