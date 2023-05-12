import {FC} from 'react';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
}

export {MainLayout};
