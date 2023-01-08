export default interface RequestPending {}

export function isRequestPending(xml: Document): boolean {
  const message = xml.getElementsByTagName("message");
  return message.length !== 0;
}
