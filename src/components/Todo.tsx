import rick from "../../public/assets/rick.webp";
import morty from "../../public/assets/morty.webp";
import summer from "../../public/assets/summer.webp";
import beth from "../../public/assets/beth.webp";
import jerry from "../../public/assets/jerry.webp";

export function returnPicture(name: string) {
  switch (name) {
    case "rick":
      return rick;
    case "morty":
      return morty;
    case "summer":
      return summer;
    case "beth":
      return beth;
    case "jerry":
      return jerry;
    default:
      return rick;
  }
}
