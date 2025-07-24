import { useState } from "react";
import api from "../services/api";

export default function ReviewForm({
  productId,
  onSuccess,
}: {
  productId: string;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({ author: "", comment: "", rating: 5 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post(`/products/${productId}/reviews`, {
      ...form,
      rating: Number(form.rating),
      productId,
    });
    setForm({ author: "", comment: "", rating: 5 });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className="text-lg font-bold">Nova Avaliação</h3>
      <input
        type="text"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Autor"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="comment"
        value={form.comment}
        onChange={handleChange}
        placeholder="Comentário"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Enviar
      </button>
    </form>
  );
}
