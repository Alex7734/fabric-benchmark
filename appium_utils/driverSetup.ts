export function getDriverOptions (bundleId: string) {
    return {
        path: '/wd/hub/', 
        port: 4723,
        capabilities: {
            alwaysMatch: {
            platformName: 'android',
            // Fizic: SM-G991B - 13 
            // Emulator: emulator-5554
            'appium:deviceName': 'SM-G991B - 13', 
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

/**
 * SM-G991B - 13 -> Samsung Galaxy S21
 *
 * 8 GB RAM
 *
 * CPU Octa-core (1x2.9 GHz Cortex-X1 & 3x2.8 GHz Cortex-A78 &
 * 4x2.2 GHz Cortex-A55) with a Exynos 2100 chipset
 *
 * GPU
 *
 *
 */