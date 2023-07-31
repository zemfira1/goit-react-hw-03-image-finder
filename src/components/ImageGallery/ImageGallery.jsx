import {Gallery} from './ImageGallery.styled';
import PropTypes from "prop-types";
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images }) => {
    return (
        <Gallery>
            {images.map(({ id, webformatURL, largeImageURL, tag}) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tag={tag}
                />
            ))}
        </Gallery>
    )  
};

ImageGallery.propTypes = {
    images: PropTypes.array,
    id: PropTypes.number,
};
