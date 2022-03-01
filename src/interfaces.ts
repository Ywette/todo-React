export interface ButtonProps {
    className: string,
    value?: string,
    type: 'button',
    key?: number,
    onClick?: ()=>void,
}
//delete when finish real planner
export interface TaskProps {
    text: string;
    completed: boolean;
    tag: string;
};

export interface ListItemProp {
    text: string,
    completed: boolean,
    deadline: string,
}