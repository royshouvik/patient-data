'use strict';

module.exports = function(Provider) {
  Provider.disableRemoteMethodByName('find');

  Provider.customFind = function(filter,
    maxDischarges,
    minDischarges,
    maxAvgCoveredCharges,
    minAvgCoveredCharges,
    maxAvgMedicarePayments,
    minAvgMedicarePayments,
    state,
    cb) {
    // Set default for unspecified params
    maxDischarges = maxDischarges || Infinity;
    minDischarges = minDischarges || 0;
    maxAvgCoveredCharges = maxAvgCoveredCharges || Infinity;
    minAvgCoveredCharges = minAvgCoveredCharges || 0;
    maxAvgMedicarePayments = maxAvgMedicarePayments || Infinity;
    minAvgMedicarePayments = minAvgMedicarePayments || 0;

    const defaultIncludedFields = {
      drugDefinition: false,
      providerId: false,
      id: true,
      providerName: true,
      providerStreetAddress: true,
      providerCity: true,
      providerState: true,
      providerZipCode: true,
      hospitalReferralRegionDescription: true,
      totalDischarges: true,
      averageCoveredCharges: true,
      averageTotalPayments: true,
      averageMedicarePayments: true,
    };
    // if fields is specified than use that but always include id
    const fields = filter && filter.fields ? Object.assign(
      {},
      filter.fields,
      {id: true}
    ) : defaultIncludedFields;
    const customFilter = {
      fields,
      where: {
        providerState: state,
        totalDischarges: {
          between: [minDischarges, maxDischarges],
        },
        averageCoveredCharges: {
          between: [minAvgCoveredCharges, maxAvgCoveredCharges],
        },
        averageMedicarePayments: {
          between: [minAvgMedicarePayments, maxAvgMedicarePayments],
        },
      },
    };
    const updatedFilter = Object.assign({}, filter, customFilter);
    return this.find(updatedFilter, cb);
  };

  Provider.remoteMethod('customFind', {
    // copy metadata from loopback/lib/persisted-model.js
    description:
      'Find all instances of the model matched by filter from the data source.',
    accessType:
      'READ',
    accepts: [
      {
        arg: 'filter',
        type: 'object',
        description:
          'Filter defining fields, where, include, order, offset, and limit',
      },
      // add extra custom query params
      {
        arg: 'max_discharges',
        type: 'number',
        description: 'The maximum number of Total Discharges',
      },
      {
        arg: 'min_discharges',
        type: 'number',
        description: 'The minimum number of Total Discharges',
      },
      {
        arg: 'max_average_covered_charges',
        type: 'number',
        description: 'The maximum Average Covered Charges',
      },
      {
        arg: 'min_average_covered_charges',
        type: 'number',
        description: 'The minimum Average Covered Charges',
      },
      {
        arg: 'max_average_medicare_payments',
        type: 'number',
        description: 'The maximum Average Medicare Payment',
      },
      {
        arg: 'min_average_medicare_payments',
        type: 'number',
        description: 'The minimum Average Medicare Payment',
      },
      {
        arg: 'state',
        type: 'string',
        description: 'The exact state that the provider is from',
      },
    ],
    returns: {
      arg: 'data',
      type: [Provider],
      root: true,
    },
    http: {
      verb: 'get',
      path: '/',
    },
  });
};
