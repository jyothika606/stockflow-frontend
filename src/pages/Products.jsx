import { useEffect, useState } from "react";
import api from "../services/api";

function Products() {
  const emptyForm = {
    name: "",
    sku: "",
    description: "",
    quantity: "",
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  };

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load products");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        alert("Product updated successfully");
      } else {
        await api.post("/products", form);
        alert("Product added successfully");
      }

      setForm(emptyForm);
      setEditingId(null);
      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name || "",
      sku: product.sku || "",
      description: product.description || "",
      quantity: product.quantity || "",
      costPrice: product.costPrice || "",
      sellingPrice: product.sellingPrice || "",
      lowStockThreshold: product.lowStockThreshold || "",
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Products</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="costPrice"
          placeholder="Cost Price"
          value={form.costPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={form.sellingPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="lowStockThreshold"
          placeholder="Low Stock Threshold"
          value={form.lowStockThreshold}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.quantity}</td>
              <td>{p.sellingPrice}</td>

              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;