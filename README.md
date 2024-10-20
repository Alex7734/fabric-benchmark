# React Native Performance Benchmark - Fabric vs Old Architecture

This repo aims to provide different scenarios to benchmark performance difference between the new architecture and the old one. The new architecture is based on the [React Native Fabric](https://reactnative.dev/architecture/fabric-renderer) architecture. 

### Prerequisites

- Node.js
- Yarn
- Android Studio & Android SDK
- Android Emulator or physical device
- Java JDK 17-20
- Appium

### How to test scenarios

The scenarios are located in the `scenarios` folder. Each scenario has a separate file. To run a scenario, follow the steps below:

- Copy the content of the scenario file
- Paste it in the `App.tsx` file from the `src` folder both in the `FabricEnabled` and `FabricDisabled` folders, these are the two React Native projects that we will use to test the scenarios.
- Run the scenario performance test as described below.

1. In one terminal, run `npx appium`
2. In another run `NEW_ARCH=false npx ts-node performance/{scenarioName}.ts`
3. Then run `NEW_ARCH=true npx ts-node performance/{scenarioName}.ts`

### Scenario 1: Rendering 10k views

This scenario renders 10k small views in a scroll view. The views are not rendered in a flat list, just plainly on the screen. The goal is to see how the two architectures handle rendering a large number of views. 



