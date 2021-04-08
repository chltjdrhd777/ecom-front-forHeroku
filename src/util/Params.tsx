const paramRendor = (query: string) => {
  if (query) {
    //* pre = "slug?param1=value&param2=value..."
    const renderedQuery = query.split("?")[1];
    if (renderedQuery.length > 0) {
      //* params =[params,param2...]
      const params = renderedQuery.split("&");
      let resultParamObj = {} as { [key: string]: string };

      for (let paramString of params) {
        //* KeyAndValue = [keystring,valueString]
        const keyAndValue = paramString.split("=");
        resultParamObj[keyAndValue[0]] = keyAndValue[1];
      }

      return resultParamObj;
    }
  }
};

export { paramRendor };
