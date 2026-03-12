export async function fetchDefaultBooks() {

  const response = await fetch(`https://openlibrary.org/search.json?q=best+books&limit=10`);
  const data = await response.json();
  console.log(data.docs)
  return data.docs;
}