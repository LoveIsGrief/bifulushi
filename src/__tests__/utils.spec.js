describe('utils', () => {

  const utils = require('../utils');

  describe('formatString', () => {
    it('should return same string without variables', function () {
      const string = 'Farouq Nadeeb';
      expect(utils.formatString(string, {}))
          .toEqual(string);
    });

    it('should replace alphanumeric variables', function () {
      const name = 'Farouq';
      const lastName = 'Nadeeb';
      expect(utils.formatString('{name} {lastName}', {
        name, lastName,
      })).toEqual(`${name} ${lastName}`);
    });

    it('should replace kebab-case variables', function () {
      const name = 'Farouq';
      const lastName = 'Nadeeb';
      expect(utils.formatString('{name} {last-name}', {
        name, ['last-name']: lastName,
      })).toEqual(`${name} ${lastName}`);
    });

    it('should throw on non-existent variables', function () {
      const name = 'Farouq';
      const lastName = 'Nadeeb';
      expect(() => {
        utils.formatString('{name} {lastName} - born {dob}', {
          name, lastName,
        });
      }).toThrow('Cannot find variable \'dob\' in context');
    });

  });

  describe('filterByKey', () => {
    it('should create object with keys that don\'t start with a string', function () {
      expect(utils.filterByKey({
        removeThis: 'lol',
        removeThat: 'rofl',
        removeAnother: 'do eet!',
        keepMe: 'kept',
        keepThem: 'kept',
      }, (key) => !key.startsWith('remove')))
          .toEqual({
            keepMe: 'kept',
            keepThem: 'kept',
          });
    });

    it('should fail without a filter function', function () {
      expect(() => {
        utils.filterByKey({
          a: true,
          b: true,
        });
      }).toThrow('undefined is not a function');
    });

  });

  describe('matchesSavedMap', () => {
    function makeMatchesSavedMapTest(pattern, goodUrls, badUrls, matchDomainOnly = false) {

      function checkUrls(urls, {
        matchDomainOnly = false,
        shouldMatch = true,
      }) {
        const preferences = {matchDomainOnly};
        const hostMap = {host: pattern};

        for (let url of urls) {
          const prefix = shouldMatch ? 'should' : 'should not';
          it(`${prefix} match ${url}`, () => {
            expect(
                utils.matchesSavedMap(
                    url,
                    preferences,
                    hostMap
                )
            ).toBe(shouldMatch);
          });
        }

      }

      checkUrls(goodUrls, {matchDomainOnly});
      checkUrls(badUrls, {matchDomainOnly, shouldMatch: false});
    }

    const tests = require('./matchesSavedMap.config');

    for (let description in tests) {
      const prefixConfig = tests[description];
      describe(description, () => {

        for (let pattern in prefixConfig) {
          const patternConfig = prefixConfig[pattern];
          describe(pattern, () => {

            for (let testConfigName in patternConfig) {
              const testConfig = patternConfig[testConfigName];
              const matchDomainOnly = testConfigName === 'matchDomainOnly';

              describe(
                  matchDomainOnly ? 'matchDomainOnly' : 'full match',
                  () => {
                    makeMatchesSavedMapTest(
                        pattern,
                        testConfig['good'],
                        testConfig['bad'],
                        matchDomainOnly
                    );

                  }
              );
            }

          });
        }
      });
    }

  });

});
