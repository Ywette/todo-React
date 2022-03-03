import React from 'react';
import { InputProps } from '../interfaces';

const Input = ({type, placeholder, value, onChange, className}: InputProps) => {
    return (
        <input
            className={className}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;