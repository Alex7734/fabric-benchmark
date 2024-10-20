import { GenericAndroidAppModel } from '../types/app-model';
import { getBundleId, getDriverOptions } from '../appium_utils/driverSetup';
import { getAndroidCpuAndMemoryUsageForApp } from '../android_performance_utils/cpu_usage';
import { startScreenRecording, stopScreenRecording } from '../appium_utils/videoUtils';
import { executeGenericPollingPerformance } from '../appium_utils/executeGenericPollingPerformance';
import { FIVE_SECONDS_MS, THREE_SECONDS_MS, TWENTY_SECONDS_MS } from '../constants/durations';

const IS_FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const TEST_DURATION = TWENTY_SECONDS_MS + THREE_SECONDS_MS;

const runPerformanceTest = async () => {
  const wdio = await import('webdriverio');

  const bundleId = getBundleId(IS_FABRIC_ENABLED);
  const opts = getDriverOptions(bundleId);
  const driver = await wdio.remote(opts);

  await startScreenRecording(driver);
  await driver.pause(THREE_SECONDS_MS);

  const appState: GenericAndroidAppModel = {
    bundleId,
  }
  
  await executeGenericPollingPerformance(getAndroidCpuAndMemoryUsageForApp, /* args */ { appState }, /* interval */ FIVE_SECONDS_MS, TEST_DURATION);
  await stopScreenRecording(driver, /* fileName */ 'test');
};

runPerformanceTest().catch(console.error);
