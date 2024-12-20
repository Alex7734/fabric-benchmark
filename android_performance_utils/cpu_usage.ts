import { GenericAndroidAppModel } from "../types/app-model";
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export type GetAndroidCpuUsageForAppParams = {
    appState: GenericAndroidAppModel;
    dumpFile?: string;
};

export const getAndroidCpuAndMemoryUsageForApp = async ({
    appState,
    dumpFile
}: GetAndroidCpuUsageForAppParams) => {
    const command = `adb shell top -b -n 1 | grep  "${appState.bundleId}"`;

    exec(command, (err, stdout) => {
        if (err) {
            console.error(err);
            return appState;
        }

        const usageArray = stdout.trim().split(/\s+/);
        const cpuUsage = parseCpuUsage(usageArray);
        const memoryUsage = parseMemoryUsage(usageArray);

        if (dumpFile) {
            writeToFile(dumpFile, cpuUsage, memoryUsage);
        } else {
            console.log(`CPU Usage: ${cpuUsage} \nMemory Usage: ${memoryUsage}`);
        }
    });
};

enum UsageArrayIndex {
    MEMORY = 5,
    CPU = 8,
}

function writeToFile(dumpFile: string, cpuUsage: string, memUsage: string) {
    const timestamp = new Date().toISOString();
    const dataLine = `${timestamp},${cpuUsage},${memUsage}\n`;
    const dir = path.dirname(dumpFile);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(dumpFile)) {
        fs.writeFileSync(dumpFile, 'Timestamp,CPU Usage,Memory Usage\n', { encoding: 'utf-8' });
    }

    fs.appendFileSync(dumpFile, dataLine, { encoding: 'utf-8' });
}

function parseCpuUsage(usageArray: string[]): string {
    const cpuUsage = usageArray[UsageArrayIndex.CPU];

    if (!isFinite(Number(cpuUsage))) {
        throw new Error(`Invalid CPU usage: ${cpuUsage}`);
    }
    
    return cpuUsage;
}

function parseMemoryUsage(usageArray: string[]): string {
    const memoryUsage = usageArray[UsageArrayIndex.MEMORY];
    
    const match = memoryUsage.match(/(\d+)M/);
    
    if (!match) {
        throw new Error(`Invalid memory usage: ${memoryUsage}`);
    }

    return match[1];
}
