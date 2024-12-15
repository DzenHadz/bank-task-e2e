export function findKey(data, targetKey) {
    for (const outerKey in data) {
      if (data[outerKey][targetKey]) {
        return data[outerKey][targetKey];
      }
    }
    return null;
  }