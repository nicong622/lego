import { FC } from 'react';
import './styles.css';
export interface IButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    text?: string;
}
export declare const Button: FC<IButtonProps>;
