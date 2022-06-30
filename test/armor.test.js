const { describe, it } = require('mocha');
const Armor = require('ebisu/armor');
const assume = require('assume');

describe('Armor', function () {
  const fixture = {
    mob: 10,
    res: 2,
    rec: 19,
    int: 6,
    dis: 16,
    str: 5
  };

  it('calculates the total', function () {
    const armor = new Armor({ ...fixture });

    assume(armor.total).is.a('number');
    assume(armor.total).equals(58);
  });

  it('defaults everything to 2', function () {
    const armor = new Armor();

    assume(armor.total).equals(12);
  })

  describe('#stats', function () {
    it('is a function', function () {
      const armor = new Armor({ ...fixture });

      assume(armor.stats).is.a('function');
    })

    it('returns a sorted array of stats', function () {
      const armor = new Armor({ ...fixture });
      const stats = armor.stats();

      assume(stats).is.a('array');
      assume(stats).is.length(6);

      stats.forEach(function (stat) {
        assume(stat).is.a('object');
        assume(stat.value).is.a('number');
        assume(stat.stat).is.a('string');
      });

      assume(stats[0]).deep.equals({ value: 19, stat: 'rec' });
      assume(stats[1]).deep.equals({ value: 16, stat: 'dis' });
      assume(stats[2]).deep.equals({ value: 10, stat: 'mob' });
      assume(stats[3]).deep.equals({ value: 6, stat: 'int' });
      assume(stats[4]).deep.equals({ value: 5, stat: 'str' });
      assume(stats[5]).deep.equals({ value: 2, stat: 'res' });
    });
  });

  describe('#highest', function () {
    it('is a function', function () {
      const armor = new Armor({ ...fixture });

      assume(armor.highest).is.a('function');
    });

    it('returns the highest stat of the armor', function () {
      const armor = new Armor({ ...fixture });
      const highest = armor.highest();

      assume(highest).is.a('object');
      assume(highest.value).equals(19);
      assume(highest.stat).equals('rec');
    });
  });

  describe('#quality', function () {
    it('is a function', function () {
      const armor = new Armor({ ...fixture });

      assume(armor.quality).is.a('function');
    });

    it('returns "low" for 50 stat armor', function () {
      const armor = new Armor({ mob: 8, res: 10, rec: 8, int: 10, dis: 8, str: 8 });

      assume(armor.total).equals(52);
      assume(armor.quality()).equals('low');
    });

    it('returns "high" for 68 stat armor', function () {
      const armor = new Armor({ mob: 7, res: 7, rec: 22, int: 10, dis: 6, str: 16 });

      assume(armor.total).equals(68);
      assume(armor.quality()).equals('high');
    });

    it('returns "high" for double 20 stat armor on ', function () {
      const armor = new Armor({ mob: 10, res: 20, rec: 2, int: 9, dis: 2, str: 20 });

      assume(armor.total).equals(63);
      assume(armor.quality()).equals('high');
    });

    it('returns "medium" for double 20 stats on low 60 armor', function () {
      const armor = new Armor({ mob: 2, res: 2, rec: 28, int: 6, dis: 21, str: 2 });

      assume(armor.total).equals(61);
      assume(armor.quality()).equals('medium');
    });

    it('supports custom rules', function () {
      const armor = new Armor({ mob: 2, res: 2, rec: 28, int: 6, dis: 21, str: 2 });
      const rules = [
        { rec: '>=30', quality: 'epic', int: 6 },
        { mob: '<25', quality: 'fail', str: '=4' },
        { mob: '<25', quality: 'yolo' }
      ];

      assume(armor.total).equals(61);
      assume(armor.quality(rules)).equals('yolo');
    });

    it('returns low when no rules match', function () {
      const armor = new Armor({ mob: 2, res: 2, rec: 28, int: 6, dis: 21, str: 2 });

      assume(armor.total).equals(61);
      assume(armor.quality([])).equals('low');
    });
  });
});
