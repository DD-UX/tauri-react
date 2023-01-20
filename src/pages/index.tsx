import {FC} from 'react';
import Head from 'next/head';
import {ProjectsContextProvider} from 'features/app/context/pages/ProjectsContext';
import ProjectsLayout from 'features/project/components/ProjectsLayout';

const HomePage: FC = () => {
  return (
    <ProjectsContextProvider>
      <Head>
        <title>Projects</title>
      </Head>
      <ProjectsLayout />
    </ProjectsContextProvider>
  );
};

export default HomePage;
