import { create } from "zustand";

const useProductStore = create((set) => {
  return {
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        return {
          success: false,
          message: "All fields must be filled!",
        };
      }

      if (newProduct.price < 0) {
        return {
          success: false,
          message: "Price can not be negative",
        };
      }

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      set((state) => {
        return {
          products: [...state.products, data.data],
        };
      });

      return {
        success: true,
        message: "Product added successfully!",
      };
    },
    fetchProducts: async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      set({ products: data.data });
    },
    deleteProduct: async (id) => {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }

      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));

      return {
        success: true,
        message: data.message,
      };
    },
    updateProduct: async (id, updatedProduct) => {
      if (
        !updatedProduct.name ||
        !updatedProduct.price ||
        !updatedProduct.image
      ) {
        return {
          success: false,
          message: "All fields must be filled!",
        };
      }

      if (updatedProduct.price < 0) {
        return {
          success: false,
          message: "Price can not be negative",
        };
      }

      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }

      if (data.success) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === id ? data.data : product
          ),
        }));
      }

      return {
        success: true,
        message: "Product updated successfully!",
      };
    },
  };
});

export default useProductStore;
