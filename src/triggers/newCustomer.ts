import * as ContactHub from 'contacthub-sdk-nodejs';

const listCustomers: TriggerFunction = (z, { authData }) => {
  const ch = new ContactHub(authData);
  return ch.getCustomers({ sort: 'registeredAt', direction: 'desc' }).then(r => r.elements);
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
