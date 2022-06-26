import styled from 'styled-components'

const Wrapper = styled.div`
    .comment{
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content :center;
      align-items: flex-start;
    }
    
    .comment:last-child{
      border-bottom: 1px solid var(--grey-200);
    }
    .comment span{
      display: block;
    }
    .comment span:nth-child(1){
      padding: 10px 0;
      font-size: 16px;
      color: var(--grey-700);
    }
    .comment span:nth-child(2){
      font-size: 14px;
      color: var(--grey-500);
    }
`

export default Wrapper

// .comment{

// }
//     .comment: nth - child(even){
//   background - color: var(--primary - 50);
// }
//     .comment: nth - child(odd){
//   background - color: white;
// }
//     .comment: last - child{
//   border - bottom: 1px solid var(--grey - 200);
// }
//     .comment span{
//   display: block;
// }
//     .comment span: nth - child(1){
//   padding: 10px 0;
//   font - size: 16px;
//   color: var(--grey - 700);
// }
//     .comment span: nth - child(2){
//   font - size: 14px;
//   color: var(--grey - 500);
// }