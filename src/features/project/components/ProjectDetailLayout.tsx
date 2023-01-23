import {FC, useContext, useMemo, useState} from 'react';
import {Button, Keyboard, Link, Spacer, Text, useTheme} from '@geist-ui/react';
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
import AddProjectForm from './AddProjectForm';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';

const ProjectDetailLayout: FC = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const theme = useTheme();
  const {projects} = useContext(ProjectsContext);
  // TODO get project details from its own context
  const selectedProject = useMemo(() => {
    return projects.find(({id}) => id === projectId);
  }, [projectId, projects]);
  const menuProject = useMemo(() => {
    return projects
      .filter(({id}) => id !== projectId)
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [projectId, projects]);

  return (
    <LayoutWrapper $theme={theme}>
      <LayoutHeader $theme={theme}>
        <LayoutHeading>{selectedProject?.name}</LayoutHeading>
      </LayoutHeader>
      <LayoutColumn $theme={theme}>
        <div style={{display: 'flex', justifyContent: 'space-between', gap: theme.layout.gapHalf}}>
          <Button
            auto
            autoFocus
            icon={<ArrowLeft />}
            px={0.6}
            scale={0.75}
            type="secondary"
            ghost
            onClick={() => router.push('/')}
          >
            Back
            <Spacer inline w={0.5} />
            <Keyboard command scale={0.5}>
              B
            </Keyboard>
          </Button>
          <AddProjectForm />
        </div>
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
        <Text>No available tasks</Text>
      </LayoutContent>
    </LayoutWrapper>
  );
};

export default ProjectDetailLayout;
