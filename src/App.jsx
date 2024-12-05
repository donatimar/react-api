import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // Stato per gestione articoli e form
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
    published: false,
  });
  const [idCounter, setIdCounter] = useState(1);

  // Alert quando si pubblica un articolo
  useEffect(() => {
    if (formData.published) {
      alert("Stai per pubblicare un articolo");
    }
  }, [formData.published]);

  // Funzione gestione cambio dei valori del form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Funzione invio del form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.title && formData.content && formData.category) {
      setArticles([...articles, { id: idCounter, ...formData }]);
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

  // Funzione per eliminare un articolo
  const deleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestore per Articoli di Blog</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mt-4">
          <label htmlFor="articleTitle">Titolo Articolo</label>
          <input
            type="text"
            id="articleTitle"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Inserisci titolo dell'articolo"
            required
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="articleImage">URL Immagine</label>
          <input
            type="text"
            id="articleImage"
            name="image"
            className="form-control"
            value={formData.image}
            onChange={handleChange}
            placeholder="Inserisci URL immagine"
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="articleContent">Contenuto Articolo</label>
          <textarea
            id="articleContent"
            name="content"
            className="form-control"
            value={formData.content}
            onChange={handleChange}
            placeholder="Scrivi il contenuto dell'articolo"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="form-group mt-4">
          <label htmlFor="articleCategory">Categoria</label>
          <select
            id="articleCategory"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Seleziona una categoria
            </option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Scienza">Scienza</option>
            <option value="Arte">Arte</option>
            <option value="Sport">Sport</option>
          </select>
        </div>
        <div className="form-check mt-4">
          <input
            type="checkbox"
            id="articlePublished"
            name="published"
            className="form-check-input"
            checked={formData.published}
            onChange={handleChange}
          />
          <label htmlFor="articlePublished" className="form-check-label">
            Pubblica Articolo
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
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
