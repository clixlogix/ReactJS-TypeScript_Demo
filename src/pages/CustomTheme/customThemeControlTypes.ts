export type uiThemeDTo = {
  data: string;
};
export type CustomThemeObj = {
      key: string,
        notes: string,
        required: boolean,
        embedAtBuildTime: boolean,
        size: string,
        platform: string,
        values: string[] | CustomThemeObj[],
}
export type CustomThemeObjArr = CustomThemeObj[];