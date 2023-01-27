import {handleError} from '../../utility/error-handling-utility';
import {TaskForCreate} from '../../generated-models/TaskForCreate';
import {ModelMutateResultData} from '../../generated-models/ModelMutateResultData';
import {ipc_invoke} from '../../utility/ipc';

/**
 * @method createTask
 * @param {Object} taskInfo Task info to be created
 * @return {Promise<ModelMutateResultData>} ID of the created task
 */
const createTask = async (taskInfo: TaskForCreate): Promise<ModelMutateResultData | null> => {
  const functionalErrorCode = 'TauriTodo.task.createTask';
  try {
    const createdTask: ModelMutateResultData = await ipc_invoke('create_task', {
      data: taskInfo
    });
    return createdTask;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default createTask;
