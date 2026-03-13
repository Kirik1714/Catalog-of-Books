export async function fetchDefaultBooks(query ='best books') {

  const searchQuery = query.replace(/\s+/g, '+');
  const response = await fetch(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10`);
  const data = await response.json();
  return data.docs;
}