import { describe, expect } from 'vitest';
import { cleanURL } from './index';

describe('cleanURL', () => {
  it('should return the correct URL', () => {
    const url = 'https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png';
    const expected = 'https://static.wikia.nocookie.net/simpsons/images/b/bd/Homer_Simpson.png';
    expect(cleanURL(url)).toBe(expected);
  });

  it('should return the original URL if it does not match the regex', () => {
    const url = 'https://static.wikia.nocookie.net/simpsons.pdf';
    expect(cleanURL(url)).toBe(url);
  });

  it('should return the original URL if the input is not an image URL', () => {
    const url = 'https://static.wikia.nocookie.net/';
    expect(cleanURL(url)).toBe(url);
  });
 
  it('should return the URL if the input is an empty string', () => {
    const url = '';
    const expected = "https://via.placeholder.com/300";
    expect(cleanURL(url)).toBe(expected);
  });   

});