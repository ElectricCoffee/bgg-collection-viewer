export default interface RequestPending extends Document {}

export function isRequestPending(xml: Document): xml is RequestPending {
  const message = xml.getElementsByTagName("message");
  return message.length !== 0;
}
