import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // <-- Ajout pour filtrage
  const [sortOrder, setSortOrder] = useState('desc');
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
    return sortOrder === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });
  
  const filteredFeedbacks = selectedCategory
    ? sortedFeedbacks.filter((fb) => fb.category === selectedCategory)
    : sortedFeedbacks;
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
<label>Tri :</label>
  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
    <option value="desc">Date ↓ (récent en premier)</option>
    <option value="asc">Date ↑ (ancien en premier)</option>
  </select>
      <FeedbackList feedbacks={filteredFeedbacks} />
      <div className="sort-controls">
 
</div>
    </div>
  );
}

export default App;
