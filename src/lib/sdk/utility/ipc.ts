/**
 * @summary
 * Small wrapper on top of tauri api invoke *
 * best-practice: Light and narrow external api abstraction.
 */
export const ipc_invoke = async (method: string, params?: object): Promise<any> => {
  if (!window?.__TAURI_IPC__) {
    return null;
  }
  const {invoke} = await import('@tauri-apps/api');
  const response: any = await invoke(method, {params});
  console.log('response', response);

  if (response.error != null) {
    console.log('ERROR - ipc_invoke - ipc_invoke error', response);
    throw new Error(response.error);
  } else {
    return response.result.data;
  }
};
