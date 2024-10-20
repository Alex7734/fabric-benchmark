import fs from 'fs';

export const startScreenRecording = async (driver: any) => {
    await driver.startRecordingScreen({
      videoType: 'h264',
      timeLimit: '1800', 
      bitRate: '5000000', 
      width: 1280,
      height: 720,
    });
};
  
export const  stopScreenRecording = async (driver: any, fileName: string) => {
    const base64Video = await driver.stopRecordingScreen();
    fs.writeFileSync(`videos/${fileName}.mp4`, base64Video, 'base64');
};
  