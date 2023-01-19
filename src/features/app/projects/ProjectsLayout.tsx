import {FC, useContext} from 'react';
import {Button, Loading, Text, useTheme} from '@geist-ui/react';
import {
  LayoutContent,
  LayoutHeader,
  LayoutHeading,
  LayoutWrapper
} from 'features/app/components/Layout';
import Plus from '@geist-ui/react-icons/plus';
import {ProjectsContext} from 'features/app/context/pages/ProjectsContext';

const ProjectsLayout: FC = () => {
  const theme = useTheme();
  const {isLoadingProjects, projects} = useContext(ProjectsContext);
  return (
    <LayoutWrapper $theme={theme}>
      <LayoutHeader $theme={theme} $fullWidth>
        <LayoutHeading>Projects</LayoutHeading>
        <Button ml="auto" auto icon={<Plus />} px={0.6} scale={0.75} type="secondary" ghost>
          Add project
        </Button>
      </LayoutHeader>
      <LayoutContent $theme={theme} $fullWidth>
        {isLoadingProjects ? (
          <Loading>Loading projects</Loading>
        ) : (
          <Text h2 my={0}>
            List of projects
          </Text>
        )}
        {projects?.map(({id, name}) => (
          <div key={id}>{name}</div>
        ))}
        {projects?.length < 1 && <Text>No available projects</Text>}
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default ProjectsLayout;
