import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SearchBar from "@/components/SearchBar";

describe('SearchBar component', () => {
    test('should render the search bar input', () => {
        render(<SearchBar onSearch={() => {}} />);
        const searchInput = screen.getByPlaceholderText('Find a repository');
        expect(searchInput).toBeInTheDocument();
    });

    it('should update the search query when the input value changes', () => {
        const mockOnSearch = jest.fn();
        render(<SearchBar onSearch={mockOnSearch} />);
        const searchInput = screen.getByPlaceholderText('Find a repository');
        const newQuery = 'test-query';
        //@ts-ignore
        fireEvent.change(searchInput, { target: { value: newQuery } });
        searchInput.dispatchEvent(new Event('input'));
        expect(mockOnSearch).toHaveBeenCalledWith(newQuery);
    });
});
