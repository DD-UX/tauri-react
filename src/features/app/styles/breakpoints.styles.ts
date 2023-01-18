import {math} from 'polished';

/**
 * It is important to bind the object of breakpoints to a variable for memoization to work correctly.
 * If they are created dynamically, try using the `useMemo` hook.
 */

// NOTE: These breakpoints are matching Geist's to avoid issues with useMediaQuery hook.
// For some reason it seems overriding the theme's defaults are not being taken in account by the hook.
// (if the mountain doesn't come to muhammad)
// https://geist-ui.dev/en-us/hooks/use-media-query#custom-breakpoints
export const breakpoints = {
  sizes: {
    xs: '0',
    sm: '650px',
    md: '900px',
    lg: '1280px',
    xl: '1920px'
  },
  up,
  down,
  between
};

// Alias for sizes config
const bp = breakpoints.sizes;

type bpKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Media of at least the minimum breakpoint width. No query for the smallest breakpoint
// Note: this method uses polished 'math' formula to add one more pixel to the size to evaluate.
// - Reasoning: having down and up the same value could cause dis-phasing of a single pixel when these methods are combined,
// - resulting in mixing overlapping two different experiences (this is commonly seen in between sm and md in many apps)
function up(key: bpKey = 'xs') {
  return `@media only screen and (min-width: ${math(`${bp[key]} + 1px`)})`;
}

// Media of at most the maximum breakpoint width. No query for the largest breakpoint.
function down(key: bpKey = 'xs') {
  return `@media only screen and (max-width: ${bp[key]})`;
}

// Media that spans multiple breakpoint widths.
function between(minKey: bpKey = 'xs', maxKey: bpKey = 'xl') {
  return `@media only screen and (min-width: ${bp[minKey]}) and (max-width: ${bp[maxKey]})`;
}

export default breakpoints;
