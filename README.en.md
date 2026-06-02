# Lucky Wheel Lottery Application

### Introduction

This is a lucky wheel lottery application developed based on HarmonyOS, integrating wheel animation, voice recognition, and audio playback features to provide users with an interactive lottery experience.

This application includes the following features:

- **Wheel Lottery**: Tap the "Start Lottery" button to spin the wheel randomly and stop at a certain option. Supports customizing the number of options (3-6).
- **Voice Recognition**: Supports voice trigger word detection. Say "释怀" (Shi Huai) to automatically play a specified audio file.
- **Audio Playback**: Automatically plays audio after the wheel stops. Supports custom audio files.
- **Option Editing**: Tap "Edit Options" to customize the option text displayed on the wheel.
- **Destiny Feature**: Allows selecting a specific target option for the wheel to stop at, achieving a "predetermined" effect.
- **Icon Selection**: Supports selecting different icon styles for each option.

Example:

![image](screenshots/device/animation.en.gif)

### Project Structure
```
├──entry/src/main/ets                // Code area
│  ├──common
│  │  └──constants
│  │     └──Const.ets                // Constants configuration
│  ├──entryability
│  │  └──EntryAbility.ets            // Application entry
│  ├──pages
│  │  ├──Index.ets                   // Main page entry
│  │  ├──OptionEditor.ets            // Option editor page
│  │  └──IconSelector.ets            // Icon selector page
│  ├──view
│  │  ├──Wheel.ets                   // Wheel component
│  │  ├──AnimationWidgets.ets        // Animation components
│  │  ├──CountController.ets         // Icon count controller component
│  │  └──IconAnimation.ets           // Icon property animation component
│  ├──service
│  │  ├──VoiceRecognitionService.ets // Voice recognition service
│  │  └──AudioPlayerService.ets      // Audio player service
│  └──viewmodel
│     ├──IconItem.ets                // Icon
│     ├──Point.ets                   // Icon coordinates
│     └──IconsModel.ets              // Icon model
└──entry/src/main/resources          // Resource files
```

### Concepts

- **Explicit animation (animateTo)**: Provides a transition animation when the status changes due to the closure code.

- **Property animation**: Animates changes to certain component properties, such as **width**, **height**, **backgroundColor**, **opacity**, **scale**, **rotate**, and **translate**.

- **Canvas drawing**: Uses the Canvas component and CanvasRenderingContext2D for custom graphics rendering to implement dynamic wheel drawing.

- **Voice recognition**: Based on HarmonyOS voice recognition capabilities for keyword detection and voice interaction.

- **Audio playback**: Uses AVPlayer or audio manager to play audio resource files within the application.

- **Router navigation**: Uses the router module for page navigation and parameter passing.

### How to Use

1. **Wheel Lottery**: Tap the "Start Lottery" button to spin the wheel randomly and stop at a certain option, displaying the lottery result.
2. **Adjust Option Count**: Use the slider to control the number of options on the wheel, ranging from 3 to 6.
3. **Edit Options**: Tap the "Edit Options" button to customize the display text for each option.
4. **Destiny Feature**: Tap the "🎯 Destiny" button and select the target option you want the wheel to stop at.
5. **Voice Listening**: Tap the "Start Listening" button to start voice recognition. Say "释怀" (Shi Huai) to trigger audio playback.
6. **Test Playback**: Tap the "Test Playback" button to directly test the audio playback functionality.
7. **Auto Playback**: Audio will automatically play after the wheel stops.

### Constraints

1. The sample is only supported on Huawei phones with standard systems.
2. HarmonyOS: HarmonyOS 5.0.5 (17) or later.
3. DevEco Studio: DevEco Studio 6.0.2 Release or later.
4. HarmonyOS SDK: HarmonyOS 6.0.2 (22) SDK or later.
5. Microphone permission required: The application has requested `ohos.permission.MICROPHONE` permission for voice recognition.
6. Audio file configuration: Audio files (e.g., guanyu.mp3) need to be placed in the `entry/src/main/resources/rawfile/` directory.

### Main Features

#### Wheel Component (Wheel.ets)
- Uses Canvas to draw a colorful wheel, with each sector displaying different colors and option text
- Supports rotation animation and easing effects
- Provides rotation completion callback for automatic audio playback
- Supports specifying stop position via "Destiny" feature

#### Voice Recognition Service (VoiceRecognitionService.ets)
- Based on HarmonyOS voice recognition capabilities
- Supports trigger word detection (default: "释怀")
- Provides start and stop listening interfaces

#### Audio Playback Service (AudioPlayerService.ets)
- Supports playing audio from rawfile directory
- Provides interfaces for play, pause, and resource release
- Automatically handles audio focus and playback state

#### Option Editing Feature
- Supports customizing wheel option text
- Automatically synchronizes to main page after editing
- Uses AppStorage for cross-page data passing
