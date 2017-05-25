import * as zapier from 'zapier-platform-core';
import App from '../src/index';
import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';

const { token, workspaceId, nodeId } = (fs.existsSync(path.resolve(__dirname, '../config.json'))) ?
  require('../config.json') : // tslint:disable-line no-var-requires
  { token: process.env.TOKEN, workspaceId: process.env.WORKSPACE_ID, nodeId: process.env.NODE_ID };

const appTester: (a: any, bundle: Bundle) => Promise<Array<AnyObject>> = zapier.createAppTester(App);

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
