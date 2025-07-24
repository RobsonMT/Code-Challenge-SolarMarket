type Props = {
  rating: number; // valor de 0 a 5
};

export default function StarRating({ rating }: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex space-x-1 text-yellow-400">
      {stars.map((star) => (
        <span key={star}>{star <= rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
