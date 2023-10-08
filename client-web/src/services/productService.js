import http from "../http-common";

class ProductDataService {
  getAll() {
    return http.get("/productList");
  }

  get(id) {
    return http.get(`/product/${id}`);
  }

  create(data) {
    return http.post("/product", data);
  }

  update(id, data) {
    return http.patch(`/product/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product/${id}`);
  }

  deleteAll() {
    return http.delete(`/product`);
  }

  findByName(name) {
    return http.get(`/product/name/${name}`);
  }
}

export default new ProductDataService();