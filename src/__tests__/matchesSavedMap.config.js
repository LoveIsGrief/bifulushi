/**
 * From this the tests for `utils.matcheSavedMap` will be generated
 *
 * see matchesSavedMap.schema.json for the structure definition
 */

module.exports = {
  'regex prefix': {
    '@duckduckgo\\.com': {
      fullMatch: {
        good: [
          'https://duckduckgo.com',
          'https://duckduckgo.com/search?q=something',
          'https://google.com/search?q=duckduckgo.com',
        ],
        bad: [
          'https://google.com/search?q=something',
        ],
      },
      matchDomainOnly: {
        good: [
          'https://duckduckgo.com',
          'https://duckduckgo.com/search?q=something',
        ],
        bad: [
          'https://google.com/search?q=duckduckgo.com',
        ],
      },
    },
    '@[^.]+\\.duckduckgo\\.com': {
      fullMatch: {
        good: [
          'https://subdomain.duckduckgo.com',
          'https://subdomain.duckduckgo.com/search?q=something',
          'https://google.com/search?q=subdomain.duckduckgo.com',
        ],
        bad: [
          'https://duckduckgo.com',
          'https://duckduckgo.com/search?q=something',
          'https://google.com/search?q=duckduckgo.com',
          'https://google.com/search?q=something',
        ],
      },
      matchDomainOnly: {
        good: [],
        bad: [
          'https://duckduckgo.com',
          'https://duckduckgo.com/search?q=something',
          'https://google.com/search?q=duckduckgo.com',
        ],
      },
    },
  },
  'glob prefix': {
    '!https://duckduckgo.com': {
      fullMatch: {
        good: [
          'https://duckduckgo.com',
        ],
        bad: [
          'https://subdomain.duckduckgo.com',
          'https://not.duckduckgo.com.evil.com',
          'https://google.com',
          'https://google.com/search?q=duckduckgo.com',
        ],
      },
      matchDomainOnly: {
        // This type of glob won't work in this mode
        good: [],
        bad: [
          'https://duckduckgo.com',
        ],
      },
    },
    '!duckduckgo.com': {
      fullMatch: {
        // This type of glob won't work in this mode
        good: [],
        bad: [
          'https://duckduckgo.com',
          'https://subdomain.duckduckgo.com',
          'https://not.duckduckgo.com.evil.com',
          'https://google.com',
          'https://google.com/search?q=duckduckgo.com',
        ],
      },
      matchDomainOnly: {
        good: [
          'https://duckduckgo.com',
        ],
        bad: [],
      },
    },
    '!*.duckduckgo.com': {
      fullMatch: {
        good: [
          'https://subdomain.duckduckgo.com',
        ],
        bad: [
          'https://duckduckgo.com',
          'https://not.duckduckgo.com.evil.com',
          'https://google.com',
          'https://google.com/search?q=duckduckgo.com',
        ],
      },
      matchDomainOnly: {
        good: [
          'https://subdomain.duckduckgo.com',
        ],
        bad: [
          'https://duckduckgo.com',
          'https://not.duckduckgo.com.evil.com',
        ],
      },
    },
  },
};
