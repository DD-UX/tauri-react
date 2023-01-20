import {FC} from 'react';
import Head from 'next/head';
import {ProjectsContextProvider} from 'features/app/context/pages/ProjectsContext';
import ProjectDetailLayout from '../../features/project/components/ProjectDetailLayout';

const ProjectDetailPage: FC = () => {
  return (
    <ProjectsContextProvider>
      <Head>
        <title>Projects</title>
      </Head>
      <ProjectDetailLayout />
    </ProjectsContextProvider>
  );
};

export default ProjectDetailPage;
