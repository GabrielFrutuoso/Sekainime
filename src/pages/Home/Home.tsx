import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Home() {
  const { category } = useParams<{ category?: string}>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate("/top-animes", { replace: true });
    }
  }, [category, navigate]);

  const currentCategory = category ?? "top-animes";

  return (
    <div>
      <h1>Category: {currentCategory}</h1>
    </div>
  );
}