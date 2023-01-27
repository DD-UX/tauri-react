import {handleError} from '../../utility/error-handling-utility';
import {ModelMutateResultData} from '../../generated-models/ModelMutateResultData';
import {ipc_invoke} from '../../utility/ipc';

/**
 * @method deleteTask
 * @param {String} taskId Task ID
 * @return {Promise<ModelMutateResultData>} ID of the deleted task
 */
const deleteTask = async (taskId: string): Promise<ModelMutateResultData | null> => {
  const functionalErrorCode = 'TauriTodo.project.deleteProject';
  try {
    const deletedTask: ModelMutateResultData = await ipc_invoke('delete_project', {
      id: taskId
    });
    return deletedTask;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default deleteTask;
