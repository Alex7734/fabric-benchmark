import { GenericAndroidAppModel } from '../types/app-model';
import { getBundleId, getDriverOptions } from '../appium_utils/driverSetup';
import { getAndroidCpuAndMemoryUsageForApp } from '../android_performance_utils/cpu_usage';
import { startScreenRecording, stopScreenRecording } from '../appium_utils/videoUtils';
import { executeGenericPollingPerformance } from '../appium_utils/executeGenericPollingPerformance';
import { FIVE_SECONDS_MS, ONE_SECOND_MS, THREE_SECONDS_MS, TWENTY_SECONDS_MS } from '../constants/durations';
import { getAndroidFpsForApp } from '../android_performance_utils/fps_calculation';

const IS_FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const TEST_DURATION = TWENTY_SECONDS_MS + THREE_SECONDS_MS;

const renderSvgPerformance = async () => {
  const wdio = await import('webdriverio');

  const bundleId = getBundleId(IS_FABRIC_ENABLED);
  const opts = getDriverOptions(bundleId);
  const driver = await wdio.remote(opts);

  await startScreenRecording(driver);
  await driver.pause(THREE_SECONDS_MS);

  const appState: GenericAndroidAppModel = {
    bundleId,
  };

  executeGenericPollingPerformance(getAndroidFpsForApp, { appState }, ONE_SECOND_MS, TEST_DURATION);
  executeGenericPollingPerformance(getAndroidCpuAndMemoryUsageForApp, { appState }, FIVE_SECONDS_MS, TEST_DURATION);

  const showButton = await driver.$('~SHOW'); 
  await showButton.click();

  await driver.pause(TWENTY_SECONDS_MS);

  await stopScreenRecording(driver, 'render_svg_performance_test');
};

renderSvgPerformance().catch(console.error);
