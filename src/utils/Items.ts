import ItemData, { Item } from "../types/ItemData";
import Elem from "./helpers/elementHelper";

const category = "boardgamecategory";
const mechanic = "boardgamemechanic";
const designer = "boardgamedesigner";

namespace Items {
  function getItemData(element: Element): Item {
    const get = Elem.makeGetter(element);

    const link = Array.from(element.getElementsByTagName("link"));

    const filterMap = (attr: string) =>
      link
        .filter((l) => l.getAttribute("type") === attr)
        .map((l) => l.getAttribute("value") ?? "");

    return {
      description: get("description").innerHTML,
      minPlayers: Number(get("minplayers").getAttribute("value")),
      maxPlayers: Number(get("maxplayers").getAttribute("value")),
      type: element.getAttribute("type") ?? "",
      categories: filterMap(category),
      mechanisms: filterMap(mechanic),
      designers: filterMap(designer),
    };
  }

  export function dealWithXml(xml: Document): ItemData {
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
