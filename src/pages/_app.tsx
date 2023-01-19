import { FC } from "react";
import Head from "next/head";
import { GeistProvider } from "@geist-ui/react";
import GlobalStyles from "features/app/styles/global.styles";
import GeistStyles from "lib/geist/geist.styles";
import { AppProps } from "next/app";

const AppPage: FC<AppProps> = ({ Component }) => {
  return (
    <GeistProvider themeType="dark">
      <Head>
        <title>Todo app</title>
      </Head>
      {/* Styles */}
      <GlobalStyles />
      <GeistStyles />

      {/* Page component */}
      <Component />
    </GeistProvider>
  );
};

export default AppPage;
