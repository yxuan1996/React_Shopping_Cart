import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getProducts(query) {
  const response = await fetch('https://fakestoreapi.com/products?limit=5')
  const status = response.status;
  const data = await response.json();
  console.log(data)
  return data;

//   if (query) {
//     contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
//   }
//   return contacts.sort(sortBy("last", "createdAt"));
}

export async function getProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`) 
    const status = response.status;
    const data = await response.json();
    console.log(data)
    return data ?? null;
  }