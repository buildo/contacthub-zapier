type App = {
  version: any, // (string)
  platformVersion: any, // (string),
  authentication: Authentication,
  beforeRequest: Array<BeforeRequest>,
  afterResponse: Array<AfterResponse>,
  resources: AnyObject,
  triggers: { [key: string]: Trigger },
  searches: AnyObject,
  creates: AnyObject
};

type BeforeRequest = (request: ZRequest, z: Z, bundle: Bundle) => ZRequest;
type AfterResponse = (response: ZResponse, z: Z, bundle: Bundle) => ZResponse;

type Authentication = {
  type: 'custom',
  test: TriggerFunction,
  fields: {
    key: string,
    type: string,
    required: boolean,
    helpText: string
  }[]
};

type Trigger = {
  key: string,
  noun: string,
  display: {
    label: string,
    description: string
  },
  operation: {
    type: 'polling',
    perform: TriggerFunction
  } | {
    type: 'hook',
    perform: TriggerFunction,
    performSubscribe: () => any,
    performUnsubscribe: () => any,
    sample: AnyObject
  }
};

type TriggerFunction = (z: Z, bundle: Bundle) => Promise<Array<AnyObject>>;

type Bundle = {
  authData: {
    token: string,
    workspaceId: string,
    nodeId: string
  },
  inputData?: AnyObject
};

type Z = {
  request: (request: ZRequest) => Promise<ZResponse>,
  console: { log: () => void },
  errors: {
    HaltedError: ErrorConstructor
  },
  JSON: {
    stringify: (o: AnyObject) => string,
    parse: (s: string) => AnyObject
  }
};

type ZRequest = {
  method?: 'GET',
  url: string,
  headers?: { [key: string]: string },
  params?: { [key: string]: string }
};

type ZResponse = {
  status: number,
  json: AnyObject
};

type AnyObject = { [key: string]: any };
