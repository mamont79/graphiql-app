import { describe, it, expect } from 'vitest';
import { authors } from './authors';

describe('authors array', () => {
  it('should have the correct length', () => {
    expect(authors).toHaveLength(3);
  });

  it('should have correct data for each author', () => {
    expect(authors).toEqual([
      {
        id: 1,
        image: '/pavel.png',
        name: 'Pavel Dalhou',
        position: 'Team lead',
        linkGH: 'https://github.com/mamont79/',
      },
      {
        id: 2,
        image: '/oleksandr.png',
        name: 'Oleksandr Mazghin',
        position: 'Technical solution',
        linkGH: 'https://github.com/ordinaraviro',
      },
      {
        id: 3,
        image: '/liza.png',
        name: 'Yelyzaveta Vasylenko',
        position: 'Design + develop',
        linkGH: 'https://github.com/ElizabethVasilenko13',
      },
    ]);
  });

  it('should contain valid GitHub links', () => {
    authors.forEach((author) => {
      expect(author.linkGH).toMatch(/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/);
    });
  });
});
