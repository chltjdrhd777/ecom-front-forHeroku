const generatePublicUrl = (query: string) => {
  return `http://localhost:8080/public/${query}`;
};

export { generatePublicUrl };
