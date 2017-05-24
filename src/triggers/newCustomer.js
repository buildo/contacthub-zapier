const listCustomers = (z, { authData: { nodeId } }) => {
  return z.request({ url: 'customers', params: { nodeId, sort: 'registeredAt,desc' } }).then(r => r.json.elements);
};

export default {
  // schema for triggers: https://github.com/zapier/zapier-platform-schema/blob/master/docs/build/schema.md#triggerschema
  key: 'new_customer',
  noun: 'Customer',
  display: {
    label: 'New Customer',
    description: 'Trigger when a new customer is added.'
  },
  operation: {
    type: 'polling',
    perform: listCustomers
  }
};
