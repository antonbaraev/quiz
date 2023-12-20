import { FC, ReactNode } from 'react';
import './index.css';

interface LoadableProps {
    isLoading: boolean;
    children: ReactNode;
}

const Loadable: FC<LoadableProps> = ({ isLoading, children }) => (
    isLoading ? <span className="loader"/> : children
);

export default Loadable;