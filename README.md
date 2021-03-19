# Make rout path

Make your router paths type safe and great!

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
