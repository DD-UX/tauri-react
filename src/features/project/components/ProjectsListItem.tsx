import {FC} from 'react';
import {Button, useTheme} from '@geist-ui/react';
import {Project} from 'lib/sdk/generated-models/Project';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import XIcon from '@geist-ui/react-icons/x';
import dayjs from 'dayjs';

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
  const {id, name, ctime} = project;
  console.log('id', id);
  return (
    <ProjectListItemWrapper $theme={theme}>
      <div>{name}</div>
      <div>{dayjs(ctime).format('DD-MM-YYYY')}</div>
      <Button auto icon={<XIcon />} px={0.4} scale={0.75} type="secondary" ghost />
    </ProjectListItemWrapper>
  );
};

export default ProjectListItem;
