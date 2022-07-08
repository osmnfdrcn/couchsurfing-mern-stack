import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 90px 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    width: 100%;
    .search-container{
      min-width: 500px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
    .search-container form{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .search-container input{
        width: 20%;
        padding: 10px;
        outline: none;
        border:1px solid var(--grey-200);
        color: var(--grey-600);
        ::placeholder{
          color: var(--grey-200);
          font-size: 14px;
          text-align: center;
        }
        :focus{
          background-color: var(--primary-100);
        }
        
      }
      .search-container input:nth-child(1){
        width: 25%;
      }

   .user-container{
     width: 100%;
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
     gap: 40px;
   }

   .pagination{
     width: 100%;
     height: 30px;
     display: flex;
     align-items: center;
     justify-content: center;
     gap: 40px;
     color: white;
     position: fixed;
     background-color: var(--primary-900);
     bottom: 0;
     left: 0;
     right: 0;
     z-index: 1000;
   }
   .pagination button {
     font-size: 12px;
     color: white;
     background: transparent;
     padding: 10px 20px;
     border: none;
     cursor: pointer;
   }
.pagination button:disabled {
     cursor: not-allowed;
   }
  .pagination span{
    font-size: 16px;
  }

    
`

export default Wrapper