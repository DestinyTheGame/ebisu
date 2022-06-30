const parser = require('ebisu/sources/csv');
const { describe, it } = require('mocha');
const assume = require('assume');
const path = require('path');
const fs = require('fs');

describe('Sources: CSV', function () {
  const fixture = path.join(__dirname, 'fixtures', 'destinyArmor.csv');
  const contents = fs.readFileSync(fixture, 'utf-8');

  it('is an async function', function () {
    assume(parser).is.a('asyncFunction');
  });

  it('returns an object with data for each character', async function () {
    const data = await parser(contents);

    assume(data).is.a('object');
    assume(data).is.length(3);
    assume(data['titan']).is.a('object');
    assume(data['hunter']).is.a('object');
    assume(data['warlock']).is.a('object');

    assume(data['titan'].arms).is.a('array');
    assume(data['titan'].legs).is.a('array');
    assume(data['titan'].helmet).is.a('array');
    assume(data['titan'].chest).is.a('array');
    assume(data['titan'].identity).is.a('array');

    assume(data['hunter'].arms).is.a('array');
    assume(data['hunter'].legs).is.a('array');
    assume(data['hunter'].helmet).is.a('array');
    assume(data['hunter'].chest).is.a('array');
    assume(data['hunter'].identity).is.a('array');

    assume(data['warlock'].arms).is.a('array');
    assume(data['warlock'].legs).is.a('array');
    assume(data['warlock'].helmet).is.a('array');
    assume(data['warlock'].chest).is.a('array');
    assume(data['warlock'].identity).is.a('array');
  });
});
