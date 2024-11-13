import { ONE_SECOND_MS } from "../constants/durations";


/**
 * Performs a swipe action on the screen.
 * @param {object} driver - The Appium driver instance.
 * @param {number} repetitions - The number of swipes to perform.
 * @param {number} startX - The starting x-coordinate for the swipe.
 * @param {number} startY - The starting y-coordinate for the swipe.
 * @param {number} endY - The ending y-coordinate for the swipe.
 * @parma {number} pauseDuration - The duration to pause after each swipe.
 */
const performSwipe = async (driver: any, repetitions: number, startX: number, startY: number, endY: number, pauseDuration?: number, fast?: boolean) => {
    for (let i = 0; i < repetitions; i++) {
      await driver.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: startX, y: startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', duration: fast ? 200 : 1000, x: startX, y: endY },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);
      await driver.pause(pauseDuration ?? ONE_SECOND_MS);
    }
    await driver.releaseActions();
  };

export { performSwipe };