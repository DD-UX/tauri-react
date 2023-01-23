import {useEffect, useState} from 'react';
import {useToasts} from '@geist-ui/react';
import {Project} from 'lib/sdk/generated-models/Project';
import getProject from 'lib/sdk/methods/project/get-project';

const useProjectById = (projectId: string) => {
  const [, setToast] = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project>();

  const loadProject = async (projectId: string) => {
    try {
      const latestProject = await getProject({projectId});
      setProject(latestProject);
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
      loadProject(projectId);
    }
  }, [projectId]);

  return {
    project,
    isLoadingProject: isLoading
  };
};

export default useProjectById;
