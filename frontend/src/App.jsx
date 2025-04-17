import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');  
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('http://localhost:8000/backend/api/feedbacks.php');
      const data = await res.json();
      setFeedbacks(data.reverse());
    } catch (err) {
      console.error('Erreur de chargement des feedbacks 😢', err);
    }
  };

  const addFeedback = async (newData) => {
    try {
      const res = await fetch('http://localhost:8000/backend/api/feedbacks.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      const newFeedback = await res.json();
      setFeedbacks([newFeedback, ...feedbacks]);
    } catch (err) {
      console.error('Erreur d\'ajout du feedback ❌', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // 💡 Appliquer le filtre
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    switch (sortOrder) {
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'az':
        return a.title.localeCompare(b.title);
      case 'za':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  
// by category  +search
const filteredFeedbacks = sortedFeedbacks.filter((fb) => {
  const matchCategory = selectedCategory ? fb.category === selectedCategory : true;
  const matchSearch = (
    (fb.message && fb.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (fb.title && fb.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );
    return matchCategory && matchSearch;
});
  return (
    <div className="container">
      <h1>💬 Mur de Feedbacks Anonymes</h1>

      <FeedbackForm onSubmit={addFeedback} />

      {/* 🧠 Selecteur de catégorie */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="">-- Tous --</option>
        <option value="Droit">Droit</option>
        <option value="Management">Management</option>
        <option value="Science">Science</option>
        <option value="Lettre">Lettre</option>
        <option value="Technologie">Technologie</option>
        <option value="Sport">Sport</option>
        <option value="Santé">Santé</option>
        <option value="Autres">Autres</option>
      </select>
{/* 🧠 Selecteur de tri */}
<div className="sort-controls">
  <label>Tri :</label>
  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
    <option value="date-desc">Date ↓ (récent en premier)</option>
    <option value="date-asc">Date ↑ (ancien en premier)</option>
    <option value="az">Titre A → Z</option>
    <option value="za">Titre Z → A</option>
  </select>
</div>
<div className="search-bar">
  <input
    type="text"
    placeholder="🔍 Rechercher un message..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

      <FeedbackList feedbacks={filteredFeedbacks} />
      <div className="sort-controls">
 
</div>
    </div>
  );
}

export default App;
