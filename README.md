# 幸运转盘抽奖应用

### 简介

本应用是一个基于 HarmonyOS 开发的幸运转盘抽奖应用，集成了转盘动画、语音识别、音频播放等功能，为用户提供互动性强的抽奖体验。

本应用实现如下功能：

- **转盘抽奖**：点击"开始抽奖"按钮，转盘随机旋转并停在某个选项上，支持自定义选项数量（3-6个）。
- **语音识别**：支持语音触发词检测，说出"释怀"后自动播放指定音频文件。
- **音频播放**：转盘停止后自动播放音频，支持自定义音频文件。
- **选项编辑**：点击"编辑选项"可自定义转盘上显示的选项文本。
- **天意功能**：可选择指定转盘停止的目标选项，实现"内定"效果。
- **图标选择**：支持为每个选项选择不同的图标样式。

效果如图所示：

![image](screenshots/device/animation.gif)

### 工程结构
```
├──entry/src/main/ets                // 代码区
│  ├──common
│  │  └──constants
│  │     └──Const.ets                // 常量配置类
│  ├──entryability
│  │  └──EntryAbility.ets            // 程序入口类
│  ├──pages
│  │  ├──Index.ets                   // 主页面入口
│  │  ├──OptionEditor.ets            // 选项编辑页面
│  │  └──IconSelector.ets            // 图标选择页面
│  ├──view
│  │  ├──Wheel.ets                   // 转盘组件
│  │  ├──AnimationWidgets.ets        // 动画组件
│  │  ├──CountController.ets         // 图标数量控制组件
│  │  └──IconAnimation.ets           // 图标属性动画组件
│  ├──service
│  │  ├──VoiceRecognitionService.ets // 语音识别服务
│  │  └──AudioPlayerService.ets      // 音频播放服务
│  └──viewmodel
│     ├──IconItem.ets                // 图标类
│     ├──Point.ets                   // 图标坐标类
│     └──IconsModel.ets              // 图标数据模型
└──entry/src/main/resources          // 资源文件
```

### 相关概念

- **显式动画**：提供全局 animateTo 显式动画接口来指定由于闭包代码导致的状态变化插入过渡动效。

- **属性动画**：组件的某些通用属性变化时，可以通过属性动画实现渐变过渡效果，提升用户体验。支持的属性包括 width、height、backgroundColor、opacity、scale、rotate、translate 等。

- **Canvas 绘图**：使用 Canvas 组件和 CanvasRenderingContext2D 进行自定义图形绘制，实现转盘的动态渲染。

- **语音识别**：基于 HarmonyOS 的语音识别能力，实现关键词检测和语音交互功能。

- **音频播放**：使用 AVPlayer 或音频管理器播放应用内的音频资源文件。

- **路由导航**：使用 router 模块实现页面间的跳转和参数传递。

### 使用说明

1. **转盘抽奖**：点击"开始抽奖"按钮，转盘会随机旋转并停在某个选项上，显示抽奖结果。
2. **调整选项数量**：通过滑动条控制转盘上的选项数量，最少3个，最多6个。
3. **编辑选项**：点击"编辑选项"按钮，可以自定义每个选项的显示文本。
4. **天意功能**：点击"🎯 天意"按钮，选择想要停止的目标选项，实现指定结果。
5. **语音监听**：点击"开始监听"按钮启动语音识别，说出"释怀"触发音频播放。
6. **测试播放**：点击"测试播放"按钮直接测试音频播放功能。
7. **自动播放**：转盘停止后会自动播放预设的音频文件。

### 约束与限制

1. 本示例仅支持标准系统上运行，支持设备：华为手机。
2. HarmonyOS 系统：HarmonyOS 5.0.5 (17) 及以上。
3. DevEco Studio 版本：DevEco Studio 6.0.2 Release 及以上。
4. HarmonyOS SDK 版本：HarmonyOS 6.0.2 (22) SDK 及以上。
5. 需要麦克风权限：应用已申请 `ohos.permission.MICROPHONE` 权限用于语音识别功能。
6. 音频文件配置：需要将音频文件（如 guanyu.mp3）放置在 `entry/src/main/resources/rawfile/` 目录下。

### 主要功能说明

#### 转盘组件 (Wheel.ets)
- 使用 Canvas 绘制彩色转盘，每个扇区显示不同颜色和选项文本
- 支持旋转动画和缓动效果
- 提供旋转完成回调，自动播放音频
- 支持通过"天意"功能指定停止位置

#### 语音识别服务 (VoiceRecognitionService.ets)
- 基于 HarmonyOS 语音识别能力
- 支持触发词检测（默认："释怀"）
- 提供启动、停止监听接口

#### 音频播放服务 (AudioPlayerService.ets)
- 支持从 rawfile 目录播放音频
- 提供播放、暂停、释放资源等接口
- 自动处理音频焦点和播放状态

#### 选项编辑功能
- 支持自定义转盘选项文本
- 编辑后自动同步到主页面
- 使用 AppStorage 进行跨页面数据传递
