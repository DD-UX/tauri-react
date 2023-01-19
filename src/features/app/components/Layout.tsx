import styled from "styled-components";
import { GeistThemeProps } from "lib/geist/geist-theme-models";
import { Text } from "@geist-ui/react";

export const LayoutWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-template-rows:
    [app-header-start] 3.5rem [app-header-end] 0
    [app-content-start] minmax(0, 1fr) [app-content-end];
  grid-template-columns:
    [app-column-start] 20rem [app-column-end] 0
    [app-content-start] minmax(0, 1fr) [app-content-end];

  background-color: ${({ $theme }) => $theme.palette.background};
  height: 100%;
  overflow: hidden;
`;

export const LayoutColumn = styled.menu<GeistThemeProps>`
  grid-row-start: app-header-start;
  grid-row-end: app-content-end;
  grid-column-start: app-column-start;
  grid-column-end: app-column-end;

  margin: 0; // reset menu component
  background-color: ${({ $theme }) => $theme.palette.accents_2};
  border-inline-end: 0.0625rem solid ${({ $theme }) => $theme.palette.border};
  padding: ${({ $theme }) => $theme.layout.gapHalf};
  height: 100%;
  overflow: hidden;
`;

export const LayoutHeader = styled.header<
  GeistThemeProps & { $fullWidth?: boolean }
>`
  grid-row-start: app-header-start;
  grid-row-end: app-header-end;
  grid-column-start: ${({ $fullWidth }) =>
    $fullWidth ? "app-column-start" : "app-content-start"};
  grid-column-end: app-content-end;

  display: flex;
  align-items: center;
  gap: ${({ $theme }) => $theme.layout.gapHalf};

  border-block-end: 0.0625rem solid ${({ $theme }) => $theme.palette.border};
  padding: ${({ $theme }) => $theme.layout.gapHalf};
  height: 100%;
  overflow: auto;
`;

export const LayoutHeading = styled(Text).attrs({ my: 0, h4: true })``;

export const LayoutContent = styled.section<
  GeistThemeProps & { $fullWidth?: boolean }
>`
  grid-row-start: app-content-start;
  grid-row-end: app-content-end;
  grid-column-start: ${({ $fullWidth }) =>
    $fullWidth ? "app-column-start" : "app-content-start"};
  grid-column-end: app-content-end;

  background-color: ${({ $theme }) => $theme.palette.accents_1};
  padding: ${({ $theme }) => $theme.layout.gapHalf};
  height: 100%;
  overflow: auto;
`;
