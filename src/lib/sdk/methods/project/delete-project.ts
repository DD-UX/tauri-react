import {handleError} from '../../utility/error-handling-utility';
import {ModelMutateResultData} from '../../generated-models/ModelMutateResultData';
import {ipc_invoke} from '../../utility/ipc';

/**
 * @method deleteProject
 * @param {String} projectId Project ID
 * @return {Promise<ModelMutateResultData>} ID of the deleted  project
 */
const deleteProject = async (projectId: string): Promise<ModelMutateResultData | null> => {
  const functionalErrorCode = 'TauriTodo.project.deleteProject';
  try {
    const deletedProject: ModelMutateResultData = await ipc_invoke('delete_project', {
      id: projectId
    });
    return deletedProject;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default deleteProject;
