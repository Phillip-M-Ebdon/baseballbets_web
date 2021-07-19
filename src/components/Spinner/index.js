import "./Spinner.css"
import { ReactComponent as SpinnerIcon } from "../../images/bat.svg"
export const Spinner = (spinnerIcon) => {

    return (
        <svg class="spinner" viewBox="0 0 100 100">
            <SpinnerIcon />
        </svg>
    )
}