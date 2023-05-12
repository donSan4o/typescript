import {FC} from 'react';
import { CarForm, Cars } from '../components';
import { useAppSelector } from '../hooks';

const CarPage: FC = () => {
    const {errors} = useAppSelector(state => state.carReducer)
    
    return (
        <div>
            <CarForm/>
            {errors?.detail && <h2>{errors.detail}</h2>}
            {errors?.brand && <h2>Brand error: {errors.brand}</h2>}
            {errors?.price && <h2>Price error: {errors.price}</h2>}
            {errors?.year && <h2>Year error: {errors.year}</h2>}
            <Cars/>
        </div>
    );
}

export {CarPage};
