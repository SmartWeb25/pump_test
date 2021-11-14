import styled from 'styled-components';
const Container = styled.div`
  max-width: 1280px; 
  margin: 0 auto; 
  padding: 50px 30px;
  @media(max-width: 1440px) {
    width: 100%; 
    padding-left: 15px; 
    padding-right: 15px; 
  }
`;
export default Container;