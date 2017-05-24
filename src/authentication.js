import newCustomer from './triggers/newCustomer';

export default {
  type: 'custom',
  test: {
    url: newCustomer.operation.perform
  },
  fields: [
    { key: 'token', type: 'string', required: true, helpText: 'Your token.' },
    { key: 'workspaceId', type: 'string', required: true, helpText: 'Your workspace Id.' },
    { key: 'nodeId', type: 'string', required: true, helpText: 'Your node Id.' }
  ]
};
