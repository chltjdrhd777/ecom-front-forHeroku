const generatePublicUrl = (query: string) => {
  let host = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://flipkartserverdelpoyed.herokuapp.com";

  return `${host}/public/${query}`;
};

export { generatePublicUrl };
