/**
 * <auto-generated>
 * Code generated by luis:generate:ts
 * Tool github: https://github.com/microsoft/botframework-cli
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 * </auto-generated>
 */
import {DateTimeSpec, GeographyV2, InstanceData, IntentData, NumberWithUnits, OrdinalV2} from 'botbuilder-ai'

export interface GeneratedIntents {
  Cancel: IntentData
  Delivery: IntentData
  EntityTests: IntentData
  Greeting: IntentData
  Help: IntentData
  None: IntentData
  Roles: IntentData
  search: IntentData
  SpecifyName: IntentData
  Travel: IntentData
  Weather_GetForecast: IntentData
}

export interface GeneratedInstanceAddress {
  Destination?: InstanceData[]
  Source?: InstanceData[]
  number?: InstanceData[]
  State?: InstanceData[]
}
export interface Address {
  Destination?: string[]
  Source?: string[]
  number?: number[]
  State?: string[]
  $instance?: GeneratedInstanceAddress
}

export interface GeneratedInstanceComposite1 {
  age?: InstanceData[]
  datetime?: InstanceData[]
  dimension?: InstanceData[]
  email?: InstanceData[]
  money?: InstanceData[]
  number?: InstanceData[]
  ordinal?: InstanceData[]
  percentage?: InstanceData[]
  phonenumber?: InstanceData[]
  temperature?: InstanceData[]
}
export interface Composite1 {
  age?: NumberWithUnits[]
  datetime?: DateTimeSpec[]
  dimension?: NumberWithUnits[]
  email?: string[]
  money?: NumberWithUnits[]
  number?: number[]
  ordinal?: number[]
  percentage?: number[]
  phonenumber?: string[]
  temperature?: NumberWithUnits[]
  $instance?: GeneratedInstanceComposite1
}

export interface GeneratedInstanceComposite2 {
  Airline?: InstanceData[]
  City?: InstanceData[]
  url?: InstanceData[]
  From?: InstanceData[]
  To?: InstanceData[]
  Weather_Location?: InstanceData[]
}
export interface Composite2 {
  Airline?: string[][]
  City?: string[]
  url?: string[]
  From?: string[]
  To?: string[]
  Weather_Location?: string[]
  $instance?: GeneratedInstanceComposite2
}

export interface GeneratedInstance {
  Address?: InstanceData[]
  Airline?: InstanceData[]
  Buyer?: InstanceData[]
  City?: InstanceData[]
  Composite1?: InstanceData[]
  Composite2?: InstanceData[]
  Destination?: InstanceData[]
  From?: InstanceData[]
  Name?: InstanceData[]
  Part?: InstanceData[]
  Seller?: InstanceData[]
  Source?: InstanceData[]
  State?: InstanceData[]
  To?: InstanceData[]
  Weather_Location?: InstanceData[]
  a?: InstanceData[]
  age?: InstanceData[]
  arrive?: InstanceData[]
  b?: InstanceData[]
  begin?: InstanceData[]
  buy?: InstanceData[]
  child?: InstanceData[]
  datetime?: InstanceData[]
  destination?: InstanceData[]
  dimension?: InstanceData[]
  email?: InstanceData[]
  end?: InstanceData[]
  endloc?: InstanceData[]
  endpos?: InstanceData[]
  extra?: InstanceData[]
  from?: InstanceData[]
  geographyV2?: InstanceData[]
  leave?: InstanceData[]
  length?: InstanceData[]
  likee?: InstanceData[]
  liker?: InstanceData[]
  max?: InstanceData[]
  maximum?: InstanceData[]
  min?: InstanceData[]
  minimum?: InstanceData[]
  money?: InstanceData[]
  newPhone?: InstanceData[]
  number?: InstanceData[]
  old?: InstanceData[]
  oldURL?: InstanceData[]
  ordinal?: InstanceData[]
  ordinalV2?: InstanceData[]
  parent?: InstanceData[]
  percentage?: InstanceData[]
  person?: InstanceData[]
  personName?: InstanceData[]
  phonenumber?: InstanceData[]
  receiver?: InstanceData[]
  sell?: InstanceData[]
  sender?: InstanceData[]
  source?: InstanceData[]
  start?: InstanceData[]
  startloc?: InstanceData[]
  startpos?: InstanceData[]
  subject?: InstanceData[]
  temperature?: InstanceData[]
  to?: InstanceData[]
  url?: InstanceData[]
  width?: InstanceData[]
}

export interface GeneratedEntities {
  // Simple entities
  City?: string[]
  To?: string[]
  From?: string[]
  Name?: string[]
  likee?: string[]
  liker?: string[]
  State?: string[]
  Weather_Location?: string[]
  destination?: string[]
  source?: string[]

  // Built-in entities
  age?: NumberWithUnits[]
  begin?: string[]
  end?: string[]
  datetime?: DateTimeSpec[]
  arrive?: string[]
  leave?: string[]
  dimension?: NumberWithUnits[]
  length?: string[]
  width?: string[]
  email?: string[]
  receiver?: string[]
  sender?: string[]
  geographyV2?: GeographyV2[]
  endloc?: string[]
  startloc?: string[]
  money?: NumberWithUnits[]
  max?: string[]
  min?: string[]
  number?: number[]
  ordinal?: number[]
  start?: string[]
  ordinalV2?: OrdinalV2[]
  endpos?: string[]
  startpos?: string[]
  percentage?: number[]
  maximum?: string[]
  minimum?: string[]
  personName?: string[]
  child?: string[]
  parent?: string[]
  phonenumber?: string[]
  newPhone?: string[]
  old?: string[]
  temperature?: NumberWithUnits[]
  a?: string[]
  b?: string[]
  url?: string[]
  oldURL?: string[]

  // Lists
  Airline?: string[][]
  Buyer?: string[][]
  Seller?: string[][]

  // Regex entities
  Part?: string[]
  buy?: string[]
  sell?: string[]

  // Pattern.any
  person?: string[]
  from?: string[]
  to?: string[]
  subject?: string[]
  extra?: string[]

  // Composites
  Address?: Address[]
  Composite1?: Composite1[]
  Composite2?: Composite2[]
  $instance: GeneratedInstance
}

export interface ContosoApp {
  text: string
  alteredText?: string
  intents: GeneratedIntents
  entities: GeneratedEntities
  [propName: string]: any
}
