function FeedbackList({ feedbacks }) {
    if (!feedbacks.length) {
      return <p>Aucun feedback pour le moment </p>;
    }
  
    return (
      <div className="feedbacks">
        {feedbacks.map((fb) => (
          <div className="card" key={fb.id}>
            {fb.image && (
              <img src={fb.image} alt="Feedback" className="feedback-img" />
            )}
            <p>{fb.message}</p>
            <small>{fb.date}</small>
          </div>
        ))}
      </div>
    );
  }
  
  export default FeedbackList;
  