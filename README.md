# Challengers

Welcome to the Challengers project! This repository is built with [Expo](https://expo.dev/) and supports both iOS and Android platforms.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Kojon74/challengers.git
    cd challengers
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run Expo Prebuild:**
    This step generates the native iOS and Android projects. The `--clean` option ensures the `ios/` and `android/` directories are deleted before they are regenerated.
    This needs to be run every time there is a change made in the native code.
    ```bash
    npx expo prebuild --clean
    ```

### Running on iOS

1. Build and run the app using Xcode or:
    ```bash
    npx expo run:ios
    ```

### Running on Android

1. Add the following lines to `~/.zshrc` to define environment variables to define the SDK location.
    ```bash
    export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
2. Build and run the app using Android Studio or:
    ```bash
    npx expo run:android
    ```

## Additional Resources

- [Expo Prebuild Documentation](https://docs.expo.dev/workflow/prebuild/)
- [Expo CLI Commands](https://docs.expo.dev/workflow/expo-cli/)