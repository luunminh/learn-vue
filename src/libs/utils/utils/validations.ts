/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs'
import { YesNoValue } from './common.type'

type Field = 'email' | 'password' | 'text'

export const isEmpty = (value: any): boolean => {
  return value instanceof Date
    ? !dayjs(value).isValid()
    : !value ||
        value === undefined ||
        value === null ||
        value === 'undefined' ||
        value === 'null' ||
        Number.isNaN(value) ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value === '') ||
        (Array.isArray(value) && value.length === 0)
}

export const validateField = (field: Field, value: any, allowEmpty = false) => {
  if (isEmpty(value) && allowEmpty) return ''

  if (isEmpty(value) && !allowEmpty) return 'Field cannot be blank.'

  if (field === 'email' && !isValidEmail(value)) return 'Email is invalid.'

  return ''
}

export const isNumeric = (num: any) => {
  return !isNaN(num)
}

export const isValidEmail = (value: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(value)
}

export const isValidApplicationNumber = (value: string): boolean => {
  const re = /^([A-z][0-9]{2}[-][0-9]{5,10}|[A-z]{3,5}[-][0-9]{5,10})$/
  return re.test(value) || isEmpty(value)
}

export const isYesValue = (value: string) => value === YesNoValue.YES
export const isNoValue = (value: string) => value === YesNoValue.NO

export const isString = (value: any): value is string => typeof value === 'string'
