import React from 'react';
import renderer from 'react-test-renderer';

import { App } from './App';
const mockData = [
  {
    "providerName": "GWINNETT MEDICAL CENTER",
    "providerStreetAddress": "1000 MEDICAL CENTER BOULEVARD",
    "providerCity": "LAWRENCEVILLE",
    "providerState": "GA",
    "providerZipCode": 30045,
    "hospitalReferralRegionDescription": "GA - Atlanta",
    "totalDischarges": 104,
    "averageCoveredCharges": 18536.7,
    "averageTotalPayments": 4679.72,
    "averageMedicarePayments": 3452.18,
    "id": "1"
  },
  {
    "providerName": "HENRY MEDICAL CENTER, INC",
    "providerStreetAddress": "1133 EAGLE'S LANDING PARKWAY",
    "providerCity": "STOCKBRIDGE",
    "providerState": "GA",
    "providerZipCode": 30281,
    "hospitalReferralRegionDescription": "GA - Atlanta",
    "totalDischarges": 105,
    "averageCoveredCharges": 25179.04,
    "averageTotalPayments": 9595.65,
    "averageMedicarePayments": 8874.49,
    "id": "2"
  }
];
describe('App', () => {
  it('renders correctly on landing', () => {
    const tree = renderer.create(
      <App data={[]} getProviders={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly while fetching data', () => {
    const tree = renderer.create(
      <App data={[]} getProviders={jest.fn()} isFetching />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly if no data is fetched', () => {
    const tree = renderer.create(
      <App data={[]} getProviders={jest.fn()} isEmpty />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with data', () => {
    const tree = renderer.create(
      <App data={mockData} getProviders={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
