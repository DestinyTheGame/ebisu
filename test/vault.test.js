const Character = require('ebisu/character');
const parser = require('ebisu/sources/csv');
const { describe, it } = require('mocha');
const Vault = require('ebisu/vault');
const assume = require('assume');
const path = require('path');
const fs = require('fs');

describe('Vault', function () {
  const fixture = path.join(__dirname, 'fixtures', 'destinyArmor.csv');
  const contents = fs.readFileSync(fixture, 'utf-8');
  let characters;
  let vault;

  before(async function () {
    characters = await parser(contents);
    vault = new Vault(characters);
  });

  it('lists all characters', function () {
    assume(vault.chars).is.a('object');
    assume(vault.chars).is.length(3);

    assume(vault.chars.titan).is.instanceof(Character);
    assume(vault.chars.warlock).is.instanceof(Character);
    assume(vault.chars.hunter).is.instanceof(Character);
  });

  it('correctly assigns all meta data', function () {
    assume(vault.chars.titan).is.instanceof(Character);
    assume(vault.chars.titan.char).equals('titan');
  });

  ['metrics', 'filter', 'focus'].forEach(function each(method) {
    describe(`#${method}`, function () {
      it('retrieves literally all the ${method}, all of them', function () {
        const data = vault[method]();

        assume(data).is.a('object');

        assume(data.titan).is.a('object');
        assume(data.hunter).is.a('object');
        assume(data.warlock).is.a('object');

        assume(data.titan).deep.equals(vault.chars.titan[method]());
        assume(data.hunter).deep.equals(vault.chars.hunter[method]());
        assume(data.warlock).deep.equals(vault.chars.warlock[method]());
      });
    });
  })
});
