const grading = require('ebisu/grading');
const { describe, it } = require('mocha');
const assume = require('assume');

describe('Armor Grading', function () {
  it('is a function', function () {
    assume(grading).is.a('function');
  });

  it('returns the assigned `quality` prop on match', function () {
    const rule = { quality: 'yep', mob: 10 };
    const map = new Map([ ['mob', 10] ]);
    const grade = grading(rule, map);

    assume(grade).is.a('string');
    assume(grade).equals('yep');
  });

  it('understands `>XX` as operator', function () {
    const rule = { quality: 'yup', mob: '>10' };

    assume(grading(rule, new Map([['mob', 10]]))).is.false();
    assume(grading(rule, new Map([['mob', 11]]))).equals('yup');
  });

  it('understands `>=XX` as operator', function () {
    const rule = { quality: 'yup', mob: '>=10' };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
    assume(grading(rule, new Map([['mob', 10]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 11]]))).equals('yup');
  });

  it('understands `<XX` as operator', function () {
    const rule = { quality: 'yup', mob: '<10' };

    assume(grading(rule, new Map([['mob', 9]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 10]]))).is.false();
    assume(grading(rule, new Map([['mob', 11]]))).is.false();
  });

  it('understands `<=XX` as operator', function () {
    const rule = { quality: 'yup', mob: '<=10' };

    assume(grading(rule, new Map([['mob', 9]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 10]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 11]]))).is.false();
  });

  it('understands `=XX` as direct match', function () {
    const rule = { quality: 'yup', mob: '=10' };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
    assume(grading(rule, new Map([['mob', 10]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 11]]))).is.false();
  });

  it('understands `XX` (number) as direct match', function () {
    const rule = { quality: 'yup', mob: 10 };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
    assume(grading(rule, new Map([['mob', 10]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 11]]))).is.false();
  });

  it('understands `XX` (string) as direct match', function () {
    const rule = { quality: 'yup', mob: '10' };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
    assume(grading(rule, new Map([['mob', 10]]))).equals('yup');
    assume(grading(rule, new Map([['mob', 11]]))).is.false();
  });

  it('gradefully handles empty strings', function () {
    const rule = { quality: 'yup', mob: '' };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
  });

  it('gradefully handles unkonwn property lookups', function () {
    const rule = { quality: 'yup', morbing: 'time' };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
  });

  it('gradefully handles missing values strings', function () {
    const rule = { quality: 'yup', mob: '>=' };

    assume(grading(rule, new Map([['mob', 9]]))).is.false();
  });
});
