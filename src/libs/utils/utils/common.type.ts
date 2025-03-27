/* eslint-disable @typescript-eslint/no-explicit-any */

export interface OptionType {
  label: string
  value: string
  [key: string]: any
}

export enum YesNoValue {
  YES = 'YES',
  NO = 'NO',
}

export enum FileType {
  Image = 'IMAGE',
  Document = 'DOCUMENT',
  External = 'EXTERNAL_LINK',
  EmailConfirmation = 'EMAIL_CONFIRMATION',
}

export interface UploadFileType {
  id: string
  file?: File & { path?: string }
  url?: string
  name?: string
  isExternalLink?: boolean
  type: FileType
  entityId?: string
  [key: string]: any
}

export type TableParams = {
  skip?: number
  take?: number
  order?: string
  search?: string
  sort?: string
  [key: string]: number | boolean | string | string[] | undefined
}

export enum TableParamKeyEnum {
  ROWS_PER_PAGE = 'rowsPerPage',
  PAGE = 'page',
  SEARCH = 'search',
  ORDER = 'order',
}

export type GetPropertiesParams = TableParams & {
  [key: string]: string | number | string[] | boolean
}
