/**
 *  This function is used to execute a polling function with a given interval and timeout.
 *  The polling function will be executed every intervalMs milliseconds until the timeoutMs is reached.
 *  The function will return a promise that will resolve when the timeoutMs is reached.
 * 
 * @param pollingFunction The function to be executed every intervalMs milliseconds.
 * @param args The arguments to be passed to the polling function.
 * @param intervalMs The interval in milliseconds between each execution of the polling function.
 * @param timeoutMs The timeout in milliseconds after which the promise will resolve.
 * @returns A promise that will resolve when the timeoutMs is reached.
 * 
 */

export const executeGenericPollingPerformance = <T>(
    pollingFunction: (args: T) => void, 
    args: T,                             
    intervalMs: number,                 
    timeoutMs: number                     
  ): Promise<void> => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        pollingFunction(args);
      }, intervalMs);
  
      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, timeoutMs);
    });
};

