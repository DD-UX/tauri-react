import {FC, useContext} from 'react';
import {Loading, Text, useTheme} from '@geist-ui/react';
import {
  LayoutContent,
  LayoutHeader,
  LayoutHeading,
  LayoutWrapper
} from 'features/app/components/Layout';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import AddProjectButton from 'features/project/components/AddProjectButton';
import ProjectListItem from 'features/project/components/ProjectListItem';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import {AnimatePresence} from 'framer-motion';

const ProjectsListWrapper = styled.div<GeistThemeProps>`
  display: grid;
  //gap: ${({$theme}) => $theme.layout.gapHalf};
`;

const ProjectsLayout: FC = () => {
  const theme = useTheme();
  const {isLoadingProjects, projects} = useContext(ProjectsContext);

  return (
    <LayoutWrapper $theme={theme}>
      <LayoutHeader $theme={theme} $fullWidth>
        <LayoutHeading>Projects</LayoutHeading>
        <AddProjectButton />
      </LayoutHeader>

      <AnimatePresence mode="wait">
        <LayoutContent $theme={theme} $fullWidth>
          {isLoadingProjects && <Loading>Loading projects</Loading>}
          <ProjectsListWrapper $theme={theme}>
            {projects?.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </ProjectsListWrapper>
          {projects?.length < 1 && <Text>No available projects</Text>}
        </LayoutContent>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default ProjectsLayout;
