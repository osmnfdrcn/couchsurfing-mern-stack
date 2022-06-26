import styled from 'styled-components'

const Wrapper = styled.nav`
    /* height: var(--nav-height); */
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--primary-500); 
    height: 60px;
    padding: 0 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-link{
        font-size: 15px;
        display: inline-block;
        padding-bottom: 2px;
        text-transform: uppercase;
        margin-right: 15px;
        color: white;
    }
    .nav-link:hover{
      color: var(--grey-900);
      
    }
    /* .active{
        color: #ff4f00;
       border-bottom: 1px solid var(--primary-500);
    } */

    .avatar {
        width: 30px;
        height: 30px;

    
    }
    .avatar img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .avatar-menu{
        position: relative;
        width: auto;

    }
    .avatar-menu ul{
        position: absolute;
        top: -10px;
        right: -25px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        background-color: var(--primary-200);
        border: transparent;
        font-size: 14px;
        color: var(--grey-900); 
    }        
.avatar-menu ul li:hover{
    color: white;      
    cursor: pointer;
}            


`

export default Wrapper

