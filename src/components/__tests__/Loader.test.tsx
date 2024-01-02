import React from 'react';
import { render } from '@testing-library/react';
import {ILoader} from "@/utils/interface";
import Loader from "@/components/Loader";

describe('Loader component', () => {
    it('should render the loader with the specified props', () => {
        const mockLoaderProps: ILoader = {
            color: 'blue',
            height: 50,
            type: 'spokes',
            width: 100,
        };

        const { getByTestId } = render(<Loader {...mockLoaderProps} />);
        const loader = getByTestId('loader');

        expect(loader).toBeInTheDocument();
        expect(loader).toHaveStyle({
            fill: mockLoaderProps.color,
            height: `${mockLoaderProps.height}px`,
            width: `${mockLoaderProps.width}px`,
        });
    });
});
