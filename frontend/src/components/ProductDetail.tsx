import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ReviewForm from "./ReviewForm";
import { formatPriceBRL } from "../utils/formatPriceBRL";
import StarRating from "./StarRating";
import type { Product, Review } from "../interfaces";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avg, setAvg] = useState<string>("0");

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => [setProduct(res.data), setReviews(res.data.reviews)]);
    api
      .get(`/products/${id}/reviews/average`)
      .then((res) => setAvg(res.data.average));
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">{product.name}</h1>
      <p className="text-gray-700 mb-2">Descrição: {product.description}</p>
      <p className="text-sm text-gray-600 mb-2">
        Categoria: {product.category}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Preço: {formatPriceBRL(product.price)}
      </p>
      <p className="text-yellow-500 font-semibold mb-4">
        Média: {avg} <StarRating rating={Number(avg)} />
      </p>

      <h2 className="text-lg font-bold mt-6">Avaliações</h2>
      <ul className="mb-4">
        {reviews.map((r, idx) => (
          <li key={idx} className="border p-2 rounded mb-2">
            <strong>{r.author}</strong>: {r.comment} ({r.rating}/5)
          </li>
        ))}
      </ul>

      <ReviewForm
        productId={id!}
        onSuccess={() => {
          api
            .get(`/products/${id}`)
            .then((res) => setReviews(res.data.reviews));
          api
            .get(`/products/${id}/reviews/average`)
            .then((res) => setAvg(res.data.average));
        }}
      />
    </div>
  );
}
