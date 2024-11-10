const cpuMemoryDumpFile = 'cpu_memory_usage.csv';
const fpsDumpFile = 'fps_usage.csv';

export const getCpuMemoryDumpFileForTestName = (testName: string, isFabric: boolean) => `data/${isFabric ? 'fabric' : 'old_arch'}/${testName}/${cpuMemoryDumpFile}`;
export const getFpsDumpFileForTestName = (testName: string, isFabric: boolean) => `data/${isFabric ? 'fabric' : 'old_arch'}/${testName}/${fpsDumpFile}`;