import {useMemo, useState} from 'react';
import {useToasts} from '@geist-ui/react';

import {Project} from 'lib/sdk/generated-models/Project';

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
    if (!window?.__TAURI_IPC__) {
      return;
    }

    try {
      setIsLoadingProjects(true);
      const {invoke} = await import('@tauri-apps/api');
      const projectsList: Project[] = await invoke('list_projects', {name: search});
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
