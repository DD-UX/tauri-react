import {FC} from 'react';
import Head from 'next/head';
import ProjectDetailLayout from 'features/project/components/ProjectDetailLayout';
import {ProjectContextProvider} from 'features/app/context/pages/ProjectContext';

const ProjectDetailPage: FC = () => {
  return (
    <ProjectContextProvider>
      <Head>
        <title>Projects</title>
      </Head>
      <ProjectDetailLayout />
    </ProjectContextProvider>
  );
};

export default ProjectDetailPage;
