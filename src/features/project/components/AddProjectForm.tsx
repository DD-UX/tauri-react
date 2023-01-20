import {FC, FormEvent, useContext, useState} from 'react';
import {Button, Input, useTheme, useToasts} from '@geist-ui/react';
import {ProjectsContext} from 'features/app/context/pages/ProjectsContext';
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
  onClose(): void;
};
const AddProjectForm: FC<AddProjectFormProps> = ({onClose}) => {
  const [, setToast] = useToasts();
  const theme = useTheme();
  const {refreshProjects} = useContext(ProjectsContext);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const addProjectHandler = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

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
      onClose();
      setNewProjectName('');
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
        tabIndex={0}
        autoFocus
        width="100%"
        initialValue={newProjectName}
        value={newProjectName}
        placeholder="New project name"
        onChange={(event) => setNewProjectName(event.target.value)}
        clearable
      />
      <Button
        auto
        icon={<Save />}
        htmlType="submit"
        loading={isCreatingProject}
        px={0.6}
        scale={0.75}
        type="success"
      />
    </AddProjectFormWrapper>
  );
};

export default AddProjectForm;
