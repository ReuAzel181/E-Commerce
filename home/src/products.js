const API_SERVER = "http://localhost:8080";

export const getProducts = () =>
      fetch(`${API_SERVER}/products`).then((res) => res.json()); //get the list of products

export const getProductById = (id) =>
      fetch (`${API_SERVER}/products/${id}`).then((res) => res.json()); //getting particular product by Id

export const currency = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      // minimumFractionDigits: 2,
});