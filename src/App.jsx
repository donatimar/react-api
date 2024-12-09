import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
    published: false,
  });

  // Carica articoli
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dati API:", data.posts);
        setArticles(data.posts);
      })
      .catch((error) => {
        console.error("Errore nel recupero degli articoli:", error);
      });
  }, []);

  // Modifiche form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Aggiungi nuovo articolo - POST
  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      title: formData.title,
      image: formData.image,
      content: formData.content,
      category: [formData.category],
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Articolo creato:", data.post);
        setArticles([...articles, data.post]);
        setFormData({
          title: "",
          image: "",
          content: "",
          category: "",
          published: false,
        });
      })
      .catch((error) => {
        console.error("Errore durante la creazione:", error);
      });
  };

  // Elimina un articolo - DELETE
  const deleteArticle = (index) => {
    fetch(`http://localhost:3000/posts/${index}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setArticles(articles.filter((_, idx) => idx !== index));
        } else {
          console.error("Errore durante l'eliminazione.");
        }
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Gestore per Articoli di Blog</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label font-weight-bold h5">Titolo</label>
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
          <label className="form-label font-weight-bold h5">
            Immagine (URL)
          </label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label font-weight-bold h5">Contenuto</label>
          <textarea
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label font-weight-bold h5">Categoria</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Aggiungi Articolo
        </button>
      </form>

      {articles.length > 0 ? (
        <ul className="list-group">
          {articles.map((article, index) => (
            <li
              key={index}
              className="list-group-item d-flex flex-column align-items-start"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5>{article.title}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteArticle(index)}
                >
                  <FaTrash />
                </button>
              </div>
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="img-fluid mt-2"
                  style={{ maxHeight: "200px" }}
                />
              ) : (
                <img
                  src="https://placehold.co/200x100"
                  alt="Placeholder"
                  className="img-fluid mt-2"
                  style={{ maxHeight: "300px" }}
                />
              )}
              <p className="mt-3">{article.content}</p>
              <span className="badge bg-secondary">
                Categoria: {article.category}
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
