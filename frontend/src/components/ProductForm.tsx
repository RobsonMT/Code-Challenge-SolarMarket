import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/products", { ...form, price: Number(form.price) });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Novo Produto</h1>
      {["name", "description", "category", "price"].map((field) => (
        <input
          key={field}
          type={field === "price" ? "number" : "text"}
          name={field}
          placeholder={field}
          value={form[field as keyof typeof form]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Salvar
      </button>
    </form>
  );
}
