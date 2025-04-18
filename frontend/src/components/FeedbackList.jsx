function FeedbackList({ feedbacks, onSelectFeedback }) {
  if (!feedbacks.length) {
    return <p>Aucun feedback pour le moment</p>;
  }

  const categoryColors = {
    Droit: '#F9E79F',
    Management: '#A3E4D7',
    Science: '#F5B7B1',
    Lettre: '#D2B4DE',
    Technologie: '#AED6F1',
    Sport: '#FAD7A0',
    Santé: '#A9DFBF',
    Autres: '#F8C471',
  };

  return (
    <div className="feedbacks">
      {feedbacks.map((fb) => {
        const color = categoryColors[fb.category] || '#FFF';

        return (
          <div 
            className="card postit" 
            key={fb.id} 
            style={{ backgroundColor: color }}
            onClick={() => onSelectFeedback(fb)} // Ajout de l'handler de clic
          >
            <div className="postit-sticky"></div>
            <h3>{fb.title || 'Sans titre'}</h3>
            <p><strong>Catégorie :</strong> {fb.category}</p>
            <small>{new Date(fb.date).toLocaleDateString()}</small>
          </div>
        );
      })}
    </div>
  );
}

export default FeedbackList;