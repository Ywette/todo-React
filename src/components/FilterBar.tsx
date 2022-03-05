import Button from "./Button";
import './FilterBar.css'
import {ButtonProps} from "../interfaces";

const FilterBar = (props: any) => {
    const deadlineTags = props.deadlineTags;

    return (
        <div className="filterBar">
            <button className="button">done</button>
            {deadlineTags.map((tag: string, i: number)=>{
                return (
                    <Button
                        key={i}
                        type="button"
                        className="button"
                        value={tag}
                        onClick={()=> {
                            props.filterDeadline(tag)
                        }}
                    />
                )
            })}
        </div>
    )
}

export default FilterBar;