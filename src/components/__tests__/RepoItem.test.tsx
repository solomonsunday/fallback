import { IRepo } from '@/utils/interface';
import React from 'react';
import { render } from '@testing-library/react';
import RepoItem from "@/components/RepoItem";

const mockRepo: IRepo = {
    id: 1,
    name: 'test-repo',
    forks_url: 'https://api.github.com/repos/username/test-repo/forks',
    description: 'This is a test repo',
    language: 'JavaScript',
    updated_at: '2023-12-05T13:40:44Z',
    visibility: 'public',
};

describe('RepoItem component', () => {
    test('should render the repo item with the specified props', () => {
        const { getByText, getByRole } = render(<RepoItem repo={mockRepo} />);

        expect(getByText(mockRepo.name)).toBeInTheDocument();
        expect(getByText(mockRepo.visibility)).toBeInTheDocument();
        expect(getByText(mockRepo.forks_url)).toBeInTheDocument();
        expect(getByText(mockRepo.language)).toBeInTheDocument();
        expect(getByText('testing')).toBeInTheDocument();
    });
});
