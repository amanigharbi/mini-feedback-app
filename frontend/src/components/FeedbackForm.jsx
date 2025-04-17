import { useState } from 'react';

function FeedbackForm({ onSubmit }) {
    const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [preview, setPreview] = useState(null);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;



    const feedbackData = {
        title,

      message,
        category,
      date: new Date().toLocaleString(),
      id: Date.now(),
    };

    // Envoi des données au parent (fonction onSubmit)
    onSubmit(feedbackData);
    setTitle('');

    setMessage('');
    setPreview(null);
  };



  

  return (
    <form onSubmit={handleSubmit} className="form">
        <input
  type="text"
  placeholder="Titre du message"
  value={title}
  pattern="^[A-Z][a-zA-Z0-9 ]{0,29}$" // Commence par une majuscule et max 30 caractères
  onChange={(e) => setTitle(e.target.value)}
  required
/>

      <textarea
        placeholder="Ton message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        pattern="^[A-Z][\s\S]{0,699}$" // Commence par une majuscule et max 700 caractères
        required
      />
<label>Catégorie</label>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">Choisis une catégorie</option>
  <option value="Droit">Droit</option>
  <option value="Management">Management</option>
  <option value="Science">Science</option>
  <option value="Lettre">Lettre</option>
  <option value="Technologie">Technologie</option>
  <option value="Sport">Sport</option>
  <option value="Santé">Santé</option>
  <option value="Autres">Autres</option>
</select>

     

      {preview && (
        <img
          src={preview}
          alt="Aperçu"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
        />
      )}

      <button type="submit">Envoyer</button>
    </form>
  );
}

export default FeedbackForm;
