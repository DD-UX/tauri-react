import {handleError} from '../../utility/error-handling-utility';
import {ipc_invoke} from '../../utility/ipc';
import {ProjectWithTasks} from '../../generated-models/ProjectWithTasks';

/**
 * @method getProjectWithTasks
 * @param {String} projectId Project ID
 * @return {Promise<ProjectWithTasks>} Get project by ID with associated tasks
 */
const getProjectWithTasks = async ({projectId}: {projectId: string}): Promise<ProjectWithTasks> => {
  const functionalErrorCode = 'TauriTodo.project.getProjectWithTasks';
  try {
    const project: ProjectWithTasks = await ipc_invoke('get_project_with_tasks', {id: projectId});
    return project;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default getProjectWithTasks;
