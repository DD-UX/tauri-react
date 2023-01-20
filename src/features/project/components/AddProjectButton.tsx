import {FC, useContext, useState} from 'react';
import {Button, useToasts} from '@geist-ui/react';
import Plus from '@geist-ui/react-icons/plus';
import {ProjectsContext} from 'features/app/context/pages/ProjectsContext';
import createProject from 'lib/sdk/methods/project/create-project';

const AddProjectButton: FC = () => {
  const [, setToast] = useToasts();
  const {refreshProjects} = useContext(ProjectsContext);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const addProjectHandler = async (projectName: string) => {
    try {
      setIsCreatingProject(true);
      const createdProject = await createProject({
        name: projectName
      });
      console.log('project created', createdProject);
      refreshProjects();
      setToast({
        text: 'Project created successfully',
        type: 'success'
      });
    } catch (error) {
      setToast({
        text: 'An error occurred while creating the project.',
        type: 'error'
      });
    } finally {
      setIsCreatingProject(false);
    }
  };

  return (
    <>
      <Button
        auto
        icon={<Plus />}
        loading={isCreatingProject}
        ml="auto"
        px={0.6}
        scale={0.75}
        type="secondary"
        ghost
        onClick={() => addProjectHandler('Some new project')}
      >
        Add project
      </Button>
    </>
  );
};

export default AddProjectButton;
