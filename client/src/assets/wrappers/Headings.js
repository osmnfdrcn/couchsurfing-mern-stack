import styled from 'styled-components'

const Wrapper = styled.div`
  .main-heading{
    color: var(--gray-400);
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 6px;
  }

 .section-heading{
  color: var(--grey-500);
  font-size: 20px;
  width: 100%;
  border-bottom: 1px solid var(--grey-400);
  cursor: pointer;
  margin-top: 40px;

  span{
    color: var(--gray-800);
    font-size: 20px;
    margin-right: 10px;
  }
}
`

export default Wrapper