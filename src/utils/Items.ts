import { AxiosResponse } from "axios";
import ItemData, { Item } from "../types/ItemData";
import Elem from "./helpers/elementHelper";

namespace Items {
  function getItemData(element: Element): Item {
    const get = Elem.makeGetter(element);
    return {
      description: get("description").innerHTML,
      minPlayers: get("minplayers").getAttribute("value") ?? "",
      maxPlayers: get("maxplayers").getAttribute("value") ?? "",
    };
  }

  export function dealWithXml(res: AxiosResponse): ItemData {
    const xml = new DOMParser().parseFromString(res.data, "text/xml");
    const items = xml
      .getElementsByTagName("items")[0]
      .getElementsByTagName("item");

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
