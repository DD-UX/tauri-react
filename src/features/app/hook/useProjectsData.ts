import {useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/react';

import {Project} from 'lib/sdk/generated-models/Project';
import getProjects from 'lib/sdk/methods/project/get-projects';

type useProjectsDataValues = {
  projects: Project[];
  isLoadingProjects: boolean;
  setSearch(projectName: string): void;
  refreshProjects(): void;
};

/*
 * This Hook will pull down all the projects
 */
function useProjectsData(): useProjectsDataValues {
  const [, setToast] = useToasts();
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);

  const loadProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const projectsList: Project[] = await getProjects({search});
      setProjectsData(projectsList);
    } catch (error) {
      setToast({
        text: 'An error occurred while loading projects.',
        type: 'error'
      });
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const memoizedReturnValue: useProjectsDataValues = useMemo(() => {
    return {
      projects: projectsData,
      isLoadingProjects,
      refreshProjects: loadProjects,
      setSearch
    };
  }, [projectsData, isLoadingProjects]);

  return memoizedReturnValue;
}

export default useProjectsData;
