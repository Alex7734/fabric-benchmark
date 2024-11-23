import { GenericAndroidAppModel } from '../types/app-model';
import { getBundleId, getDriverOptions } from '../appium_utils/driverSetup';
import { getAndroidCpuAndMemoryUsageForApp } from '../android_performance_utils/cpu_usage';
import { startScreenRecording, stopScreenRecording } from '../appium_utils/videoUtils';
import { executeGenericPollingPerformance } from '../appium_utils/executeGenericPollingPerformance';
import { FIVE_SECONDS_MS, ONE_SECOND_MS, TWENTY_SECONDS_MS, THREE_SECONDS_MS, TWO_SECONDS_MS } from '../constants/durations';
import { getAndroidFpsForApp } from '../android_performance_utils/fps_calculation';
import { performSwipe } from '../appium_utils/perfromSwipe';
import { getCpuMemoryDumpFileForTestName, getFpsDumpFileForTestName } from '../appium_utils/dumpfileUtils';

const TEST_NAME = 'data_fetching_and_loading_with_scrolling_performance_test';
const IS_FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const TEST_DURATION = TWENTY_SECONDS_MS * 4;

const screenMidX = 540; 
const screenStartY = 1800;
const screenEndY = 300; 
const pauseDuration = 500;

const BUTTON_ACCESSIBILITY_IDS = {
  SHOW_TWEETS: 'SHOW_TWEETS_BUTTON',
  CPU_INTENSIVE: 'CPU_INTENSIVE_BUTTON',
  MEMORY_INTENSIVE: 'MEMORY_INTENSIVE_BUTTON',
  BACK: 'BACK_BUTTON',
};

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

  const cpuAndMemoryDumpfile = getCpuMemoryDumpFileForTestName(TEST_NAME, IS_FABRIC_ENABLED);
  const fpsDumpfile = getFpsDumpFileForTestName(TEST_NAME, IS_FABRIC_ENABLED);

  executeGenericPollingPerformance(
    getAndroidFpsForApp,
    { appState, dumpFile: fpsDumpfile },
    ONE_SECOND_MS,
    TEST_DURATION
  );

  executeGenericPollingPerformance(
    getAndroidCpuAndMemoryUsageForApp,
    { appState, dumpFile: cpuAndMemoryDumpfile },
    FIVE_SECONDS_MS,
    TEST_DURATION
  );
  
  const showTweetsButton = await driver.$(`~${BUTTON_ACCESSIBILITY_IDS.SHOW_TWEETS}`);
  const backButton = await driver.$(`~${BUTTON_ACCESSIBILITY_IDS.BACK}`);
  const cpuIntensiveButton = await driver.$(`~${BUTTON_ACCESSIBILITY_IDS.CPU_INTENSIVE}`);
  const memoryIntensiveButton = await driver.$(`~${BUTTON_ACCESSIBILITY_IDS.MEMORY_INTENSIVE}`);

  await showTweetsButton.click();
  await driver.pause(FIVE_SECONDS_MS);
  await performSwipe(driver, 10, screenMidX, screenStartY, screenEndY, pauseDuration, /* fast swipe */ true);
  await driver.pause(TWO_SECONDS_MS);
  await backButton.click();

  await cpuIntensiveButton.click();
  await driver.pause(10 * ONE_SECOND_MS);
  await backButton.click();

  await memoryIntensiveButton.click();
  await driver.pause(10 * ONE_SECOND_MS);
  await backButton.click();

  await stopScreenRecording(driver, TEST_NAME);
  await driver.releaseActions();
};

runDataFetchingAndLoadingPerformanceTest().catch(console.error);
