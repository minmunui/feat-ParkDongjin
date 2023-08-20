import instance from "./api";

export const fetchProductsByPage = (page) => {
  return instance.get(`/products?page=${page}`).catch((error) => {
    if (error.response) {
      console.log("error.response", error.response);
      const { status, data } = error.response;
      if (status === 400) {
        return Promise.reject(data);
      }
      return Promise.reject(error);
    }
  });
};

export const getProductById = (id) => {
  if (!id) {
    throw Error("id is null");
  }
  return instance.get("/products/" + id);
};

export const fetchProducts = async (page = 0) => {
  try {
    if (typeof page !== "number") {
      throw new Error("page는 숫자이어야 합니다.");
    }
    if (isNaN(page)) {
      throw new Error("page는 숫자이어야 합니다.");
    }
    if (page < 0) {
      throw new Error("page는 0보다 작을 수 없습니다.");
    }
    const response = await instance.get(`/products?page=${page}`);
    return response.data.response;
  } catch (error) {
    throw error;
  }
};
