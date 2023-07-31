import styled from "@emotion/styled";

export const SearchbarField = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);  
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

export const Button = styled.button`
    width: 30px; 
    height: 20px; 
    border: none;
    padding:0;
    background-color: white;
    cursor: pointer;
    display:flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        opacity: 1;
    }
`;

export const Input = styled.input`
    border: none; 
    outline: none;
    width: 270px; 
    height: 20px;
    vertical-align: middle;
    background-color: white;
    &::placeholder {
        font: inherit;
        font-size: 12px;
    }
`;
