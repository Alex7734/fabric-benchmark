import { GenericAndroidAppModel } from '../types/app-model';
import { getBundleId, getDriverOptions } from '../appium_utils/driverSetup';
import { getAndroidCpuAndMemoryUsageForApp } from '../android_performance_utils/cpu_usage';
import { startScreenRecording, stopScreenRecording } from '../appium_utils/videoUtils';
import { executeGenericPollingPerformance } from '../appium_utils/executeGenericPollingPerformance';
import { FIVE_SECONDS_MS, ONE_SECOND_MS, TWENTY_SECONDS_MS, THREE_SECONDS_MS } from '../constants/durations';
import { getAndroidFpsForApp } from '../android_performance_utils/fps_calculation';
import { performSwipe } from '../appium_utils/perfromSwipe';

const IS_FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const TEST_DURATION = TWENTY_SECONDS_MS + THREE_SECONDS_MS;
const BUTTON_ACCESSIBILITY_ID = "SHOW_TWEETS_BUTTON";

const screenMidX = 540; 
const screenStartY = 1800;
const screenEndY = 300; 
const pauseDuration = 10;

const runDataFetchingAndLoadingPerformanceTest = async () => {
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

  const showTweetsButton = await driver.$(`~${BUTTON_ACCESSIBILITY_ID}`);
  await showTweetsButton.click();

  await driver.pause(ONE_SECOND_MS * 8);
  await performSwipe(driver, 10, screenMidX, screenStartY, screenEndY, pauseDuration);

  await stopScreenRecording(driver, 'data_fetching_and_loading_with_scrolling_performance_test');
  await driver.releaseActions();
};

runDataFetchingAndLoadingPerformanceTest().catch(console.error);
