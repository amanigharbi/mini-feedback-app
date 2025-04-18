function FeedbackDetail({ feedback, onBack }) {
    return (
        <div style={{
            padding: '2rem',
            width: '90%',
            maxWidth: '1200px',
            margin: '20px auto 2rem',
        }}>
            <button className="back-btn" onClick={onBack}>
                ← Retour
            </button>

            <div style={{
                height: 'auto',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                width: '75%',
                margin: '2rem auto',
                backgroundColor: '#eee6d8'
            }}>
                {/* Image en haut */}
                <div style={{
                    height: '400px',
                    backgroundImage: `url(https://techcrunch.com/wp-content/uploads/2015/04/feedback.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%'
                }}></div>

                {/* Contenu texte - tout centré */}
                <div style={{ 
                    padding: '3rem',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    backgroundColor: '#f5f1e9',
                    textAlign: 'center'
                }}>
                    <div style={{
                        color: '#666',
                        fontSize: '1rem',
                        marginBottom: '1rem',
                        letterSpacing: '1px'
                    }}>
                        {new Date(feedback.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).toUpperCase()}
                    </div>

                    <h1 style={{
                        fontSize: '2.2rem',
                        margin: '0 0 1.5rem 0',
                        color: '#333',
                        fontWeight: '600'
                    }}>
                        {feedback.title || 'Sans titre'}
                    </h1>

                    <p style={{
                        lineHeight: '1.8',
                        color: '#555',
                        fontSize: '1.1rem',
                        marginBottom: '2rem',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        {feedback.message}
                    </p>

                    {/* Badge de catégorie centré */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center', // Centrage horizontal
                        marginTop: '2rem'
                    }}>
                        <span style={{
                            backgroundColor: '#e8e0d2',
                            padding: '0.5rem 1.2rem',
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            color: '#555',
                            fontWeight: '500',
                            display: 'inline-block' // Permet un centrage propre
                        }}>
                            {feedback.category}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeedbackDetail;