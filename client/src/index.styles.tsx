import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 3rem;
        font-family: 'Montserrat', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: rgb(35,37,38);
        background: linear-gradient(75deg, rgba(35,37,38,1) 0%, rgba(65,67,69,1) 100%);
    }

    * {
        margin: 0;
        padding: 0;
    }
`;
