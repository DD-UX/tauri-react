import {Project} from '../../generated-models/Project';
import {handleError} from '../../utility/error-handling-utility';
import {ipc_invoke} from '../../utility/ipc';

/**
 * @method getProjects
 * @return {Promise<Project[]>} List of available projects
 */
const getProjects = async ({search}: {search: string}): Promise<Project[]> => {
  const functionalErrorCode = 'TauriTodo.project.getProjects';
  try {
    const projectsList: Project[] = await ipc_invoke('list_projects', {name: search});
    return projectsList;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default getProjects;
