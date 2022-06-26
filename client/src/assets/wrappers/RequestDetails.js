import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .avatar{
    width: 100%;
    position: relative;
    img{
      display: block;
      width: 100%;
      max-height: 80vh;
      object-fit: cover;
      object-position: center;
      margin-bottom: 10px;
    }
    .status{
      display: block;
      position: absolute;
      text-transform: uppercase;
      top: 15px;
      right: 15px;
      display: block;
      color: white  ;
      padding: 5px 10px;
      
    }
  }
    .accepted{
      background-color: green;
    }
    .declined{
      background-color: red;
    }
    .pending{
      background-color: var(--grey-700);
    }
    
  .details{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .name{
    font-size: 18px;
    color: var(--grey-800);
    letter-spacing: 1px;
  }
  .location,
  .dates{
    font-size: 15px;
    color: var(--grey-700);
  }
  .message{
    text-align: justify;
  }
  .buttons{
    margin-top: 30px;
  }
  .buttons span{
    cursor: pointer;
    padding: 10px 20px;
    outline: none;
    color: white;
  }
  .accept{
    background-color: green;
  }
  .decline{
    background-color: red;
  }
  
  @media screen and (min-width: 1000px){
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    .avatar{
      flex: 2;
    }
    .details{
      flex: 3;
    }
    
  }
`

export default Wrapper