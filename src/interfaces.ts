import React from "react";

export interface ButtonProps {
    className: string,
    value?: string,
    type: 'button'|'submit',
    key?: number,
    onClick?: ()=>void | undefined,
}

export interface ListItemProp {
    text: string;
    deadline: string;
    completed?: boolean;
}

export interface InputProps {
    className: string,
    type: string,
    name?: string,
    placeholder?: string,
    value?: string,
    autocomplete?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

