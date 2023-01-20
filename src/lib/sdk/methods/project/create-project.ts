import {handleError} from '../../utility/error-handling-utility';
import {ProjectForCreate} from '../../generated-models/ProjectForCreate';
import {ModelMutateResultData} from '../../generated-models/ModelMutateResultData';
import {ipc_invoke} from '../../utility/ipc';

/**
 * @method createProject
 * @return {Promise<ModelMutateResultData>} Id of the created project
 */
const createProject = async (
  projectInfo: ProjectForCreate
): Promise<ModelMutateResultData | null> => {
  const functionalErrorCode = 'TauriTodo.project.createProject';
  try {
    const createdProject: ModelMutateResultData = await ipc_invoke('create_project', {
      data: projectInfo
    });
    return createdProject;
  } catch (error) {
    handleError(functionalErrorCode, error);
    throw error;
  }
};

export default createProject;
