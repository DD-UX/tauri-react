import {useTheme} from '@geist-ui/react';
import {createGlobalStyle} from 'styled-components';

import Z_INDEX from 'features/app/styles/zIndex.styles';

/*
 * <Text />, <Button />, <Input />, <Select />, <Textarea /> overrides
 */
const GeistStyles = () => {
  const theme = useTheme();
  const GlobalCSS = createGlobalStyle`
  body {
    h1 {
      font-size: 1.8rem;
    }

    h2 {
      font-size: 1.6rem;
    }

    h3 {
      font-size: 1.4rem;
    }

    h4 {
      font-size: 1.25rem;
    }

    h5 {
      font-size: 1.125rem;
    }

    h6 {
      font-size: 1rem;
    }

    h1, h2, h3 {
      font-weight: 300;
    }

    h4, h5, h6 {
      font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, p {
      margin: 0 0 ${theme.layout.gapQuarter};
    }
    
    button.btn, p {
      font-size: 0.875rem;
    }

    button.btn {
      font-weight: 550 !important;
      // The default within geist was to have this set to auto, which would break many instances where the parent would set pointer-events: none.
      pointer-events: inherit !important;
    }

    p,
    .select .value,
    .input-wrapper input,
    textarea {
      font-weight: 500;
    }

    .input-icon {
      box-sizing: content-box;
    }

    small {
      font-weight: 600;
      font-size: 0.6rem;
    }

    .select-dropdown,
    .tooltip-content {
      border: 0.0625rem solid rgba(122, 122, 122, 0.5);
    }
    
    .tooltip-content {
      span:empty {
        display: none;
      }
      
      &.popover {
        // This removes the predefined padding that is put on the popover, which is undesired when creating a custom popover.
        > .inner {
          padding: 0 !important;
        }
        // This brings popover one layer above side drawer
        // It's needed for the full screen zone map
        z-index: ${Z_INDEX.popover};
      }
    }
    
    // Reason: with Geist 2.2.0 the toggle experiences an offset towards the bottom, regardless its context.
    .toggle {
      margin-top: -0.3rem;
    }

    // This is used to apply a simple light border for the dark theme modals when we need the extra pop.
    .dark-mode-modal {
      border: 0.0625rem solid rgba(122, 122, 122, 0.5);
    }
    
    // NOTE: we use a constant POPOVER_BOX_SHADOW_CLASS in association with portalClassName to insert on popovers to provide this box-shadow effect.
    .popover-box-shadow {
      box-shadow: 0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2), 0 0.4rem 0.5rem 0 rgba(0, 0, 0, 0.19) !important;
    }
  }
`;

  return <GlobalCSS />;
};

export default GeistStyles;
