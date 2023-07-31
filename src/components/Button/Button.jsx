import { ButtonEl } from './Button.styled';
//import PropTypes from "prop-types";

export const Button = ({onClick}) => {
    return (
        <ButtonEl type="button" onClick={onClick}>Load more</ButtonEl>
    )
}


//onClick в  параметр функции
// onClick={onClick}
//прописать проптип onClick