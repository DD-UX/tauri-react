import {FC, useContext, useMemo} from 'react';
import {Link, Text, useTheme} from '@geist-ui/react';
import {
  LayoutColumn,
  LayoutContent,
  LayoutHeader,
  LayoutHeading,
  LayoutWrapper
} from 'features/app/components/Layout';
import {ProjectsContext} from 'features/app/context/pages/ProjectsContext';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import EllipsisText from 'features/app/components/common/EllipsisText';

const ProjectDetailLayout: FC = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const theme = useTheme();
  const {projects} = useContext(ProjectsContext);
  // TODO get project details from its own context
  const selectedProject = useMemo(() => {
    return projects.find(({id}) => id === projectId);
  }, [projectId, projects]);

  return (
    <LayoutWrapper $theme={theme}>
      <LayoutHeader $theme={theme}>
        <LayoutHeading>{selectedProject?.name}</LayoutHeading>
      </LayoutHeader>
      <LayoutColumn $theme={theme}>
        {projects?.map(({id, name}) => (
          <EllipsisText key={id} my={0}>
            <NextLink href={`/project/${id}`} passHref shallow>
              <Link color>{name}</Link>
            </NextLink>
          </EllipsisText>
        ))}
      </LayoutColumn>
      <LayoutContent $theme={theme}>
        <Text>No available tasks</Text>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default ProjectDetailLayout;
