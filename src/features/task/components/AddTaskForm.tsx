import {FC, FormEvent, useContext, useState} from 'react';
import {Button, Input, KeyCode, useKeyboard, useTheme, useToasts} from '@geist-ui/react';
import {ProjectContext} from 'features/app/context/pages/ProjectContext';
import createTask from 'lib/sdk/methods/task/create-task';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import Save from '@geist-ui/react-icons/save';

const AddTaskFormWrapper = styled.form<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(6rem, 12rem) 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapQuarter};
  align-items: center;
  margin-inline-start: auto;
`;

const AddTaskForm: FC = () => {
  const [, setToast] = useToasts();
  const theme = useTheme();
  const {project, refreshProject} = useContext(ProjectContext);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // This restores the field value and handles the close
  const resetForm = () => {
    setNewTaskTitle('');
  };

  // Reset form on Escape
  useKeyboard(() => {
    resetForm();
  }, [KeyCode.Escape]);

  // Handle add task
  const addTaskHandler = async (event: FormEvent) => {
    // Prevent form submit complete behavior through HTML
    event.preventDefault();
    event.stopPropagation();

    // Avoid saving when name is empty
    if (newTaskTitle.length < 1) {
      return;
    }

    // Handle creation
    try {
      setIsCreatingTask(true);
      await createTask({
        title: newTaskTitle,
        project_id: project.id
      });
      await refreshProject();
      setToast({
        text: `Task ${newTaskTitle} created successfully.`,
        type: 'success'
      });
      resetForm();
    } catch (error) {
      setToast({
        text: `An error occurred while creating ${newTaskTitle} task.`,
        type: 'error'
      });
    } finally {
      setIsCreatingTask(false);
    }
  };

  return (
    <AddTaskFormWrapper $theme={theme} onSubmit={addTaskHandler}>
      <Input
        tabIndex={0}
        autoFocus
        width="100%"
        initialValue={newTaskTitle}
        value={newTaskTitle}
        placeholder="New task"
        onChange={(event) => setNewTaskTitle(event.target.value)}
        clearable
      />
      <Button
        auto
        icon={<Save />}
        htmlType="submit"
        loading={isCreatingTask}
        disabled={newTaskTitle.length < 1}
        px={0.6}
        scale={0.75}
        type="success"
      />
    </AddTaskFormWrapper>
  );
};

export default AddTaskForm;
