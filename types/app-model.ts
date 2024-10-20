enum AppStatus {
    FOREGROUND = 'FOREGROUND',
    BACKGROUND = 'BACKGROUND',
    INACTIVE = 'INACTIVE',
    EXITED = 'EXITED',
}

export type GenericAndroidAppModel = {
    bundleId: string;
    appStatus?: AppStatus;
    cpuUsage?: string;
    memoryUsage?: string;
    currentFPS?: string;
}