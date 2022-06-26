import styled from 'styled-components'

const Wrapper = styled.div`

    .request{
    position: relative;
    font-size: 14px;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--grey-200);
    gap: 5px;
    box-shadow: var(--shadow-2);
    cursor: pointer;
    :hover{
      background-color: var(--grey-100);
    }
    .name{
      font-size: 17px;
      font-weight: 500;
    }
    .status{
      height: 40px;
      width: 100%;
      padding: 5px 20px;
      text-align: center;
      color: white;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        width: 100%;
        text-align: center;
      }
      .accept,
      .decline{
        font-size: 30px;
        font-weight: 700;
        :hover{
          color: red;
        }
      }

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

  .request-details{
    position: absolute;
    width: 50%;
    min-height: 50%;
    top: 50%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
    box-shadow: var(--shadow-2);
    .icons{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background-color: #ff4f00;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: white;
    }
  }

  @media screen  and (min-width:700px){
    .request-details{
      width: 50%;
      min-height: 50%;
    }
  }
/* 
    @media screen  and (min-width:950px){
    .request-details{
      width: 80%;
      min-height: 60%;
    }
  }

    @media screen  and (min-width:1200px){
    .request-details{
      width: 75%;
      min-height: 50%;
    }
  } */
`

export default Wrapper