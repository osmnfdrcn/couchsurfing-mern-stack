import styled from 'styled-components'

const Wrapper = styled.main`
  padding: 90px 15%;

  section{
    width: 100%;
  }
  .requests-section{
    width: 100%;
    margin-bottom: 20px;
  }
  .request-card{
    padding: 10px;
    display: grid ;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
`

export default Wrapper