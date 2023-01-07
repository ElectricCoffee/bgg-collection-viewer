namespace Arr {
  export function intersperse<T>(arr: T[], newItem: T) {
    if (arr.length < 2) {
      return arr;
    }

    const output = [];

    for (const i in arr) {
      output.push(arr[i]);

      if (+i === arr.length - 1) {
        break;
      }

      output.push(newItem);
    }

    return output;
  }
}

export default Arr;
