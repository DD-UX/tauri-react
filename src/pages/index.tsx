import { FC } from "react";
import Head from "next/head";
import { Text } from "@geist-ui/react";

const HomePage: FC = () => {
  return (
    <>
      <Head>
        <title>App component</title>
      </Head>
      <Text h1 type="default">
        Next app is working!
      </Text>
    </>
  );
};

export default HomePage;
