import parsePhoneNumber from 'libphonenumber-js'
import { isEmpty } from '../validations'

const COUNTRY_CALLING_CODE_OF_US = '1'

export const formatPhoneNumber = (
  mobile: string,
  type?: 'formatInternational' | 'formatNational' | 'getURI' | 'formatUSPhone',
) => {
  if (isEmpty(mobile)) return ''

  const phoneNumber = parsePhoneNumber(mobile)

  if (!phoneNumber) return ''

  switch (type) {
    case 'formatInternational':
      return phoneNumber.formatInternational()
    case 'formatNational':
      return phoneNumber.formatNational()
    case 'getURI':
      return phoneNumber.getURI()
    case 'formatUSPhone':
      if (phoneNumber.countryCallingCode === COUNTRY_CALLING_CODE_OF_US) {
        return phoneNumber.formatNational().replace(/\s+/g, '')
      } else {
        return phoneNumber.formatInternational()
      }
    default:
      return phoneNumber.formatInternational().replace(/^(\+\d+)/, '($1)')
  }
}

/**
 * Remove white space between phone number which received from InputPhone(based on mui-tel-input)
 * @example formatPhoneNumberPayload('+1 234 456 7890') => '+12344567890'
 * @param phoneNumber
 * @returns
 */
export const formatPhoneNumberPayload = (phoneNumber: string) => phoneNumber.replace(/\s/g, '')
