import {useCallback, useMemo, useRef} from 'react';
import {useToasts} from '@geist-ui/react';
import useSWR from 'swr';

import {Project} from 'lib/sdk/generated-models/Project';

const SWR_PROJECTS_LIST_KEY = 'list_projects';

type useProjectsDataValues = {
  projects: Project[];
  isLoadingProjects: boolean;
  refreshProjects(): void;
};

/*
 * This Hook will pull down all the projects
 */
function useProjectsData(): useProjectsDataValues {
  const [, setToast] = useToasts();
  const isInitialCallRef = useRef(true);

  const updateProjectsInfo = useCallback(async (_key: string) => {
    if (window) {
      try {
        const {invoke} = await import('@tauri-apps/api');
        const projectsList: Project[] = await invoke(SWR_PROJECTS_LIST_KEY, {});
        return projectsList;
      } catch (error) {
        console.log('error', error);
      }

      return [];
    }
    return [];
  }, []);

  const {data: projectsData, error, mutate: refreshProjectsData} = useSWR(
    [SWR_PROJECTS_LIST_KEY, isInitialCallRef],
    updateProjectsInfo
  );

  const memoizedReturnValue: useProjectsDataValues = useMemo(() => {
    return {
      projects: projectsData ?? [],
      isLoadingProjects: !error && !projectsData,
      refreshProjects: refreshProjectsData
    };
  }, [projectsData, error, refreshProjectsData]);

  if (error) {
    setToast({
      text: 'An error occurred while loading projects.',
      type: 'error'
    });
  }

  return memoizedReturnValue;
}
export default useProjectsData;
