import { render, screen, waitFor } from '@testing-library/react';
import {useGithubUsers} from '../../hooks/useGithubUsers'
import Home from '../page';

jest.mock('../../hooks/useGithubUsers', () => ({
    useGithubUsers: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: {
            search: '',
        },
    }),
}));

describe('Home component', () => {
    const mockUsersData = [
        { id: 1, login: 'johndoe', avatar_url: 'https://example.com/avatar.jpg' },
        { id: 2, login: 'janedoe', avatar_url: 'https://example.com/avatar2.jpg' },
    ];

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should render the loading indicator in loading state', () => {
        useGithubUsers.mockReturnValue({ loading: true, usersData: [], error: null });
        render(<Home />);
        const loadingIndicator = screen.getByTestId('loader');
        expect(loadingIndicator).toBeInTheDocument();
    });

    test('should render the UserCard components when data is available', async () => {
        useGithubUsers.mockReturnValue({ loading: false, usersData: mockUsersData, error: null });
        render(<Home />);
        await waitFor(() => {
            mockUsersData.forEach((user) => {
                expect(screen.getByText(user.login)).toBeInTheDocument();
            });
            const userCards = screen.getAllByTestId('user-card');
            expect(userCards.length).toBe(2);
        });
    });

    test('should display a message when no users are found', () => {
        useGithubUsers.mockReturnValue({ loading: false, usersData: [], error: null });
        render(<Home />);
        const noUsersMessage = screen.getByText('No User found!');
        expect(noUsersMessage).toBeInTheDocument();
    });
});
