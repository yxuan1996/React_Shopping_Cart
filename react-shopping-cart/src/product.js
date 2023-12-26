import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getProducts(query) {
  const response = await fetch('https://fakestoreapi.com/products')
  const status = response.status;
  let data = await response.json();
  if (query) {
    data = matchSorter(data, query, { keys: ["title"] });
  }
  console.log(data)
  return data;

}

export async function getProduct(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`) 
    const status = response.status;
    const data = await response.json();
    console.log(data)
    return data ?? null;
  }