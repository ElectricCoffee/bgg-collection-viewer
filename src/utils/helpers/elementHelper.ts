namespace Elem {
  export function makeInnerHtmlGetter(node: Element) {
    return (name: string) => node.getElementsByTagName(name)?.[0]?.innerHTML;
  }

  export function makeGetter(node: Element) {
    return (name: string) => node.getElementsByTagName(name)?.[0];
  }
}

export default Elem;
