const has = Object.prototype.hasOwnProperty;

type QS = {
  (obj: Record<string, any>, prefix?: string): string;
};

export const qs: QS = (obj, prefix) => {
  const pairs = [];
  for (const key in obj) {
    if (!has.call(obj, key)) {
      continue;
    }

    const value = obj[key];
    const enkey = encodeURIComponent(key);

    let pair;

    if (typeof value === 'object') {
      pair = qs(value, prefix ? prefix + '[' + enkey + ']' : enkey);
    } else {
      pair =
        (prefix ? prefix + '[' + enkey + ']' : enkey) +
        '=' +
        encodeURIComponent(value);
    }

    pairs.push(pair);
  }

  return pairs.join('&');
};
