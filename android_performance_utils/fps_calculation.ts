import { GenericAndroidAppModel } from "../types/app-model";
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export type GetAndroidFpsForAppParams = {
    appState: GenericAndroidAppModel;
    dumpFile?: string;
};

export const getAndroidFpsForApp = async ({
    appState,
    dumpFile
}: GetAndroidFpsForAppParams) => {
    const command = `adb shell dumpsys gfxinfo ${appState.bundleId} framestats`;

     exec(command, (fpsErr, fpsStdout) => {
        if (fpsErr) {
            console.error(fpsErr);
            return;
        }

        const fps = calculateFps(fpsStdout);

        if (fps === -1) {
            console.error('Failed to calculate FPS');
            return;
        }

        if (dumpFile) {
            writeToFile(dumpFile, fps);
        } else {
            console.log(`\nFPS: ${fps}\n`);
        }
    });
};

function calculateFps(framestats: string): number {
    const match = framestats.match(/50th percentile: (\d+)ms/);

    if (match && match[1]) {
        const frameDuration = parseInt(match[1], 10);
        const fps = 1000 / frameDuration; 
        return fps;
    }

    return -1;
}


function writeToFile(dumpFile: string, fps: number) {
    const timestamp = new Date().toISOString();
    const dataLine = `${timestamp},${fps}\n`;
    const dir = path.dirname(dumpFile);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(dumpFile)) {
        fs.writeFileSync(dumpFile, 'Timestamp,FPS\n', { encoding: 'utf-8' });
    }

    fs.appendFileSync(dumpFile, dataLine, { encoding: 'utf-8' });
}