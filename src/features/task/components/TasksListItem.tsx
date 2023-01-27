import {FC, useContext, useState} from 'react';
import {Button, Toggle, useTheme, useToasts} from '@geist-ui/react';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import XIcon from '@geist-ui/react-icons/x';
import dayjs from 'dayjs';
import EllipsisText from 'features/app/components/common/EllipsisText';
import {Task} from 'lib/sdk/generated-models/Task';
import deleteTask from 'lib/sdk/methods/task/delete-task';
import {ProjectContext} from 'features/app/context/pages/ProjectContext';

const TaskListItemWrapper = styled.div<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1.5rem minmax(0, 1fr) 8rem 2.5rem;
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

type TaskListItem = {
  task: Task;
};

const TaskListItem: FC<TaskListItem> = ({task}) => {
  const theme = useTheme();
  const [, setToast] = useToasts();
  const {refreshProject} = useContext(ProjectContext);
  const [isDeletingTask, setIsDeletingTask] = useState(false);
  const {id: taskId, title, ctime, done} = task;

  const removeTaskHandler = async () => {
    try {
      setIsDeletingTask(true);
      await deleteTask(taskId);
      setToast({
        text: `${title} task deleted successfully`,
        type: 'success'
      });
      refreshProject();
    } catch (error) {
      setToast({
        text: `An error occurred while deleting ${title} task.`,
        type: 'error'
      });
    } finally {
      setIsDeletingTask(false);
    }
  };
  return (
    <TaskListItemWrapper $theme={theme}>
      <div>
        <Toggle initialChecked={done} checked={done} />
      </div>
      <EllipsisText h5 my={0}>
        {title}
      </EllipsisText>
      <div style={{textAlign: 'end'}}>{dayjs(ctime).format('ddd, D MMM, YYYY')}</div>
      <Button
        auto
        icon={<XIcon />}
        px={0.4}
        scale={0.75}
        type="error"
        ghost
        loading={isDeletingTask}
        onClick={removeTaskHandler}
      />
    </TaskListItemWrapper>
  );
};

export default TaskListItem;
