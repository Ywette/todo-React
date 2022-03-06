// import Button from "./Button";
import Button from "@mui/material/Button";
import './FilterBar.css'

const FilterBar = (props: any) => {
    const deadlineTags = props.deadlineTags;

    return (
        <div className="filterBar">
            {deadlineTags.map((tag: string, i: number)=>{
                return (
                    <Button
                        variant="contained"
                        key={i}
                        type="button"
                        className="button"
                        onClick={()=> {
                            props.filterDeadline(tag)
                        }}
                    >{tag}</Button>
                )
            })}
        </div>
    )
}

export default FilterBar;