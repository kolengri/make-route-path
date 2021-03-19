[![NPM](https://img.shields.io/npm/v/make-route-path.svg)](https://www.npmjs.com/package/make-route-path)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Badges](https://badgen.net/npm/license/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/npm/dependents/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/npm/types/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/github/issues/kolengri/make-route-path)](https://www.npmjs.com/package/make-route-path)
[![Badges](https://badgen.net/bundlephobia/min/make-route-path)](https://bundlephobia.com/result?p=make-route-path)
[![Badges](https://badgen.net/bundlephobia/minzip/make-route-path)](https://bundlephobia.com/result?p=make-route-path)

# Make route path

Make your router paths type safe and great!

```bash
npm install make-route-path --save
```

```bash
yard add make-route-path
```

```ts
const productUrl = makeRoutePath<
  {
    productId: number;
    fromSection: string;
    productSection: 'images' | 'description';
  },
  {
    someQueryParam?: string;
    someAnotherQueryParam?: string;
  }
>('/catalog/:productId/:fromSection/:productSection');

// Make url with params
productUrl({ productId: '10', fromSection: 'a123', productSection: 'images' });
// '/catalog/10/a123/images'

// Make url with query params
productUrl({
    productId: '10',
    fromSection: 'a123',
    productSection: 'images'
}, {
    someQueryParam: "test";
    someAnotherQueryParam: "test";
});
// '/catalog/10/a123/images?someQueryParam=test&someAnotherQueryParam=test'

// Returns real path
productUrl.PATH;
// '/catalog/:productId/:fromSection/:productSection'
//  usable for example react-router routes
```
