const listCustomers: TriggerFunction = (z, { authData: { nodeId } }) => {
  return z.request({ url: 'customers', params: { nodeId, sort: 'registeredAt,desc' } }).then(r => r.json.elements);
};

const newCustomer: Trigger = {
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

export default newCustomer;
