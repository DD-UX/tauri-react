import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import {Project} from 'lib/sdk/generated-models/Project';

type ProjectsContextProviderProps = {
  onInitialized?: () => void;
};

type ProjectsContextType = {
  projects: Project[];
  isLoadingProjects: boolean;
  refreshProjects(): void;
};

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  isLoadingProjects: false,
  refreshProjects: () => {}
});

export const ProjectsContextProvider: FC<PropsWithChildren<ProjectsContextProviderProps>> = ({
  onInitialized,
  children
}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const isLoadingProjects = false;

  useEffect(() => {
    if (!isLoadingProjects && !hasInitialized) {
      onInitialized?.();
      setHasInitialized(true);
    }
  }, [isLoadingProjects]);

  return (
    <ProjectsContext.Provider
      value={{
        isLoadingProjects: !hasInitialized,
        projects: [],
        refreshProjects() {}
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
