const getSessionKey = (z, bundle) => {
  return Promise.resolve({ ...bundle.authData });
};

export default {
  type: 'custom',
  // "test" could also be a function
  test: {
    url: 'https://example.com/api/accounts/me.json'
  },
  fields: [
    { key: 'token', type: 'string', required: true, helpText: 'Your token.' },
    { key: 'workspaceId', type: 'string', required: true, helpText: 'Your workspace Id.' },
    { key: 'nodeId', type: 'string', required: true, helpText: 'Your node Id.' }
  ],
  sessionConfig: {
    perform: getSessionKey
  }
};

// const includeSessionKeyHeader = (request, z, bundle) => {
//   if (bundle.authData.sessionKey) {
//     request.headers = request.headers || {};
//     request.headers['X-Session-Key'] = bundle.authData.sessionKey;
//   }
//   return request;
// };
//
// const sessionRefreshIf401 = (response, z, bundle) => {
//   if (bundle.authData.sessionKey) {
//     if (response.status === 401) {
//       throw new z.errors.RefreshAuthError(); // ask for a refresh & retry
//     }
//   }
//   return response;
// };
