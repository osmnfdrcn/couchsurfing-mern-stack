import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
    .user{
      box-shadow: var(--shadow-4);
      cursor: pointer;
    }
    .user:hover{
    
    .user-info{
      color: white;
    }
  }

  .user-avatar{
    background-color: red;
    width: 100%;
  }
  .user-avatar img{
    width: 100%;
    object-fit: cover;
    object-position: center;
    display: block;

  }
  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: var(--grey-800);
    background-color: var(--primary-500);
  }
  .user-info span{
    display: block;
    letter-spacing: .5px;
    
  }
`

export default Wrapper