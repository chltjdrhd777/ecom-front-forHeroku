const getCookiesValue = (searchKey?: string) => {
  //! remove " "
  const cookieArr = document.cookie.split(";").map((each) => {
    if (each[0] === " ") return each.substring(1);
    return each;
  });

  const renderedSearchKey = `${searchKey}=`;

  let resultValue = "";

  cookieArr.forEach((each) => {
    if (each.indexOf(renderedSearchKey) === 0) {
      resultValue = each.substring(renderedSearchKey.length);
    }
  });

  return resultValue;
};

export { getCookiesValue };
