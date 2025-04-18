import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackDetail from './components/FeedbackDetail';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('date-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list'); // 'list', 'form', 'detail'
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/backend/api/feedbacks.php');
      const data = await res.json();
      setFeedbacks(data.reverse());
      setError(null);
    } catch (err) {
      console.error('Erreur de chargement des feedbacks 😢', err);
      setError('Erreur lors du chargement des feedbacks');
    } finally {
      setLoading(false);
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
      setView('list');
    } catch (err) {
      console.error('Erreur d\'ajout du feedback ❌', err);
      setError('Erreur lors de l\'ajout du feedback');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

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

  const filteredFeedbacks = sortedFeedbacks.filter((fb) => {
    const matchCategory = selectedCategory ? fb.category === selectedCategory : true;
    const matchSearch = (
      (fb.message && fb.message.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (fb.title && fb.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return matchCategory && matchSearch;
  });

  return (
    <div className="app-wrapper">
      <Navbar 
        onAddFeedbackClick={() => setView('form')} 
        showBackButton={view !== 'list'}
        onBackClick={() => setView('list')}
      />
      
      {view === 'list' && (
        <div className="main-container">
          <aside className="filters-panel">
            <h2>Filtres</h2>
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

            <label>Tri :</label>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="date-desc">Date ↓</option>
              <option value="date-asc">Date ↑</option>
              <option value="az">Titre A → Z</option>
              <option value="za">Titre Z → A</option>
            </select>

            <input
              type="text"
              placeholder="🔍 Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </aside>

          <main className="content-panel">
            <h1>💬 Mur de Feedbacks Anonymes</h1>
            {loading && <p>Chargement en cours...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
              <FeedbackList 
                feedbacks={filteredFeedbacks} 
                onSelectFeedback={(fb) => {
                  setSelectedFeedback(fb);
                  setView('detail');
                }}
              />
            )}
          </main>
        </div>
      )}

      {view === 'form' && <FeedbackForm onSubmit={addFeedback} onClose={() => setView('list')} />}
      
      {view === 'detail' && selectedFeedback && (
        <FeedbackDetail 
          feedback={selectedFeedback} 
          onBack={() => setView('list')} 
        />
      )}
    </div>
  );
}

export default App;