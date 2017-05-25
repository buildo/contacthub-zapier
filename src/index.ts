import { version as platformVersion } from 'zapier-platform-core';
import authentication from './authentication';
import triggers from './triggers';

const { version } = require('../package.json'); // tslint:disable-line no-var-requires

const addTokenAndWorkspaceId: BeforeRequest = (request, z, bundle) => {
  return {
    ...request,
    url: `https://api.contactlab.it/hub/v1/workspaces/${bundle.authData.workspaceId}/${request.url}`,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${bundle.authData.token}`
    }
  };
};

const checkForErrors: AfterResponse = (response, z) => {
  if (response.status === 401) {
    throw new Error('You are not authorized to access ContactHub API. Please ensure your "token", "workspace_id" and "node_id" are all valid.');
  } else if (response.status >= 400) {
    throw new z.errors.HaltedError(`${response.status}: ${response.json.message}`);
  }

  return response;
};

// We can roll up all our behaviors in an App.
const App: App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version,
  platformVersion,

  authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    addTokenAndWorkspaceId
  ],

  afterResponse: [
    checkForErrors
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: triggers.reduce((acc, t) => ({ ...acc, [t.key]: t }), {}),

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

export default App;
