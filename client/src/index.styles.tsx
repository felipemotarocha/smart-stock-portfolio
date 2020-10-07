import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        background-color: #343637;

        padding: 3rem 5rem;
        box-sizing: border-box;
        height: 100vh;


        color: #eee;

        
    }

    
`;
