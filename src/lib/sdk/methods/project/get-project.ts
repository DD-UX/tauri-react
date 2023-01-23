import {Project} from '../../generated-models/Project';
import {handleError} from '../../utility/error-handling-utility';
import {ipc_invoke} from '../../utility/ipc';

/**
 * @method getProject
 * @param {String} projectId Project ID
 * @return {Promise<Project>} Get project by ID
 */
const getProject = async ({projectId}: {projectId: string}): Promise<Project> => {
  const functionalErrorCode = 'TauriTodo.project.getProject';
  try {
    const project: Project = await ipc_invoke('get_project', {id: projectId});
    return project;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default getProject;
