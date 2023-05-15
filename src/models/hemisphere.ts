export enum Hemisphere {
  Northern = "Northern",
  Southern = "Southern",
  Western = "Western",
  Eastern = "Eastern",
}
export function getHemisphereSql(hemisphere: Hemisphere) {
  switch (hemisphere) {
    case Hemisphere.Northern:
      return "latitude > 0";
    case Hemisphere.Southern:
      return "latitude < 0";
    case Hemisphere.Western:
      return "longitude < 0";
    case Hemisphere.Eastern:
      return "longitude > 0";
  }
}
export function getTranslation(hemisphere: Hemisphere) {
  switch (hemisphere) {
    case Hemisphere.Northern:
      return "Šiaurės";
    case Hemisphere.Southern:
      return "Pietų";
    case Hemisphere.Western:
      return "Vakarų";
    case Hemisphere.Eastern:
      return "Rytų";
  }
}
