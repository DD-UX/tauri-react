/**
 * @summary
 * handleError is a bucket to delegate a common logic to deal with errors on the client side through the SDK
 */
export const handleError = (functionalErrorCode: string, error: unknown) => {
  // Print out the error in the console
  console.error(`[${functionalErrorCode}] - ${error}`);
};
