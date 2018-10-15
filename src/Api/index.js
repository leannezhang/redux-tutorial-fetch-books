import endPoints from "./endpoints";

const loadData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json.items;
  } catch (e) {
    throw new Error(e);
  }
};

export const queryByAuthor = author => {
  const url = endPoints.querybyAuthor(author);
  return loadData(url);
};

export const queryByISBN = isbn => {
  const url = endPoints.querybyISBN(isbn);
  return loadData(url);
};
