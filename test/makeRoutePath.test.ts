import { makeRoutePath } from '../src';

// path, pathResult
type PathScenario = [string, string];
// path, pathResult, params, compileResult
type ParamsScenario = [string, string, Record<string, any>, string];
// path, pathResult, params, queryParams, compileResult
type QueryStringScenario = [
  string,
  string,
  Record<string, any>,
  Record<string, any>,
  string
];
// any path, result
type UnexpectedScenario = [any];

const PATH_SCENARIOS: PathScenario[] = [
  ['/', '/'],
  ['test/:test', 'test/:test'],
  [
    'test/:test/test/:entity(test|test1)',
    'test/:test/test/:entity(test|test1)',
  ],
  [
    'test/:test/test/:entity(test|test1)',
    'test/:test/test/:entity(test|test1)',
  ],
];

const PARAMS_SCENARIOS: ParamsScenario[] = [
  ['/', '/', {}, '/'],
  [
    'test/:test',
    'test/:test',
    {
      test: 'testParam1',
    },
    'test/testParam1',
  ],
  [
    'test/:test/test/:entity(test|test1)',
    'test/:test/test/:entity(test|test1)',
    {
      test: 'testParam1',
      entity: 'test',
    },
    'test/testParam1/test/test',
  ],
  [
    'test/:test/test/:entity(test|test1)',
    'test/:test/test/:entity(test|test1)',
    {
      test: 'testParam1',
      entity: 'test1',
    },
    'test/testParam1/test/test1',
  ],
];

const QUERY_SCENARIOS: QueryStringScenario[] = [
  [
    '/',
    '/',
    {},
    {
      someQuery: 'test',
    },
    '/?someQuery=test',
  ],
  [
    'test/:test',
    'test/:test',
    {
      test: 'testParam1',
    },
    {
      someQuery: 'test',
    },
    'test/testParam1?someQuery=test',
  ],
  [
    'test/:test/test/:entity(test|test1)',
    'test/:test/test/:entity(test|test1)',
    {
      test: 'testParam1',
      entity: 'test',
    },
    {
      someQuery: 'test',
    },

    'test/testParam1/test/test?someQuery=test',
  ],
  [
    'test/:test/test/:entity(test|test1)',
    'test/:test/test/:entity(test|test1)',
    {
      test: 'testParam1',
      entity: 'test1',
    },
    {},
    'test/testParam1/test/test1',
  ],
];

const UNEXPECTED_SCENARIOS: UnexpectedScenario[] = [[{}], [3233223]];

describe('Test makeRoutePath', () => {
  test.each(PATH_SCENARIOS)('Test fabric with path: %s', (path, pathResult) => {
    const url = makeRoutePath(path);
    expect(url.PATH).toBe(pathResult);
  });

  test.each(PARAMS_SCENARIOS)(
    'Test fabric with path: %s, pathResult %s, pathParams: %s and compileResult: %s',
    (path, pathResult, params, compileResult) => {
      const url = makeRoutePath<{}>(path);
      expect(url.PATH).toBe(pathResult);
      expect(url(params)).toBe(compileResult);
    }
  );

  test.each(QUERY_SCENARIOS)(
    'Test fabric with path: %s, pathResult %s, pathParams: %s, queryParams: %s and compileResult: %s',
    (path, pathResult, params, queryParams, compileResult) => {
      const url = makeRoutePath<{}>(path);
      expect(url.PATH).toBe(pathResult);
      expect(url(params, queryParams)).toBe(compileResult);
    }
  );

  test.each(UNEXPECTED_SCENARIOS)(
    'Test name of with unexpected %s expected result is Error',
    path => {
      expect(() => {
        const url = makeRoutePath(path);
        return url.PATH;
      }).toThrow();
    }
  );
});
