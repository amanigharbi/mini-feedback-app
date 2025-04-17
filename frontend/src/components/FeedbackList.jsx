const defaultImage = 'https://www.eeb3.eu/app/themes/eeb3/assets/img/layout/child-page-placeholder.png';

function FeedbackList({ feedbacks }) {
  if (!feedbacks.length) {
    return <p>Aucun feedback pour le moment </p>;
  }

  return (
    <div className="feedbacks">
      {feedbacks.map((fb) => {
        const isValidImage = fb.image && fb.image.startsWith('blob:') || fb.image.startsWith('http');

        return (
          <div className="card" key={fb.id}>
            <img
              src={isValidImage ? fb.image : defaultImage}
              alt="Feedback"
              className="feedback-img"
            />
            <p>{fb.message}</p>
            <p><strong>Catégorie :</strong> {fb.category}</p>
            <small>{fb.date}</small>
          </div>
        );
      })}
    </div>
  );
}
export default FeedbackList;
