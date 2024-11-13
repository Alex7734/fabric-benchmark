export function getDriverOptions (bundleId: string) {
    return {
        path: '/wd/hub/', 
        port: 4723,
        capabilities: {
            alwaysMatch: {
            platformName: 'android',
            'appium:deviceName': 'emulator-5554',
            'appium:appPackage': bundleId,
            'appium:appActivity': `${bundleId}.MainActivity`,
            'appium:automationName': 'UiAutomator2',
            },
            firstMatch: [{}],
        },
    };
}

export function getBundleId (fabricEnabled: boolean) {
    return `com.fabric${fabricEnabled ? "enabled" : "disabled"}`;
}