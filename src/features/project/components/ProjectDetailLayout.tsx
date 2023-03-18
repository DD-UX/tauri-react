import {FC, MouseEvent, useContext, useMemo, useRef, useState} from 'react';
import {
  Button,
  Keyboard,
  KeyCode,
  KeyMod,
  Link,
  Loading,
  Spacer,
  Text,
  useClickAway,
  useKeyboard,
  useMediaQuery,
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
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import EllipsisText from 'features/app/components/common/EllipsisText';
import AddProjectForm from './AddProjectForm';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import AddTaskForm from 'features/task/components/AddTaskForm';
import {ProjectContext} from 'features/app/context/pages/ProjectContext';
import TasksListItem from 'features/task/components/TaskListItem';
import Menu from '@geist-ui/react-icons/menu';
import {AnimatePresence} from 'framer-motion';

const ProjectDetailLayout: FC = () => {
  const router = useRouter();
  const {projectId} = router.query;
  const theme = useTheme();
  const menuElementRef = useRef<HTMLMenuElement | null>(null);
  const {projects} = useContext(ProjectsContext);
  const {project: selectedProject, isLoadingProject} = useContext(ProjectContext);

  const isMobile = useMediaQuery('mobile');
  const [menuVisible, setMenuVisible] = useState(!isMobile);

  const menuProject = useMemo(() => {
    return projects
      .filter(({id}) => id !== projectId)
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [projectId, projects]);

  const handleGoBack = () => {
    router.push('/');
  };

  const handleOpenMenu = (event: MouseEvent) => {
    // Avoid event propagates and trigger clicking away logic that closes the menu
    event.stopPropagation();
    setMenuVisible(true);
  };

  // Reset form on Escape
  useKeyboard(() => {
    handleGoBack();
  }, [KeyMod.CtrlCmd, KeyCode.KEY_B]);

  // Toggle menu
  useKeyboard(() => {
    setMenuVisible((prevState) => !prevState);
  }, [KeyMod.CtrlCmd, KeyCode.KEY_M]);

  useClickAway(menuElementRef, () => {
    setMenuVisible(false);
  });

  // Toggle menu
  useKeyboard(() => {
    setMenuVisible(false);
  }, [KeyCode.Escape]);

  return (
    <LayoutWrapper $theme={theme}>
      <LayoutHeader $theme={theme} $fullWidth={isMobile}>
        {isMobile && (
          <Button
            auto
            tabIndex={0}
            icon={<Menu />}
            px={0.6}
            scale={0.75}
            type="secondary"
            ghost
            onClick={handleOpenMenu}
          >
            Menu
            <Spacer inline w={0.5} />
            <Keyboard command scale={0.5}>
              M
            </Keyboard>
          </Button>
        )}
        <LayoutHeading>{selectedProject?.name}</LayoutHeading>
        <AddTaskForm />
      </LayoutHeader>
      <AnimatePresence mode="wait">
        {(menuVisible || !isMobile) && (
          <LayoutColumn key="motion_layout_column" $theme={theme} ref={menuElementRef}>
            <LayoutColumnHeader $theme={theme}>
              <Button
                auto
                tabIndex={0}
                icon={<ArrowLeft />}
                px={0.6}
                scale={0.75}
                type="default"
                ghost
                onClick={handleGoBack}
              >
                Back
                <Spacer inline w={0.5} />
                <Keyboard command scale={0.5}>
                  B
                </Keyboard>
              </Button>
              <AddProjectForm focusPriority={false} />
            </LayoutColumnHeader>
            <Spacer h={0.5} />
            <EllipsisText h3>Other projects</EllipsisText>
            {menuProject?.map(({id, name}) => (
              <EllipsisText key={id} my={0}>
                <NextLink href={`/project/${id}`} passHref shallow>
                  <Link color onClick={() => setMenuVisible(false)}>
                    {name}
                  </Link>
                </NextLink>
              </EllipsisText>
            ))}
          </LayoutColumn>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <LayoutContent key={selectedProject.id} $theme={theme} $fullWidth={isMobile}>
          {isLoadingProject && <Loading>Loading tasks</Loading>}
          {selectedProject?.tasks?.map((task) => (
            <TasksListItem key={task.id} task={task} />
          ))}
          {selectedProject.tasks && selectedProject?.tasks?.length < 1 && (
            <Text>No available tasks</Text>
          )}
        </LayoutContent>
      </AnimatePresence>
    </LayoutWrapper>
  );
};

export default ProjectDetailLayout;
