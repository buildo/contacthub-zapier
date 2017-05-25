
type Auth = {
  token: string,
  workspaceId: string,
  nodeId: string
};

// Query

type AtomicConditionOperator =
  'EQUALS' |
  'NOT_EQUALS' |
  'BETWEEN' |
  'GTE' |
  'GT' |
  'LTE' |
  'LT' |
  'IS_NULL' |
  'IS_NOT_NULL' |
  'IN' |
  'NOT_IN';

type AtomicCondition = {
  type: string, // pattern ^atomic$
  attribute: string,
  operator: AtomicConditionOperator,
  value: any
};

type CompositeConditionConjunction = 'and' | 'or';
type CompositeCondition = {
  type: string, // pattern ^composite$
  conjunction: CompositeConditionConjunction,
  conditions: Array<AtomicCondition | CompositeCondition>
};

type SimpleQuery = {
  type: string, // pattern ^simple$
  are: {
    condition: AtomicCondition | CompositeCondition
  },
  did?: {
    event: {
      name: string
    },
    condition: AtomicCondition | CompositeCondition,
    timeframe: AtomicCondition | CompositeCondition
  }
};

type CombinedQueryConjunction = 'INTERSECT' | 'UNION' | 'EXCEPT';

type CombinedQuery = {
  type: string, // pattern ^combined$
  conjunction: CombinedQueryConjunction,
  queries: Array<SimpleQuery | CombinedQuery>
};

type Query = {
  name: string,
  query: SimpleQuery | CombinedQuery
};

type GetCustomersOptions = {
  externalId?: string,
  query?: Query,
  fields?: Array<string>,
  sort?: string,
  direction?: 'asc' | 'desc',
  page?: number
};

// SDK Customer

type Tags = {
  auto: Array<string>,
  manual: Array<string>
};

type OtherContact = {
  name?: string,
  type?: 'MOBILE' | 'PHONE' | 'EMAIL' | 'FAX' | 'OTHER',
  value?: string
};

type MobileDeviceType = 'IOS' | 'ANDROID' | 'WINDOWS_PHONE' | 'FIREOS';
type MobileDeviceNotificationCenter = 'APN' | 'GCM' | 'WNS' | 'ADM' | 'SNS';

type MobileDevice = {
  appId: string,
  identifier?: string,
  name?: string,
  type?: MobileDeviceType,
  notificationService: MobileDeviceNotificationCenter
};

type Contacts = {
  email?: string,
  fax?: string,
  mobilePhone?: string,
  phone?: string,
  otherContacts?: Array<OtherContact>,
  mobileDevices?: Array<MobileDevice>
};

type Geo = {
  lat: number,
  lon: number
};

type Address = {
  street?: string,
  city?: string,
  country?: string,
  province?: string,
  zip?: string,
  geo?: Geo
};

type Credential = {
  username?: string,
  password?: string
};

type Education = {
  id: string,
  schoolType?: 'PRIMARY_SCHOOL' | 'SECONDARY_SCHOOL' | 'HIGH_SCHOOL' | 'COLLEGE' | 'OTHER',
  schoolName?: string,
  schoolConcentration?: string,
  startYear?: number,
  endYear?: number,
  isCurrent?: boolean
};

type Job = {
  id: string,
  companyIndustry?: string,
  companyName?: string,
  jobTitle?: string,
  startDate?: Date,
  endDate?: Date,
  isCurrent?: boolean
};

type Like = {
  id: string,
  category?: string,
  name?: string,
  createdTime?: Date
};

type Social = {
  facebook?: string,
  google?: string,
  instagram?: string,
  linkedin?: string,
  qzone?: string,
  twitter?: string
};

type Preference = {
  key: string,
  value: string
};

type Subscription = {
  id: string,
  name?: string,
  type?: string,
  kind?: 'DIGITAL_MESSAGE' | 'SERVICE' | 'OTHER',
  subscribed?: boolean,
  startDate?: Date,
  endDate?: Date,
  subscriberId?: string,
  registeredAt?: Date,
  updatedAt?: Date,
  preferences?: Array<Preference>
};

type BaseProperties = {
  pictureUrl?: string,
  title?: string,
  prefix?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string,
  gender?: string,
  dob?: Date,
  locale?: string,
  timezone?: string,
  contacts?: Contacts,
  address?: Address,
  credential?: Credential,
  educations?: Array<Education>,
  likes?: Array<Like>,
  socialProfile?: Social,
  jobs?: Array<Job>,
  subscriptions?: Array<Subscription>
};

type CustomerData = {
  externalId?: string,
  base?: BaseProperties,
  extended?: Object,
  extra?: string,
  tags?: Tags
};

type Customer = CustomerData & {
  id: string,
  registeredAt: Date,
  updatedAt: Date
};

type EventType =
  'abandonedCart' |
  'addedCompare' |
  'addedProduct' |
  'addedWishlist' |
  'campaignBlacklisted' |
  'campaignBounced' |
  'campaignLinkClicked' |
  'campaignMarkedSpam' |
  'campaignOpened' |
  'campaignSent' |
  'campaignSubscribed' |
  'campaignUnsubscribed' |
  'changedSetting' |
  'clickedLink' |
  'closedTicket' |
  'completedOrder' |
  'eventConfirmed' |
  'eventDeclined' |
  'eventEligible' |
  'eventInvited' |
  'eventNotShow' |
  'eventNotInvited' |
  'eventParticipated' |
  'formCompiled' |
  'genericActiveEvent' |
  'genericPassiveEvent' |
  'loggedIn' |
  'loggedOut' |
  'openedTicket' |
  'orderShipped' |
  'removedCompare' |
  'removedProduct' |
  'removedWishlist' |
  'repliedTicket' |
  'reviewedProduct' |
  'searched' |
  'serviceSubscribed' |
  'serviceUnsubscribed' |
  'viewedPage' |
  'viewedProduct' |
  'viewedProductCategory';

