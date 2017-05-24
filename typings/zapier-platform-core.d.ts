declare module 'zapier-platform-core' {
  export var version: string // tslint:disable-line no-var-keyword
}

type Z = {
  request: () => Promise<{ status: number, content: string }>,
  console: { log: () => void },
  JSON: {
    stringify: (o: object) => string,
    parse: (s: string) => object
  }
};

type Bundle = {
  authData: {
    token: string,
    workspaceId: string,
    nodeId: string
  },
  inputData?: object
};

type App = {
  version: string,
  platformVersion: string,
  authentication: {
    type: 'custom',
    test: {
      url: string
    },
    fields: {
      key: string,
      type: string,
      required: boolean,
      helpText: string
    }[],
    sessionConfig: {
      perform: (z: Z, bundle: Bundle) => Promise<{sessionKey: string}>;
    }
  },
  beforeRequest: Array<any>,
  afterResponse: Array<any>,
  resources: object,
  triggers: object,
  searches: object,
  creates: object,
};
