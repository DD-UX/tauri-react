import { useTheme } from "@geist-ui/react";
import { GeistUIThemes } from "@geist-ui/react/dist/themes/presets";
import { createGlobalStyle, css } from "styled-components";

import scrollbarsMixin from "features/app/styles/scrollbars.styles";

const GlobalStylesGenerator = createGlobalStyle`
  html,
  body,
  #__next{
    overflow: hidden;
    -webkit-overflow-scrolling: unset; // iOS property
    height: 100%;
  }
  
  // Make sure the app deals with the banner if pops in
  #__next{
    display: flex;
    flex-direction: column;
  }

  html {    
    -webkit-text-size-adjust: none;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 0.875rem;
    line-height: 1.5;

    ${({ theme }) => {
      // Reset theme prop as unknown since the global styles expect a string (not in use until now)
      const selectedTheme = (theme as unknown) as GeistUIThemes;
      return css`
        background-color: ${selectedTheme?.palette?.background};
        color: ${selectedTheme?.palette?.foreground};
        font-family: ${selectedTheme?.font?.sans};

        * {
          box-sizing: border-box;
          ${scrollbarsMixin(selectedTheme)}
        }
      `;
    }};

    ul, ol {
      li {
        line-height: 1.2;
        margin: 0;
      }
    }

    ul {
      li {
        position: relative;
        &:before {
          content: '\u2022'!important;
        }
      }
    }
  }

  a,
  button {
    &:focus {
      outline: none;
    }
  }
`;

// Wrapper to pass theme to the GlobalStyles
const GlobalStyles = () => {
  const theme = useTheme();

  return <GlobalStylesGenerator theme={theme} />;
};
export default GlobalStyles;
