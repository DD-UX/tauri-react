import {FC, FormEvent, useContext, useState} from 'react';
import {Button, Input, KeyCode, useKeyboard, useTheme, useToasts} from '@geist-ui/react';
import {ProjectsContext} from 'features/app/context/ProjectsContext';
import createProject from 'lib/sdk/methods/project/create-project';
import styled from 'styled-components';
import {GeistThemeProps} from 'lib/geist/geist-theme-models';
import Save from '@geist-ui/react-icons/save';

const AddProjectFormWrapper = styled.form<GeistThemeProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: minmax(6rem, 12rem) 2.5rem;
  gap: ${({$theme}) => $theme.layout.gapQuarter};
  align-items: center;
`;

type AddProjectFormProps = {
  focusPriority?: boolean;
  onClose?(): void;
};
const AddProjectForm: FC<AddProjectFormProps> = ({focusPriority = true, onClose}) => {
  const [, setToast] = useToasts();
  const theme = useTheme();
  const {refreshProjects} = useContext(ProjectsContext);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  // This restores the field value and handles the close
  const resetForm = () => {
    onClose?.();
    setNewProjectName('');
  };

  // Reset form on Escape
  useKeyboard(() => {
    resetForm();
  }, [KeyCode.Escape]);

  // Handle add project
  const addProjectHandler = async (event: FormEvent) => {
    // Prevent form submit complete behavior through HTML
    event.preventDefault();
    event.stopPropagation();

    // Avoid saving when name is empty
    if (newProjectName.length < 1) {
      return;
    }

    // Handle creation
    try {
      setIsCreatingProject(true);
      await createProject({
        name: newProjectName
      });
      await refreshProjects();
      setToast({
        text: `Project ${newProjectName} created successfully.`,
        type: 'success'
      });
      resetForm();
    } catch (error) {
      setToast({
        text: `An error occurred while creating ${newProjectName} project.`,
        type: 'error'
      });
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <AddProjectFormWrapper $theme={theme} onSubmit={addProjectHandler}>
      <Input
        autoFocus={focusPriority}
        tabIndex={-1}
        width="100%"
        initialValue={newProjectName}
        value={newProjectName}
        placeholder="New project name"
        onChange={(event) => setNewProjectName(event.target.value)}
      />
      <Button
        auto
        icon={<Save />}
        htmlType="submit"
        loading={isCreatingProject}
        disabled={newProjectName.length < 1}
        px={0.6}
        scale={0.75}
        type="success"
      />
    </AddProjectFormWrapper>
  );
};

export default AddProjectForm;
