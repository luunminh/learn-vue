/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate, formatDateTimeInHawaii, formatDateUtc } from '../date'
import { isEmpty } from '../validations'
import { formatMoney } from './money'
import { formatPhoneNumber } from './phone'
import { getFullName, getYesNoText } from './string'

interface IParameters {
  defaultValue?: any
}

interface IDateParameters extends IParameters {
  format?: string
  convertToHawaii?: boolean
}

interface ITextParameters extends IParameters {
  size?: number
}

interface ICurrencyParameters extends IParameters {
  defaultValue?: number | null
}

interface IBooleanParameters extends IParameters {
  defaultValue?: boolean | null
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface INameParameters extends IParameters {}

interface IPhoneParameters extends IParameters {
  type?: 'formatInternational' | 'formatNational' | 'getURI'
}

function formatValue(
  type: 'date',
  value: Date | string | null,
  parameters?: IDateParameters,
): string
function formatValue(
  type: 'date-utc',
  value: Date | string | null,
  parameters?: IDateParameters,
): string
function formatValue(type: 'text', value: string, parameters?: ITextParameters): string
function formatValue(
  type: 'currency',
  value: number | null,
  parameters?: ICurrencyParameters,
): string
function formatValue(type: 'name', value: Object, parameters?: INameParameters): string
function formatValue(
  type: 'boolean',
  value: boolean | null,
  parameters?: IBooleanParameters,
): string
function formatValue(type: 'phone', value: string, parameters?: IPhoneParameters): string

/**
 * Get formatted value by type
 * @param type
 * @param value
 * @param parameters
 * @returns formatted value by type
 */
function formatValue(type: any, value: any, parameters?: any): any {
  const { defaultValue = '--' } = parameters || {}
  if (isEmpty(value) && type !== 'currency') return defaultValue

  switch (type) {
    case 'text': {
      return value
    }

    case 'date': {
      const { format, convertToHawaii } = parameters || {}
      if (convertToHawaii) return formatDateTimeInHawaii(value, format)
      return formatDate(value, format)
    }

    case 'date-utc': {
      const { format } = parameters || {}
      return formatDateUtc(value, format)
    }

    case 'currency': {
      return formatMoney(value, defaultValue)
    }

    case 'name': {
      return getFullName(value)
    }

    case 'boolean': {
      return getYesNoText(value)
    }

    case 'phone': {
      const { type } = parameters || {}
      return formatPhoneNumber(value, type)
    }

    default: {
      return value
    }
  }
}

export { formatValue }
