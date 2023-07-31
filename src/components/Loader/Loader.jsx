import { MagnifyingGlass } from 'react-loader-spinner';
import PropTypes from "prop-types";

export const Loader = () => {
    return (
        <MagnifyingGlass 
            visible={true}
            height="50"
            width="50"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#d0ecf6'
            color='#1713f0'
        />
    )  
}
Loader.propTypes = {
    visible: PropTypes.bool,
    height: PropTypes.string,
    width: PropTypes.string,
    ariaLabel: PropTypes.string,
    wrapperStyle: PropTypes.object,
    wrapperClass: PropTypes.string,
    glassColor: PropTypes.string,
    color: PropTypes.string,
}