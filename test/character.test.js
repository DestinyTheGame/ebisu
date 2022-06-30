const Character = require('ebisu/character');
const parser = require('ebisu/sources/csv');
const ArmorSet = require('ebisu/armor-set');
const { describe, it } = require('mocha');
const assume = require('assume');
const path = require('path');
const fs = require('fs');

describe('Character', function () {
  const fixture = path.join(__dirname, 'fixtures', 'destinyArmor.csv');
  const contents = fs.readFileSync(fixture, 'utf-8');
  let char;

  before(async function () {
    const data = await parser(contents);
    char = new Character(data.titan, { char: 'titan' });
  });

  it('assigns the meta data', function () {
    assume(char.char).equals('titan');
  });

  it('creates the ArmorSet', function () {
    assume(char.gear).is.a('object');

    assume(char.gear.arms).is.instanceof(ArmorSet);
    assume(char.gear.legs).is.instanceof(ArmorSet);
    assume(char.gear.chest).is.instanceof(ArmorSet);
    assume(char.gear.helmet).is.instanceof(ArmorSet);
    assume(char.gear.identity).is.instanceof(ArmorSet);
  });

  describe('#metrics', function () {
    it('generates metrics about all the armor sets');
  });
});
