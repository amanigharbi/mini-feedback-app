import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Publication de Feedback', () => {
  const mockFeedbacks = [
    {
      id: 1,
      title: 'Feedback existant',
      message: 'Message existant',
      category: 'Droit',
      date: '2023-01-01'
    }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFeedbacks),
        ok: true
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test 1: Affichage du formulaire
  test('affiche correctement le formulaire de publication', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await act(async () => {
      fireEvent.click(screen.getByTitle('Ajouter un feedback'));
    });

    await waitFor(() => {
      expect(screen.getByLabelText('titre')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
      expect(screen.getByLabelText('Catégorie')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument();
    });
  });

  // Test 2: Soumission valide
  test('permet de publier un nouveau feedback', async () => {
    const newFeedback = {
      title: 'Nouveau feedback',
      message: 'Contenu du feedback',
      category: 'Science'
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ...newFeedback, id: 2, date: '2023-05-20' }),
        ok: true
      })
    );

    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('Ajouter un feedback'));
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('titre'), {
        target: { value: newFeedback.title }
      });
      fireEvent.change(screen.getByLabelText('Message'), {
        target: { value: newFeedback.message }
      });
      fireEvent.change(screen.getByLabelText('Catégorie'), {
        target: { value: newFeedback.category }
      });

      fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/backend/api/feedbacks.php',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFeedback)
        })
      );
    });
  });

  // Test 3: Validation des champs
  test('affiche des erreurs de validation', async () => {
    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('Ajouter un feedback'));
      fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    });

    expect(await screen.findAllByText(/ce champ est requis/i)).toHaveLength(2);
  });

  // Test 4: Gestion des erreurs API
  test('affiche une erreur quand la publication échoue', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Erreur API'))
    );

    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('Ajouter un feedback'));
      fireEvent.change(screen.getByLabelText('titre'), {
        target: { value: 'titre valide' }
      });
      fireEvent.change(screen.getByLabelText('Message'), {
        target: { value: 'Message valide' }
      });
      fireEvent.change(screen.getByLabelText('Catégorie'), {
        target: { value: 'Science' }
      });
      fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    });

    expect(await screen.findByText(/erreur lors de la publication/i)).toBeInTheDocument();
  });

  // Test 5: Réinitialisation après soumission
  test('réinitialise le formulaire après soumission', async () => {
    const newFeedback = {
      title: 'Feedback à réinitialiser',
      message: 'Contenu',
      category: 'Management'
    };

 // Premier appel : récupération des feedbacks
fetch
.mockImplementationOnce(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // on retourne une liste vide
    ok: true,
  })
)
// Deuxième appel : ajout d’un nouveau feedback
.mockImplementationOnce(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ...newFeedback, id: 3, date: '2023-05-21' }),
    ok: true,
  })
);


    await act(async () => {
      render(<App />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTitle('Ajouter un feedback'));
    });

    const titleInput = screen.getByLabelText('Titre');
    const messageInput = screen.getByLabelText('Message');

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: newFeedback.title } });
      fireEvent.change(messageInput, { target: { value: newFeedback.message } });
      fireEvent.change(screen.getByLabelText('Catégorie'), {
        target: { value: newFeedback.category }
      });
      fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    });

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });
});
