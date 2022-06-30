const dedupe = require('ebisu/compare/duplicate');
const quality = require('ebisu/compare/quality');
const parser = require('ebisu/sources/csv');
const ArmorSet = require('ebisu/armor-set');
const { describe, it } = require('mocha');
const Armor = require('ebisu/armor');
const assume = require('assume');
const path = require('path');
const fs = require('fs');

describe('ArmorSet', function () {
  const fixture = path.join(__dirname, 'fixtures', 'destinyArmor.csv');
  const contents = fs.readFileSync(fixture, 'utf-8');

  let characters;
  let set;

  before(async function () {
    characters = await parser(contents);
  });

  beforeEach(function () {
    set = new ArmorSet(characters.hunter.arms, {
      char: 'hunter',
      type: 'arms'
    });
  });

  it('stores the type & character meta data', function () {
    assume(set.type).equals('arms');
    assume(set.char).equals('hunter');
  });

  describe('#focus', function () {
    it('is a function', function () {
      assume(set.focus).is.a('function');
    });

    it('returns an object that lists highest focused stat', function () {
      const stat = set.focus();

      assume(stat).is.a('object');
      assume(stat.mob).equals(5);
      assume(stat.dis).equals(10);
      assume(stat.rec).equals(13);
      assume(stat.str).equals(4);
      assume(stat.int).equals(10);
      assume(stat.res).equals(6);
    });
  });

  describe('#metrics', function () {
    it('is a function', function () {
      assume(set.metrics).is.a('function');
    });

    it('returns an object with detailed information', function () {
      const data = set.metrics();

      assume(data.size).equals(48);
      assume(data.focus).is.a('object');
      assume(data.focus).deep.equals(set.focus());

      assume(data.highest).deep.equals({ mob: 29, dis: 24, rec: 27, str: 24, int: 26, res: 28 });
      assume(data.rarity).deep.equals({ legendary: 39, exotic: 9 });
      assume(data.total).equals(67);
      assume(data.spike).deep.equals({ class: 29, ability: 26 });
      assume(data.plugs).deep.equals({ class: 35, ability: 34 });
    });
  });

  describe('#filter', function () {
    it('is a function', function () {
      assume(set.filter).is.a('function');
    });

    it('bails out early for class items with an empty array', function () {
      set = new ArmorSet(characters.hunter.identity, {
        char: 'hunter',
        type: 'identity'
      });

      const flagged = set.filter(function failsafe() {
        throw new Error('I should never be called');
      });

      assume(flagged).is.a('array');
      assume(flagged).is.length(0);
    })

    it('returns an array with results', function () {
      const flagged = set.filter();

      assume(flagged).is.a('array');
    });

    it('accepts custom compare functions', function () {
      let called = 0;

      const flagged = set.filter(function (armor) {
        called++;
        return armor;
      });

      assume(flagged).is.a('array');
      assume(flagged).is.length(set.set.size);
      assume(called).equals(set.set.size);
    });

    describe('#duplicate', function () {
      it('flags duplicate items', function () {
        set = new ArmorSet([{
            mob: 10,
            res: 2,
            rec: 14,
            int: 10,
            dis: 12,
            str: 10,
            char: 'hunter',
            rarity: 'legendary',
            type: 'arms',
            id: 'worse'
          }, {
            mob: 11,
            res: 2,
            rec: 14,
            int: 10,
            dis: 12,
            str: 10,
            char: 'hunter',
            rarity: 'legendary',
            type: 'arms',
            id: 'better'
          }
        ], { type: 'arms', char: 'hunter' });

        const flagged = set.filter(dedupe());

        assume(flagged).is.a('array');
        assume(flagged.length).is.above(0);
        assume(flagged[0].id).equals('worse');
      });

      it('can flag close duplicate items', function () {
        set = new ArmorSet([{
            mob: 10,
            res: 2,
            rec: 14,
            int: 10,
            dis: 12,
            str: 10,
            char: 'hunter',
            rarity: 'legendary',
            type: 'arms',
            id: 'worse'
          }, {
            mob: 11,
            res: 2,
            rec: 14,
            int: 10,
            dis: 12,
            str: 10,
            char: 'hunter',
            rarity: 'legendary',
            type: 'arms',
            id: 'better'
          }
        ], { type: 'arms', char: 'hunter' });

        const flagged = set.filter(dedupe(1));

        assume(flagged).is.a('array');
        assume(flagged.length).is.above(0);
        assume(flagged[0].id).equals('worse');
      });
    });

    describe('#quality', function () {
      it('returns a list of items matching', function () {
        const low = set.filter(quality({ quality: 'low' }));
        const medium = set.filter(quality({ quality: 'medium' }));
        const high = set.filter(quality({ quality: 'high' }));

        assume(low).is.above(2);
        assume(medium).is.above(2);
        assume(high).is.above(2);

        low.forEach(function (armor) {
          assume(armor.quality()).equals('low');
        });

        medium.forEach(function (armor) {
          assume(armor.quality()).equals('medium');
        });

        high.forEach(function (armor) {
          assume(armor.quality()).equals('high');
        });
      });
    });
  });
});
