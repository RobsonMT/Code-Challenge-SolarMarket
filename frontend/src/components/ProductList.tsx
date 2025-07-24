import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { formatPriceBRL } from "../utils/formatPriceBRL";
import { formatDate } from "../utils/formatDate";
import type { Product } from "../interfaces";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar este produto?"
    );
    if (!confirm) return;

    try {
      api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };

  if (!products) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Produtos</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id} className="mb-2 border p-2 rounded shadow">
            <p className="text-blue-600 font-semibold">{p.name}</p>
            <p className="text-sm text-gray-600">Descrição: {p.description}</p>
            <p className="text-sm text-gray-600">Categoria: {p.category}</p>
            <p className="text-sm text-gray-600">
              Preço: {formatPriceBRL(p.price)}
            </p>
            <p className="text-sm text-gray-600">
              Criado em: {formatDate(p.createdAt)}
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/product/${p.id}`}
                className="bg-indigo-500 text-white px-3 py-1 rounded"
              >
                Ver Detalhes
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
