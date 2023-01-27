import {useEffect, useState} from 'react';
import {useToasts} from '@geist-ui/react';
import {ProjectWithTasks} from 'lib/sdk/generated-models/ProjectWithTasks';
import getProjectWithTasks from 'lib/sdk/methods/project/get-project-with-tasks';

const useProjectById = (projectId: string) => {
  const [, setToast] = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState({} as ProjectWithTasks);

  const loadProject = async () => {
    try {
      const projectWithTasks = await getProjectWithTasks({projectId});
      setProject(projectWithTasks);
    } catch (error) {
      setToast({
        text: 'An error occurred while fetching project',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  return {
    project,
    isLoadingProject: isLoading,
    refreshProject: loadProject
  };
};

export default useProjectById;
