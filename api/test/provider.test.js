'use strict';

var should = require('should');
var supertest = require('supertest');
var fixture = require('./fixture');

describe('GET /provider', () => {
  var server = require('../server/server');
  var request = supertest(server);

  var Provider;

  before((done) => {
    Provider = server.models.Provider;
    Provider.create(fixture, done);
  });

  describe('data filter', () => {
    it('returns all records if no criteria is specified', (done) => {
      request.get('/api/Providers')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        (res.body.length).should.be.exactly(20);
        done();
      });
    });
    it('returns only matching records when filtered on state', (done) => {
      request.get('/api/Providers?state=MN')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        (res.body.length).should.be.exactly(2);
        res.body.should.matchEvery(
          (value) => value.should.have.property('providerState', 'MN')
        );
        done();
      });
    });
    it('returns all records whithin (min. max.inclusive) filtered range',
    (done) => {
      request.get('/api/Providers?max_discharges=15&min_discharges=12')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        (res.body.length).should.be.exactly(7);
        done();
      });
    });
  });
  describe('field filter', () => {
    it('returns all fields if no filter is specified', (done) => {
      request.get('/api/Providers')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.matchEvery(
          (value) => value.should.have.keys(
            'providerName',
            'providerStreetAddress',
            'providerCity',
            'providerState',
            'providerZipCode',
            'hospitalReferralRegionDescription',
            'totalDischarges',
            'averageCoveredCharges',
            'averageTotalPayments',
            'averageMedicarePayments',
            'id'
          )
        );
        done();
      });
    });
    it('returns selected fields if filter is specified', (done) => {
      request.get('/api/Providers?filter={"fields":{"providerState":true, "providerName":true}}') // eslint-disable-line max-len
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.matchEvery(
          (value) => value.should.have.keys(
            'id', 'providerState', 'providerName'
          )
        );
        res.body.should.matchEvery(
          (value) => value.should.not.have.keys(
              'providerStreetAddress',
              'providerCity',
              'providerZipCode',
              'hospitalReferralRegionDescription',
              'totalDischarges',
              'averageCoveredCharges',
              'averageTotalPayments',
              'averageMedicarePayments'
          )
        );
        done();
      });
    });
    it('returns id field if no field is selected', (done) => {
      request.get('/api/Providers?filter={"fields":{}}') // eslint-disable-line max-len
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.matchEvery(
          (value) => value.should.have.keys(
            'id'
          )
        );
        res.body.should.matchEvery(
          (value) => value.should.not.have.keys(
              'providerName',
              'providerState',
              'providerStreetAddress',
              'providerCity',
              'providerZipCode',
              'hospitalReferralRegionDescription',
              'totalDischarges',
              'averageCoveredCharges',
              'averageTotalPayments',
              'averageMedicarePayments'
          )
        );
        done();
      });
    });
  });
});
