import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Search Feedback Functionality', () => {
  const mockFeedbacks = [
    {
      id: 1,
      title: 'Excellent cours',
      message: 'Le cours de droit était très instructif',
      category: 'Droit',
      date: '2023-05-15'
    },
    {
      id: 2,
      title: 'Amélioration nécessaire',
      message: 'Le laboratoire de science pourrait être mieux équipé',
      category: 'Science',
      date: '2023-05-10'
    },
    {
      id: 3,
      title: 'Super professeur',
      message: 'Le professeur de management est très compétent',
      category: 'Management',
      date: '2023-05-05'
    }
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFeedbacks),
        ok: true,
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Test 1: Recherche avec un terme valide affiche les résultats correspondants', async () => {
    render(<App />);
    
    // Attendre que les feedbacks soient chargés
    await waitFor(() => {
      expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('🔍 Rechercher...');
    fireEvent.change(searchInput, { target: { value: 'droit' } });
    
    // Vérifier que seul le feedback correspondant est affiché
    expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    expect(screen.queryByText('Amélioration nécessaire')).not.toBeInTheDocument();
    expect(screen.queryByText('Super professeur')).not.toBeInTheDocument();
  });

  test('Test 2: Recherche avec un terme invalide n\'affiche aucun résultat', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('🔍 Rechercher...');
    fireEvent.change(searchInput, { target: { value: 'xyz123' } });
    
    // Vérifier qu'aucun feedback n'est affiché
    await waitFor(() => {
      expect(screen.queryByText('Excellent cours')).not.toBeInTheDocument();
      expect(screen.queryByText('Amélioration nécessaire')).not.toBeInTheDocument();
      expect(screen.queryByText('Super professeur')).not.toBeInTheDocument();
    });
  });

  test('Test 3: Recherche avec un terme partiel affiche les résultats correspondants', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('🔍 Rechercher...');
    fireEvent.change(searchInput, { target: { value: 'prof' } });
    
    // Vérifier que seul le feedback contenant "prof" est affiché
    expect(screen.getByText('Super professeur')).toBeInTheDocument();
    expect(screen.queryByText('Excellent cours')).not.toBeInTheDocument();
    expect(screen.queryByText('Amélioration nécessaire')).not.toBeInTheDocument();
  });

  test('Test 4: La recherche n\'est pas sensible à la casse', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('🔍 Rechercher...');
    fireEvent.change(searchInput, { target: { value: 'DROIT' } });
    
    // Vérifier que le feedback est trouvé malgré la casse différente
    expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    expect(screen.queryByText('Amélioration nécessaire')).not.toBeInTheDocument();
  });

  test('Test 5: La recherche fonctionne à la fois sur le titre et le message', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    });
    
    // Recherche par titre
    const searchInput = screen.getByPlaceholderText('🔍 Rechercher...');
    fireEvent.change(searchInput, { target: { value: 'excellent' } });
    expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    
    // Recherche par message
    fireEvent.change(searchInput, { target: { value: 'laboratoire' } });
    expect(screen.getByText('Amélioration nécessaire')).toBeInTheDocument();
  });
});