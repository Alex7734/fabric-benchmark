import { GenericAndroidAppModel } from "../types/app-model";
import { exec } from 'child_process';
import * as fs from 'fs';

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


// TODO: See if we can make a higher order function to handle writing to file
function writeToFile(dumpFile: string,fps: number) {
    fs.writeFileSync(dumpFile, `FPS: ${fps}`, {
        encoding: 'utf-8',
    });
}