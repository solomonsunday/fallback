import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IUser } from '@/utils/interface';
import UserCard from '@/components/UserCard';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));


const mockUser: IUser = {
    organizations_url: 'https://example.com/organizations_url',
    repos_url: 'https://example.com/repos_url',
    url: 'https://example.com/user_logn',
    avatar_url: 'https://example.com/avatar.jpg',
    login: 'testuser',
    id: 123,
};

describe('UserCard component', () => {
    it('should render the user avatar', () => {
        const { getByAltText, getByText } = render(<UserCard user={mockUser} />);
        const avatarImage = getByAltText('avater_url');
        const userLogin = getByText(mockUser.login)
        const expectedSrc = expect.stringMatching('https%3A%2F%2Fexample.com%2Favatar.jpg&w=256&q=75');
        expect(avatarImage).toBeInTheDocument();
        expect(avatarImage).toHaveAttribute("src", expectedSrc)
        expect(avatarImage).toHaveAttribute("srcset", expectedSrc)
        expect(userLogin).toBeInTheDocument()
    });

    it('should render the user login', () => {
        const { getByText } = render(<UserCard user={mockUser} />);
        expect(getByText(mockUser.login)).toBeInTheDocument();
    });

    it('should navigate to the user profile page when clicked', () => {
        const mockRouter = {
            push: jest.fn(),
        };
        //@ts-ignore
        useRouter.mockReturnValue(mockRouter);
        const { getByTestId } = render(<UserCard user={mockUser}/>);
        const userCard = getByTestId('user-card');
        userCard.click();
        expect(mockRouter.push).toHaveBeenCalledWith(`/user/${mockUser.login}`);
    });
});
