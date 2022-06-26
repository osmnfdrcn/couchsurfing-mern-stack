import styled from 'styled-components'

const Wrapper = styled.div`
    max-width: 400px;
    margin: 0 auto;
    label{
        margin-top: 20px;
    }
    p{
        font-size: 18px;
        color: var(--grey-800);
        border-bottom: 1px solid var(--grey-800);
        margin-top: 40px;
        cursor: pointer;
    }
    .visited{
        position: relative;
        display: inline-block;
        border: 1px solid var(--grey-300);
        background-color: var(--primary-200 );
        padding: 5px;
        font-size: 12px;
    }
    .visited span{
        position: absolute;
        top: -10px;
        right: 0;
        font-size: 15px;
        display: none;
        color: white;
    }
    .visited:hover{
        background-color: #ff4f00;
    }
    .visited:hover span{
        display: block;
    }

    .countries div{
        display: flex;
        position: relative;
    }
    .item-add{
        position: absolute;
        top: 50px;
        right: 0;
        padding: 6px 25px;
        border: none;
        background: var(--grey-300);
        cursor: pointer;
    }

    .update-btn{
        margin-top: 10px;
        display: block;
        width: 100%;
        color: white;
        background-color: #ff4f00;
        padding: 10px;
        border: transparent;
    }
    .avatar-update{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .avatar-update form{
        /* max-width: 300px; */
        outline: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .avatar-update form button{
        border: 1px solid var(--grey-300);
        width: 100%;
    }
    .avatar-update form input{
        border: 1px solid var(--grey-300);
        font-size: 14px;
        background-color: var(--grey-200);
        outline: none;
        width: 100%;
    }
    .avatar{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
    }
    .avatar img{
        object-fit: cover;
        object-position: center;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin: 0 auto;
    }
`

export default Wrapper