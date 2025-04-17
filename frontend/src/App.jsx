import { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

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

  return (
    <div className="container">
      <h1>💬 Mur de Feedbacks Anonymes</h1>
      <FeedbackForm onSubmit={addFeedback} />
      <FeedbackList feedbacks={feedbacks} />
    </div>
  );
}

export default App;
