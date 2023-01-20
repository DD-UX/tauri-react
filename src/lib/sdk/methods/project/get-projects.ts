import {Project} from '../../generated-models/Project';
import {handleError} from '../../utility/error-handling-utility';

/**
 * @method getProjects
 * @return {Promise<Project[]>} List of available projects
 */
const getProjects = async ({search}: {search: string}): Promise<Project[]> => {
  const functionalErrorCode = 'TauriTodo.project.getProjects';
  try {
    if (!window?.__TAURI_IPC__) {
      return [];
    }
    const {invoke} = await import('@tauri-apps/api');
    const projectsList: Project[] = await invoke('list_projects', {name: search});
    return projectsList;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default getProjects;
