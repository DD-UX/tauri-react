import {FC, useContext, useState} from 'react';
import {Button, useTheme, useToasts} from '@geist-ui/react';
import {Project} from 'lib/sdk/generated-models/Project';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import XIcon from '@geist-ui/react-icons/x';
import dayjs from 'dayjs';
import {ProjectsContext} from 'features/app/context/pages/ProjectsContext';
import deleteProject from 'lib/sdk/methods/project/delete-project';

const ProjectListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(0, 1fr) 5rem 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  align-items: center;
`;

type ProjectListItem = {
  project: Project;
};

const ProjectListItem: FC<ProjectListItem> = ({project}) => {
  const theme = useTheme();
  const [, setToast] = useToasts();
  const {refreshProjects} = useContext(ProjectsContext);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const {id: projectId, name, ctime} = project;

  const removeProjectHandler = async () => {
    try {
      setIsDeletingProject(true);
      await deleteProject(projectId);
      setToast({
        text: `${name} project deleted successfully`,
        type: 'success'
      });
      refreshProjects();
    } catch (error) {
      setToast({
        text: `An error occurred while deleting ${name} project.`,
        type: 'error'
      });
    } finally {
      setIsDeletingProject(false);
    }
  };
  return (
    <ProjectListItemWrapper $theme={theme}>
      <div>{name}</div>
      <div>{dayjs(ctime).format('ddd, D MMM, YYYY')}</div>
      <Button
        auto
        icon={<XIcon />}
        px={0.4}
        scale={0.75}
        type="error"
        ghost
        loading={isDeletingProject}
        onClick={removeProjectHandler}
      />
    </ProjectListItemWrapper>
  );
};

export default ProjectListItem;
