import { getTitleCase } from '@/libs/utils'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserType {
  INSPECTOR = 'INSPECTOR',
  CARETAKER = 'CARETAKER',
  WINDOW_USER = 'WINDOW_USER',
  CHECKIN_MONITOR_INSPECTOR = 'CHECKIN_MONITOR_INSPECTOR',
  DISPENSARY = 'DISPENSARY',
  FRONT_OFFICE = 'FRONT_OFFICE',
  FINANCIAL = 'FINANCIAL',
  ADMIN = 'ADMIN',
  PET_OWNER = 'PET_OWNER',
  CONTRACTOR = 'CONTRACTOR',
}

export const SYSTEM_EMAIL = 'ais_system@ais.hawaii.gov'

export const WINDOW_USER_NUMBER_LENGTH = 3

export const userStatusOptions = [
  {
    label: getTitleCase(UserStatus.ACTIVE),
    value: UserStatus.ACTIVE,
  },
  {
    label: getTitleCase(UserStatus.INACTIVE),
    value: UserStatus.INACTIVE,
  },
]

export const userTypeOptions = [
  {
    label: getTitleCase(UserType.INSPECTOR),
    value: UserType.INSPECTOR,
  },
  {
    label: getTitleCase(UserType.CARETAKER),
    value: UserType.CARETAKER,
  },
  {
    label: getTitleCase(UserType.WINDOW_USER),
    value: UserType.WINDOW_USER,
  },
  {
    label: getTitleCase(UserType.CHECKIN_MONITOR_INSPECTOR),
    value: UserType.CHECKIN_MONITOR_INSPECTOR,
  },
  {
    label: getTitleCase(UserType.DISPENSARY),
    value: UserType.DISPENSARY,
  },
  {
    label: getTitleCase(UserType.FRONT_OFFICE),
    value: UserType.FRONT_OFFICE,
  },
  {
    label: getTitleCase(UserType.FINANCIAL),
    value: UserType.FINANCIAL,
  },
  {
    label: getTitleCase(UserType.ADMIN),
    value: UserType.ADMIN,
  },
  {
    label: getTitleCase(UserType.PET_OWNER),
    value: UserType.PET_OWNER,
  },
  {
    label: getTitleCase(UserType.CONTRACTOR),
    value: UserType.CONTRACTOR,
  },
]

export interface MyRole {
  id: string
  name: string
  displayName: string
  description: string
  userCount: number
  createdAt: string
  updatedAt: string
  canBeDeleted: boolean
  canBeUpdated: boolean
  isRoleDefault: boolean
}
