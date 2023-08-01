import { Component } from 'react';
import PropTypes from "prop-types";
import { SearchbarField, Form, Button, Input } from './Searchbar.styled';
import { FcSearch } from "react-icons/fc";

export class Searchbar extends Component{
    state = {
        tag: ''
    }

    inputChange = event => {        
        this.setState({ tag: event.currentTarget.value });
    }

    dataSubmit = event =>{
        event.preventDefault();
      
        this.props.onSubmit(this.state);
        this.reset();
    }
    
    reset = () => {
        this.setState({ tag: '' });
    }

    render() {
        return (
            <SearchbarField>
                <Form onSubmit={this.dataSubmit}>
                    <Button type="submit">
                        <FcSearch/>
                    </Button>

                    <Input
                        name="name"
                        value={this.state.tag}
                        onChange={this.inputChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        required
                        placeholder="Search images and photos"
                    />
                </Form>
            </SearchbarField>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
}