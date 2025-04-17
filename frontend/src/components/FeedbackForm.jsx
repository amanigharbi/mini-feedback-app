import { useState } from 'react';

function FeedbackForm({ onSubmit }) {
  const [message, setMessage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageURL('');
      setPreview(URL.createObjectURL(file)); // Crée un lien temporaire pour afficher l'image
    } else {
      setImageFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Prépare l'URL de l'image (soit un lien URL, soit une URL blob temporaire)
    const image = imageFile ? preview : imageURL;

    const feedbackData = {
      message,
        category,
      image,
      date: new Date().toLocaleString(),
      id: Date.now(),
    };

    // Envoi des données au parent (fonction onSubmit)
    onSubmit(feedbackData);

    setMessage('');
    setImageURL('');
    setImageFile(null);
    setPreview(null);
  };



  

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        placeholder="Ton message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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

      <div className="image-inputs">
        <label>Lien d'image (URL)</label>
        <input
          type="url"
          placeholder="https://exemple.com/image.jpg"
          value={imageURL}
          onChange={(e) => {
            setImageURL(e.target.value);
            setImageFile(null);
            setPreview(null);
          }}
          disabled={!!imageFile}
        />

        <label>Ou importer une image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          disabled={!!imageURL}
        />
      </div>

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
