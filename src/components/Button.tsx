import { ButtonProps } from '../interfaces';

const Button = ({className, value, onClick, type = 'button'}: ButtonProps) => (
    <button
        className={className}
        type={type}
        onClick={onClick}
    >
        {value}
    </button>
);

export default Button;