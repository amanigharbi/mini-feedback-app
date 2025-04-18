function FeedbackDetail({ feedback, onBack }) {
    return (
        <div className="detail-page">
            <button className="back-btn" onClick={onBack}>
                ← Retour
            </button>
            <div className="feedback-detail-card">
                <h1>{feedback.title || 'Sans titre'}</h1>
                <p><strong>Catégorie :</strong> {feedback.category}</p>
                <p><strong>Date :</strong> {new Date(feedback.date).toLocaleString()}</p>
                <div className="feedback-message">
                    {feedback.message}
                </div>
                {feedback.image && (
                    <div className="feedback-image">
                        <img src={feedback.image} alt="Illustration du feedback" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default FeedbackDetail;