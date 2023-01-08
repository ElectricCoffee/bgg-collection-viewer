import GameData from "../types/GameData";
import { AxiosResponse } from "axios";
import Elem from "./helpers/elementHelper";

namespace Collection {
  export function extractGameData(node: Element): GameData {
    const get = Elem.makeInnerHtmlGetter(node);
    return {
      id: node.getAttribute("objectid") || "",
      name: get("name"),
      year: get("yearpublished"),
      image: get("image"),
      thumb: get("thumbnail"),
    };
  }

  export function dealWithXml(xml: Document) {
    const items = Array.from(xml.getElementsByTagName("item"));
    const gamedata = items.map(extractGameData);

    return gamedata;
  }
}

export default Collection;
