import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";

export default function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4">
        <nav className="mb-4 flex justify-between">
          <Link to="/" className="text-blue-500 font-bold">
            Produtos
          </Link>
          <Link
            to="/new"
            className="bg-blue-500 text-white px-3 py-1 rounded inline-flex"
          >
            Novo Produto
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/new" element={<ProductForm />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
