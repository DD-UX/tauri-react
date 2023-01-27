import {FC, useContext, useMemo} from 'react';
import {
  Button,
  Keyboard,
  KeyCode,
  KeyMod,
  Link,
  Loading,
  Spacer,
  Text,
  useKeyboard,
  useTheme
} from '@geist-ui/react';
import {
  LayoutColumn,
  LayoutColumnHeader,
  LayoutContent,
  LayoutHeader,
  LayoutHeading,
  LayoutWrapper
} from 'features/app/components/Layout';
import {ProjectsContext} from 'features/app/context/pages/ProjectsContext';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import EllipsisText from 'features/app/components/common/EllipsisText';
import AddProjectForm from './AddProjectForm';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import useProjectById from 'features/project/hooks/useProjectById';

const ProjectDetailLayout: FC = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const theme = useTheme();
  const {projects} = useContext(ProjectsContext);

  const {project: selectedProject, isLoadingProject} = useProjectById(String(projectId));

  const menuProject = useMemo(() => {
    return projects
      .filter(({id}) => id !== projectId)
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [projectId, projects]);

  const handleGoBack = () => {
    router.push('/');
  };

  // Reset form on Escape
  useKeyboard(() => {
    handleGoBack();
  }, [KeyMod.CtrlCmd, KeyCode.KEY_B]);

  return (
    <LayoutWrapper $theme={theme}>
      <LayoutHeader $theme={theme}>
        <LayoutHeading>{selectedProject?.name}</LayoutHeading>
      </LayoutHeader>
      <LayoutColumn $theme={theme}>
        <LayoutColumnHeader $theme={theme}>
          <Button
            auto
            autoFocus
            icon={<ArrowLeft />}
            px={0.6}
            scale={0.75}
            type="secondary"
            ghost
            onClick={handleGoBack}
          >
            Back
            <Spacer inline w={0.5} />
            <Keyboard command scale={0.5}>
              B
            </Keyboard>
          </Button>
          <AddProjectForm />
        </LayoutColumnHeader>
        <Spacer h={0.5} />
        <EllipsisText h3>Other projects</EllipsisText>
        {menuProject?.map(({id, name}) => (
          <EllipsisText key={id} my={0}>
            <NextLink href={`/project/${id}`} passHref shallow>
              <Link color>{name}</Link>
            </NextLink>
          </EllipsisText>
        ))}
      </LayoutColumn>
      <LayoutContent $theme={theme}>
        {isLoadingProject && <Loading>Loading project</Loading>}

        {selectedProject?.tasks?.map(({id, title}) => (
          <EllipsisText key={id} my={0}>
            {title}
          </EllipsisText>
        ))}

        {selectedProject?.tasks && selectedProject?.tasks?.length < 1 && (
          <Text>No available tasks</Text>
        )}
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default ProjectDetailLayout;
