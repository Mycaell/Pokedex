export class Utils {

  public static getPrincipalType(list: any[]) {
    const color = list.filter((x) => x.slot === 1)[0]?.type.name;

    return color;
  }

}
