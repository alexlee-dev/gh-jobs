import styled from "styled-components";

interface StyledInputContainerProps {
  full?: boolean;
}

const StyledInputContainer = styled.div<StyledInputContainerProps>`
  display: flex;
  flex-direction: column;
  margin: ${(props) => (props.full ? "0" : undefined)};
  margin-bottom: 25px;
  max-width: ${(props) => (props.full ? `100%` : `90%`)};
  width: ${(props) => (props.full ? `100%` : ``)};

  @media only screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

const StyledInputInnerContainer = styled.div`
  align-items: stretch;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  width: 100%;

  input {
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #b9bdcf;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-right: 1px solid #b9bdcf;
    border-left: none;
    flex: 1 1 auto;
    font-size: 12px;
    font-weight: 400;
    height: calc(1.5em + 0.75rem + 2px);
    line-height: 14px;
    margin-bottom: 0;
    min-width: 0;
    opacity: 1;
    padding: 0.375rem 0.75rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    width: 1%;

    :focus {
      outline: none;
    }
  }
`;

const StyledLeftContainer = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid #b9bdcf;
  border-bottom-left-radius: 0.25rem;
  border-right: none;
  border-top-left-radius: 0.25rem;
  display: flex;
  margin-right: -1px;
  padding: 0.375rem 0.75rem;
  padding-right: 0;
  text-align: center;

  i {
    color: #b9bdcf;
    font-size: 16px;
  }
`;

const StyledInputLabel = styled.label`
  color: #b9bdcf;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: bold;
  line-height: 21px;
`;

export {
  StyledInputContainer,
  StyledInputLabel,
  StyledInputInnerContainer,
  StyledLeftContainer,
};
