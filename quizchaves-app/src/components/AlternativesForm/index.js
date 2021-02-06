/* eslint-disable */
import styled from 'styled-components';
// Trabalhando as alternativas
const AlternativesForm = styled.form`
  label {
    &[data-selected="true"] {
      background-color: ${({ theme }) => theme.colors.mainBg};
      
      &[data-status="SUCCESS"] {
        background-color: ${({ theme }) => theme.colors.cert};
      }
      &[data-status="ERROR"] {
        background-color: ${({ theme }) => theme.colors.fonttex};
      }
    }
    &:focus {
      opacity: 1;
    } 
  }
  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;