import { version as platformVersion } from 'zapier-platform-core';
import authentication from './authentication';
import triggers from './triggers';

const { version } = require('../package.json'); // tslint:disable-line no-var-requires

const addTokenAndWorkspaceId = (request, z, bundle) => {
  return {
    ...request,
    url: `https://api.contactlab.it/hub/v1/workspaces/${bundle.authData.workspaceId}/${request.url}`,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${bundle.authData.token}`
    }
  };
};

// We can roll up all our behaviors in an App.
const App = {
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
