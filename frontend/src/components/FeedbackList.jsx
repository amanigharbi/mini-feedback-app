
function FeedbackList({ feedbacks }) {
  if (!feedbacks.length) {
    return <p>Aucun feedback pour le moment </p>;
  }

  return (
    <div className="feedbacks">
      {feedbacks.map((fb) => {
        return (
          <div className="card" key={fb.id}>
            <img
              src="https://www.eeb3.eu/app/themes/eeb3/assets/img/layout/child-page-placeholder.png"
              alt="Feedback"
              className="feedback-img"
            />
            <h3>{fb.title}</h3>
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
