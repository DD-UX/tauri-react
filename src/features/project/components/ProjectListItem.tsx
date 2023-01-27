import {FC, useContext, useState} from 'react';
import {Button, Link, useTheme, useToasts} from '@geist-ui/react';
import {Project} from 'lib/sdk/generated-models/Project';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import XIcon from '@geist-ui/react-icons/x';
import dayjs from 'dayjs';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import deleteProject from 'lib/sdk/methods/project/delete-project';
import NextLink from 'next/link';
import EllipsisText from 'features/app/components/common/EllipsisText';

const ProjectListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(0, 1fr) 8rem 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapHalf};
  padding: ${({$theme}) => $theme.layout.gapHalf} 0;
  align-items: center;

  & + & {
    border-block-start: 0.0625rem solid ${({$theme}) => $theme.palette.border};
  }

  a {
    text-decoration: none;
  }
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
      <EllipsisText h5 my={0}>
        <NextLink href={`/project/${projectId}`} passHref>
          <Link color>{name}</Link>
        </NextLink>
      </EllipsisText>
      <div style={{textAlign: 'end'}}>{dayjs(ctime).format('ddd, D MMM, YYYY')}</div>
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
