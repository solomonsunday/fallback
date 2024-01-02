import { ILoader } from '@/utils/interface';
import React from 'react';
import ReactLoading from 'react-loading';

const Loader = ({ color, height, type, width }: ILoader) => {
    return (
        <div>
            <ReactLoading data-testid={"loader"} type={'spokes'} color={color} width={width} height={height} />
        </div>
    )
}

export default Loader