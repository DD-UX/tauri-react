import {FC} from 'react';
import Head from 'next/head';
import {Button, Text, useTheme} from '@geist-ui/react';
import {
  LayoutContent,
  LayoutHeader,
  LayoutHeading,
  LayoutWrapper
} from 'features/app/components/Layout';
import Plus from '@geist-ui/react-icons/plus';

const HomePage: FC = () => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <LayoutWrapper $theme={theme}>
        <LayoutHeader $theme={theme} $fullWidth>
          <LayoutHeading>Projects</LayoutHeading>
          <Button ml="auto" auto icon={<Plus />} px={0.6} scale={0.75} type="secondary" ghost>
            Add project
          </Button>
        </LayoutHeader>
        <LayoutContent $theme={theme} $fullWidth>
          <Text h2 my={0}>
            List of projects
          </Text>
        </LayoutContent>
      </LayoutWrapper>
    </>
  );
};

export default HomePage;
