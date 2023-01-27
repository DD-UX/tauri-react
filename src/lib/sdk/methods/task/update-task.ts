import {handleError} from '../../utility/error-handling-utility';
import {ModelMutateResultData} from '../../generated-models/ModelMutateResultData';
import {ipc_invoke} from '../../utility/ipc';
import {TaskForUpdate} from '../../generated-models/TaskForUpdate';

/**
 * @method updateTask
 * @param {String} taskId Task ID
 * @param {Object} taskInfo Task info to be updated
 * @return {Promise<ModelMutateResultData>} ID of the deleted task
 */
const updateTask = async (
  taskId: string,
  taskInfo: TaskForUpdate
): Promise<ModelMutateResultData> => {
  const functionalErrorCode = 'TauriTodo.project.updateTask';
  try {
    const updatedTask: ModelMutateResultData = await ipc_invoke('update_task', {
      id: taskId,
      data: taskInfo
    });
    return updatedTask;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default updateTask;
