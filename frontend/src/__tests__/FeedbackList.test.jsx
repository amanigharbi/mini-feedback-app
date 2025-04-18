import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeedbackList from '../components/FeedbackList';

describe('FeedbackList Component', () => {
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
    }
  ];

  const mockSingleFeedback = [
    {
      id: 3,
      title: 'Super professeur',
      message: 'Le professeur de management est très compétent',
      category: 'Management',
      date: '2023-05-05'
    }
  ];

  const onSelectMock = jest.fn();

  // Test 1: Rendu de la liste des avis
  test('affiche correctement plusieurs feedbacks', () => {
    render(<FeedbackList feedbacks={mockFeedbacks} onSelectFeedback={onSelectMock} />);
    
    expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    expect(screen.getByText('Amélioration nécessaire')).toBeInTheDocument();
    expect(screen.getAllByText(/Catégorie :/)).toHaveLength(2);
  });

  // Test 2: Comportement avec un seul avis
  test('affiche correctement un seul feedback', () => {
    render(<FeedbackList feedbacks={mockSingleFeedback} onSelectFeedback={onSelectMock} />);
    
    expect(screen.getByText('Super professeur')).toBeInTheDocument();
    expect(screen.getAllByText(/Catégorie :/)).toHaveLength(1);
  });

  // Test 3: Affichage quand aucun avis
  test('affiche un message quand il n\'y a pas de feedbacks', () => {
    render(<FeedbackList feedbacks={[]} onSelectFeedback={onSelectMock} />);
    
    expect(screen.getByText('Aucun feedback pour le moment')).toBeInTheDocument();
    expect(screen.queryByText(/Catégorie :/)).not.toBeInTheDocument();
  });

  // Test 4: Mise à jour dynamique
  test('met à jour la liste quand les props changent', () => {
    const { rerender } = render(<FeedbackList feedbacks={[]} onSelectFeedback={onSelectMock} />);
    
    expect(screen.getByText('Aucun feedback pour le moment')).toBeInTheDocument();
    
    rerender(<FeedbackList feedbacks={mockFeedbacks} onSelectFeedback={onSelectMock} />);
    
    expect(screen.getByText('Excellent cours')).toBeInTheDocument();
    expect(screen.queryByText('Aucun feedback pour le moment')).not.toBeInTheDocument();
  });

  // Test 5: Interaction avec un feedback
  test('appelle onSelectFeedback quand on clique sur un feedback', () => {
    render(<FeedbackList feedbacks={mockFeedbacks} onSelectFeedback={onSelectMock} />);
    
    fireEvent.click(screen.getByText('Excellent cours'));
    expect(onSelectMock).toHaveBeenCalledWith(mockFeedbacks[0]);
  });

  // Test 6: Tri des feedbacks (si applicable)
  test('affiche les feedbacks triés par date décroissante', () => {
    const sortedFeedbacks = [...mockFeedbacks].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    render(<FeedbackList feedbacks={sortedFeedbacks} onSelectFeedback={onSelectMock} />);
    
    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles[0]).toHaveTextContent('Excellent cours');
    expect(titles[1]).toHaveTextContent('Amélioration nécessaire');
  });

  // Test 7: Affichage des catégories
  test('affiche les catégories correctement', () => {
    render(<FeedbackList feedbacks={mockFeedbacks} onSelectFeedback={onSelectMock} />);
    
    expect(screen.getByText('Droit')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
  });
});