const zapier = require('zapier-platform-core');
const { token, workspaceId, nodeId } = require('../config.json');

const App = require('../index');
const appTester = zapier.createAppTester(App);

const authData = { token, workspaceId, nodeId };

describe('My App', () => {

  it('should authenticate', () => new Promise((resolve, reject) => {
    const bundle = {
      authData
    };

    try {
      expect(Object.keys(bundle.authData).length).toBe(App.authentication.fields.length);
      App.authentication.fields.forEach(f => expect(bundle.authData.hasOwnProperty(f.key)));
    } catch (e) {
      reject(e);
    }

    appTester(App.authentication.test, bundle)
      .then(resolve)
      .catch(reject);
  }));

  it('should load customers', () => new Promise((resolve, reject) => {
    const bundle = {
      authData
    };

    appTester(App.triggers.new_customer.operation.perform, bundle)
      .then((results) => {
        expect(results.length).toBeGreaterThan(1);

        expect(new Date(results[0].registeredAt).getTime()).toBeGreaterThan(new Date(results[1].registeredAt).getTime());

        resolve();
      })
      .catch(reject);
  }));

});
