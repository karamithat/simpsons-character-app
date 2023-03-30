import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('should return logo and text', () => {
    render(<Footer />);

    const logo = screen.getByAltText(/The Simpsons Logo/i);
    expect(logo).toBeInTheDocument();

    const text = screen.getByText(/© 2023 Simpsons/i);
    expect(text).toBeInTheDocument();
  });
});