import { compile as pathCompile, PathFunction } from 'path-to-regexp';
import { qs } from './qs';

type QueryExt = Record<string, any>;

export type MakeRoutePathFn<Params, Query = any> = [Params] extends [never]
  ? (params?: never | undefined, query?: Query) => string
  : (params: Params, query?: Query) => string;

export type MakeRoutePathResultFn<Path extends string, Query> = MakeRoutePathFn<
  RouteParams<Path>,
  Query
> & {
  PATH: Path;
};

type PathSegments<Path extends string> = Path extends `${infer SegmentA}/${infer SegmentB}`
  ? ParamOnly<SegmentA> | PathSegments<SegmentB>
  : ParamOnly<Path>;
type ParamOnly<Segment extends string> = Segment extends `:${infer Param}`
  ? Param
  : never;

type RouteParams<Path extends string> = {
  [Key in PathSegments<Path>]: string | number;
};


export type MakeRoutePathFabric = {
  <Path extends string = string, Query extends QueryExt = QueryExt>(
    path: Path,
    qsFunc?: (params: RouteParams<Path>) => string
  ): MakeRoutePathResultFn<Path, Query>;
};

type Cache = {
  [key in string]: PathFunction<object>;
};

const CACHE_LIMIT = 10000;

const makeCache = () => {
  const cache: Cache = {};
  let count = 0;

  return {
    get: (key: string) => cache[key] && cache[key],
    set: (key: string, data: PathFunction<object>) => {
      if (count < CACHE_LIMIT) {
        cache[key] = data;
        count++;
      }

      return data;
    },
  };
};

const cache = makeCache();

const makeCompilePath = (path: string) => {
  if (cache.get(path)) {
    return cache.get(path);
  }
  const generator = pathCompile(path);
  return cache.set(path, generator);
};

export const makeRoutePath: MakeRoutePathFabric = (path, qsFunc) => {
  if (typeof path !== 'string') throw new Error('Please path string as a path');
  const qsStringify = qsFunc ?? qs;
  const fn: MakeRoutePathResultFn<any, any> = (params, query = {}) => {
    // Make query string
    const queryString =
      Object.keys(query).length > 0 ? '?' + qsStringify(query) : '';

    // Exclude unnecessary compile
    if (!params || path === '/') {
      return path + queryString;
    }

    const compilePath = makeCompilePath(path);
    return compilePath(params) + queryString;
  };

  // Provide path to make access without function call
  fn.PATH = path;

  return fn as any;
};

export default makeRoutePath;