type EventContext =
  'CONTACT_CENTER' |
  'DIGITAL_CAMPAIGN' |
  'ECOMMERCE' |
  'IOT' |
  'MOBILE' |
  'OTHER' |
  'RETAIL' |
  'SOCIAL' |
  'WEB';

type EventData = {
  customerId?: string,
  externalId?: string,
  sessionId?: string,
  type: EventType,
  context: EventContext,
  properties: Object,
  contextInfo?: Object,
  date?: Date
};

type ContactHubEvent = EventData & {
  id: string,
  registeredAt: Date
};

// API Customer

type APIMobileDevice = {
  appId: string,
  identifier?: string,
  name?: string,
  type?: MobileDeviceType,
  notificationCenter?: MobileDeviceNotificationCenter
};

type APIContacts = {
  email?: string,
  fax?: string,
  mobilePhone?: string,
  phone?: string,
  otherContacts: Array<OtherContact>,
  mobileDevices: Array<APIMobileDevice>
};

type APIAddress = {
  street?: string,
  city?: string,
  country?: string,
  province?: string,
  zip?: string,
  geo?: Geo
};

type APICredential = {
  username: string,
  password: string
};

type APIEducation = {
  id: string,
  schoolType: null | 'PRIMARY_SCHOOL' | 'SECONDARY_SCHOOL' | 'HIGH_SCHOOL' | 'COLLEGE' | 'OTHER',
  schoolName?: string,
  schoolConcentration?: string,
  startYear?: number,
  endYear?: number,
  isCurrent?: boolean
};

type APILike = {
  id: string,
  category?: string,
  name?: string,
  createdTime: string
};

type APISocial = {
  facebook?: string,
  google?: string,
  instagram?: string,
  linkedin?: string,
  qzone?: string,
  twitter?: string
};

type APIJob = {
  id: string,
  companyIndustry?: string,
  companyName?: string,
  jobTitle?: string,
  startDate?: string,
  endDate?: string,
  isCurrent?: boolean
};

type APISubscription = {
  id: string,
  name?: string,
  type?: string,
  kind: null | 'DIGITAL_MESSAGE' | 'SERVICE' | 'OTHER',
  subscribed?: boolean,
  startDate?: string,
  endDate?: string,
  subscriberId?: string,
  registeredAt?: string,
  updatedAt?: string,
  preferences: Array<Preference>
};

type APIBaseProperties = {
  pictureUrl?: string,
  title?: string,
  prefix?: string,
  firstName?: string,
  lastName?: string,
  middleName?: string,
  gender?: string,
  dob?: string,
  locale?: string,
  timezone?: string,
  contacts?: APIContacts,
  address?: APIAddress,
  credential?: APICredential,
  educations: Array<APIEducation>,
  likes: Array<APILike>,
  socialProfile: APISocial,
  jobs: Array<APIJob>,
  subscriptions: Array<APISubscription>
};

type APICustomerData = {
  externalId?: string,
  extra?: string,
  base?: APIBaseProperties,
  extended?: Object,
  tags?: Tags
};

type APICustomer = APICustomerData & {
  id: string,
  nodeId: string,
  enabled: boolean,
  registeredAt: string,
  updatedAt: string
};

type EventFilters = {
  type?: EventType,
  context?: EventContext,
  mode?: 'ACTIVE' | 'PASSIVE',
  dateFrom?: Date,
  dateTo?: Date,
  page?: number
};

type Paginated<T> = {
  page: {
    current: number,
    total: number,
    prev?: () => Promise<Paginated<T>>,
    next?: () => Promise<Paginated<T>>
  },
  elements: Array<T>
};

declare class ContactHub {
  constructor(params: Auth)

  createSessionId(): string;

  addCustomerSession(customerId: string, sessionId: string): Promise<boolean>;

  addCustomer(customerData: CustomerData): Promise<Customer>;

  getCustomer(customerId: string): Promise<Customer>;

  getCustomers(options?: GetCustomersOptions): Promise<Paginated<Customer>>;

  updateCustomer(customerId: string, customerData: CustomerData): Promise<Customer>;

  patchCustomer(customerId: string, customerData: CustomerData): Promise<Customer>;

  deleteCustomer(customerId: string): Promise<boolean>;

  addEducation(customerId: string, education: Education): Promise<Education>;

  updateEducation(customerId: string, education: Education): Promise<Education>;

  deleteEducation(customerId: string, educationId: string): Promise<boolean>;

  addJob(customerId: string, job: Job): Promise<Job>;

  updateJob(customerId: string, job: Job): Promise<Job> ;

  deleteJob(customerId: string, jobId: string): Promise<boolean>;

  addLike(customerId: string, like: Like): Promise<Like>;

  updateLike(customerId: string, like: Like): Promise<Like>;

  deleteLike(customerId: string, likeId: string): Promise<boolean>;

  addEvent(event: EventData): Promise<boolean>;

  getEvent(eventId: string): Promise<ContactHubEvent>;

  getEvents(customerId: string, filters?: EventFilters): Promise<Paginated<ContactHubEvent>>;

  addTag(customerId: string, tag: string): Promise<Customer>;

  removeTag(customerId: string, tag: string): Promise<Customer>;

  createQuery(attribute: string, operator: AtomicConditionOperator, value?: any): Query;
}

declare module 'contacthub-sdk-nodejs' {
  export = ContactHub;
  namespace ContactHub {}
}
