import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    image: "",
    content: "",
    category: "",
    published: false,
  });
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dati API:", data);
        debugger;
        setArticles(data.posts);
        if (data.length > 0) {
          const maxId = Math.max(...data.map((article) => article.id));
          setIdCounter(maxId + 1);
        }
      })
      .catch((error) => {
        console.error("Errore nel recupero degli articoli:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content && formData.category) {
      const newArticle = {
        id: idCounter,
        title: formData.title,
        image: formData.image,
        content: formData.content,
        category: formData.category,
        published: formData.published,
      };
      console.log(articles);
      setArticles([...articles, newArticle]);
      setFormData({
        title: "",
        image: "",
        content: "",
        category: "",
        published: false,
      });
      setIdCounter(idCounter + 1);
    }
  };

  const deleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestore per Articoli di Blog</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Titolo</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Immagine (URL)</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contenuto</label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            <label className="form-check-label">Pubblicato</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Articolo
        </button>
      </form>

      {articles.length > 0 ? (
        <ul className="list-group">
          {articles.map((article) => (
            <li
              key={article.id}
              className="list-group-item d-flex flex-column align-items-start"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5>{article.title}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteArticle(article.id)}
                >
                  <FaTrash />
                </button>
              </div>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="img-fluid mt-2"
                  style={{ maxHeight: "200px" }}
                />
              )}
              <p className="mt-3">{article.content}</p>
              <span className="badge bg-secondary">
                Categoria: {article.category}
              </span>
              <span
                className={`badge ${
                  article.published ? "bg-success" : "bg-warning"
                } mt-2`}
              >
                {article.published ? "Pubblicato" : "Bozza"}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-4">Nessun articolo inserito</p>
      )}
    </div>
  );
};

export default App;
