/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ContentType {
  STATES = 'states',
  COUNTRIES = 'countries',
  HAWAII_ISLANDS = 'hawaiiIslands',
  OWNER_GROUPS = 'ownerGroups',
  ID_TYPES = 'idTypes',
  PROGRAMS = 'programs',
  PET_COLORS = 'petColors',
  BREEDS = 'breeds',
  LABS = 'labs',
  FEE_GROUPS = 'feeGroups',
  PET_APP_STATUSES = 'petAppStatuses',
  WIZARD_STATE_STATUSES = 'wizardStateStatuses',
  CARRIERS = 'carriers',
  ARC_LOCATIONS = 'arcLocations',
  ARRIVAL_RELEASE_FEE_OVER_CODES = 'arrivalReleaseFeeOverCodes',
  DESTINATION_PORTS = 'destinationPorts',
  DISPOSITIONS = 'dispositions',
  PET_APP_DOCUMENT_RECEIVED_BYS = 'petAppDocumentReceivedBys',
  PROGRAM_TYPES = 'programTypes',
  RELEASE_CODES = 'releaseCodes',
  VET_CODES = 'vetCodes',
  INSPECTION_RESULTS = 'inspectionResults',
  ADJUSTMENT_REASON = 'adjustmentReason',
}

export enum GetContentPetSpecies {
  CANINE = 'Canine',
  FELINE = 'Feline',
}

export type Content = {
  [key: string]: ContentItem[]
}

export interface ContentItem {
  id: string
  name: string
  isDeleted: boolean
  order: number
  updatedAt: string
  species?: GetContentPetSpecies
  title?: string
  key?: string
  city?: string
  [key: string]: any
}

export interface IDestinationPortContent {
  id: string
  city: string
  name: string
  iata: string
  islandId: string
  activeAirport: boolean
  isDeleted: boolean
  order: string
}

export interface IDispositionsContent {
  id: string
  description: string
  isDeleted: boolean
  order: string
  effectiveDate: string
  expiredDate: string
}

export interface IArrivalReleaseFeeOverCodesContent {
  id: string
  description: string
  isDeleted: boolean
  order: string
  effectiveDate: string
  expiredDate: string
}

export interface IVetCodesContent {
  id: string
  description: string
  isDeleted: boolean
  order: string
  destinationPortId: string
}
