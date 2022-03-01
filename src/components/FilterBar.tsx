import Button from "./Button";
import './FilterBar.css'

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
                    />
                )
            })}
        </div>
    )
}

export default FilterBar;