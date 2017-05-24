export default {
  type: 'custom',
  test: {
    url: (z, { authData: { nodeId } }) => z.request({ url: 'customers', params: { nodeId } })
  },
  fields: [
    { key: 'token', type: 'string', required: true, helpText: 'Your token.' },
    { key: 'workspaceId', type: 'string', required: true, helpText: 'Your workspace Id.' },
    { key: 'nodeId', type: 'string', required: true, helpText: 'Your node Id.' }
  ]
};
