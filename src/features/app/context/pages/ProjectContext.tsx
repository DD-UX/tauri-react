import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import useProjectById from 'features/project/hooks/useProjectById';
import {useRouter} from 'next/router';
import {ProjectWithTasks} from 'lib/sdk/generated-models/ProjectWithTasks';

type ProjectContextProviderProps = {
  onInitialized?: () => void;
};

type ProjectContextType = {
  project: ProjectWithTasks;
  isLoadingProject: boolean;
  refreshProject(): void;
};

export const ProjectContext = createContext<ProjectContextType>({
  project: {} as ProjectWithTasks,
  isLoadingProject: false,
  refreshProject: () => {}
});

export const ProjectContextProvider: FC<PropsWithChildren<ProjectContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const {project, refreshProject, isLoadingProject} = useProjectById(projectId);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!isLoadingProject && !hasInitialized) {
      onInitialized?.();
      setHasInitialized(true);
    }
  }, [isLoadingProject]);

  return (
    <ProjectContext.Provider
      value={{
        isLoadingProject,
        project,
        refreshProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
