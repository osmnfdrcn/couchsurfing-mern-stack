import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  .user-layout{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;

  }

  .user-avatar{
    width: 100%;
    position: relative;
  }
  .user-avatar span{
    position: absolute;
    top:10px;
    left: 10px;
  }
  .user-avatar img{
    display: block;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .user-info{
    width: 100%;
  }
  .heading{
      font-size: 17px;
      display: block;
      width: 100%;
      color: var(--grey-600);
      border-bottom: 1px solid var(--grey-300);
      cursor: pointer;
    }
    .data{
      display: flex;
    }
    .key,
    .value{
      display: inline-block;
      width: 50%;
      color: var(--grey-500);
    }
    .countries{
      flex: 1;
      display: block;
    }
    .rules{
      display: inline-block;
      flex: 1;
    }
    .liste{
      display: flex;
      flex-direction: column;
    }
    .liste span{
      width: 100%;
    }
    form{
      margin-bottom: 20px;
    }
    textarea{
      width: 100%;
      height: 250px;
      padding: 10px;
      border: 1px solid var(--grey-200);
      border-radius: 4px;
      font-size: 16px;
      resize: none;
      margin-bottom: auto;
    }
    textarea:focus{
      outline: none;
    }
    .single-comment:nth-child(even){
      background-color: var(--primary-50);
    }
    .single-comment:nth-child(odd){
      background-color: white;
    }

    .request-form{
      padding: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      right: 50%;
      transform: translate(-50%, -50%);
      color: var(--grey-600);
      background-color: var(--grey-100);
      width: 95%;
      
      

    }
    .form-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .input-fields{
      display: flex;
    }
    .dateIn,
    .dateOut{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .close{
      font-size: 30px;
      cursor: pointer;
    }
    .request-form input {
      border: 1px solid var(--grey-300);
      border-radius: 5px;
      background-color: #fff;
      padding: 10px 5px;
      box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
      max-width: 200px;
      margin-right: 20px;
      color: var(--grey-600);
      
    }
    .request-form textarea{
      margin-top: 20px;
      border: 1px solid var(--grey-300);
      color: var(--grey-600);
      height: 40vh;
    }
    
  @media screen and (min-width: 1000px){
    .user-layout{
      flex-direction: row;
      gap: 100px;
    }
    .user-avatar{
      flex: 2;
    }
    .user-info{
      flex: 1;
    }
    .request-form{
      width: 50%;
    }
    .request-form textarea{
      height: 30vh;
    }
    
  }

`

export default Wrapper