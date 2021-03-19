[![NPM](https://img.shields.io/npm/v/make-route-path.svg)](https://www.npmjs.com/package/make-route-path)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Badges](https://badgen.net/npm/license/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/npm/dependents/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/npm/types/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/github/issues/kolengri/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/bundlephobia/min/make-route-path)](https://bundlephobia.com/result?p=make-route-path)
[![Badges](https://badgen.net/bundlephobia/minzip/make-route-path)](https://bundlephobia.com/result?p=make-route-path)

# Make route path

🧁 Make your router paths type safe and sweet again!

The makeRoutePath function can be used to generate URLs to the routes. The package is based on `path-to-regexp` library.
Results of compiling paths into regular expressions are cached, so there is no overhead on generating multiple paths with the same pattern.

```bash
npm install make-route-path --save
```

```bash
yard add make-route-path
```

## Arguments

### makeRoutePath arguments

`makeRoutePath` takes 2 arguments. The first one is a pattern provided as a path attribute to the route.
The second one is an object stringify function, which allows you to make your own query string when query object is passed.

- `path: string`: Required - pattern provided as a path attribute to the route
- `qs: (params: Record<string, any>) => string`: object stringify function, useful for own query stringify implementation

### Return function arguments

`makeRoutePath` returns a function with one argument. It returns a path where the parts are replaced with the values from the attributes object.
This argument is an object with both `key` and `value` string parameters providing values to replace the pattern parts.
It is also possible to call this function as `fn.PATH` to get path before the replacement. It might appear useful for example within `react-router` routes definition.

- `attributes: Record<string, string>`: object of pattern attributes to replace.

## Examples

### Get path before execute

```ts
import makeRoutePath from 'make-route-path';

//...

type ProductAttr = {
  productId: number;
  fromSection: string;
  productSection: 'images' | 'description';
};

const productUrl = makeRoutePath<ProductAttr>(
  '/catalog/:productId/:fromSection/:productSection'
);

productUrl.PATH; // /catalog/:productId/:fromSection/:productSection

//...
```

### Pattern and pattern attributes

```ts
import makeRoutePath from 'make-route-path';

//...

type ProductAttr = {
  productId: number;
  fromSection: string;
  productSection: 'images' | 'description';
};

const productUrl = makeRoutePath<ProductAttr>(
  '/catalog/:productId/:fromSection/:productSection'
);

productUrl({ productId: '10', fromSection: 'a123', productSection: 'images' });
// /catalog/10/a123/images

//...
```

### Pattern and pattern attributes with query string

```ts
import makeRoutePath from 'make-route-path';

//...

type ProductAttr = {
  productId: number;
  fromSection: string;
  productSection: 'images' | 'description';
};

type ProductQuery = {
  productId: number;
  fromSection: string;
  productSection: 'images' | 'description';
};

const productUrl = makeRoutePath<ProductAttr, ProductQuery>(
  '/catalog/:productId/:fromSection/:productSection'
);

// Make url with query params
productUrl(
  {
    productId: '10',
    fromSection: 'a123',
    productSection: 'images',
  },
  {
    someQueryParam: 'test',
    someAnotherQueryParam: 'test',
  }
);
// /catalog/10/a123/images?someQueryParam=test&someAnotherQueryParam=test

//...
```

## Inspired by

- React Router [generatePath](https://reactrouter.com/web/api/generatePath)
