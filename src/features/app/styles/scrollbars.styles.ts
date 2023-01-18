import {GeistUIThemes} from '@geist-ui/react/dist/themes/presets';
import {css} from 'styled-components';

const scrollbarsMixin = ($theme: GeistUIThemes) => css`
  /* --- These styles are ensuring that scrollbars are consistently styled across browsers. --- */
  /* width */
  ::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 0.6rem;
    background: rgba(0, 0, 0, 0.2);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 0.6rem;
    background: ${$theme.palette.accents_3};
  }
`;

export default scrollbarsMixin;
