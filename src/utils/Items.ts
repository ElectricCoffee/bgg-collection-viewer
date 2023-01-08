import { AxiosResponse } from "axios";
import ItemData, { Item } from "../types/ItemData";
import Elem from "./helpers/elementHelper";

namespace Items {
  function getItemData(element: Element): Item {
    const get = Elem.makeGetter(element);
    return {
      description: get("description").innerHTML,
      minPlayers: Number(get("minplayers").getAttribute("value")),
      maxPlayers: Number(get("maxplayers").getAttribute("value")),
      type: element.getAttribute("type") ?? "",
    };
  }

  export function dealWithXml(xml: Document): ItemData {
    const items = xml
      .getElementsByTagName("items")[0]
      .getElementsByTagName("item");
    console.log(items);
    let itemData = {} as ItemData;

    for (const item of items) {
      const id = item.getAttribute("id");

      if (!id) continue;

      const data = getItemData(item);
      itemData[id] = data;
    }

    return itemData;
  }
}

export default Items;
