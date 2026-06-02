if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    quantity?: number;
    optionTexts?: string[];
    isVoiceListening?: boolean;
    voiceStatus?: string;
    isWheelSpinning?: boolean;
    spinTrigger?: number;
    destinyTrigger?: number;
    destinyTargetIndex?: number;
    showDestinyPanel?: boolean;
    voiceService?: VoiceRecognitionService;
    audioService?: AudioPlayerService;
    buttonHeight?: number;
    buttonFontSize?: number;
    columnGap?: number;
    isLargeScreen?: boolean;
}
import { Wheel } from "@bundle:com.example.animation/entry/ets/view/Wheel";
import { CountController } from "@bundle:com.example.animation/entry/ets/view/CountController";
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import router from "@ohos:router";
import { VoiceRecognitionService } from "@bundle:com.example.animation/entry/ets/service/VoiceRecognitionService";
import { AudioPlayerService } from "@bundle:com.example.animation/entry/ets/service/AudioPlayerService";
import type common from "@ohos:app.ability.common";
import { getDeviceAdapter } from "@bundle:com.example.animation/entry/ets/common/utils/DeviceAdapter";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__quantity = new ObservedPropertySimplePU(Common.IMAGES_MIN, this, "quantity");
        this.__optionTexts = new ObservedPropertyObjectPU([], this, "optionTexts");
        this.__isVoiceListening = new ObservedPropertySimplePU(false, this, "isVoiceListening");
        this.__voiceStatus = new ObservedPropertySimplePU('未启动', this, "voiceStatus");
        this.__isWheelSpinning = new ObservedPropertySimplePU(false, this, "isWheelSpinning");
        this.__spinTrigger = new ObservedPropertySimplePU(0, this, "spinTrigger");
        this.__destinyTrigger = new ObservedPropertySimplePU(0, this, "destinyTrigger");
        this.__destinyTargetIndex = new ObservedPropertySimplePU(0, this, "destinyTargetIndex");
        this.__showDestinyPanel = new ObservedPropertySimplePU(false, this, "showDestinyPanel");
        this.voiceService = new VoiceRecognitionService();
        this.audioService = new AudioPlayerService();
        this.buttonHeight = 45;
        this.buttonFontSize = 14;
        this.columnGap = 15;
        this.isLargeScreen = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.quantity !== undefined) {
            this.quantity = params.quantity;
        }
        if (params.optionTexts !== undefined) {
            this.optionTexts = params.optionTexts;
        }
        if (params.isVoiceListening !== undefined) {
            this.isVoiceListening = params.isVoiceListening;
        }
        if (params.voiceStatus !== undefined) {
            this.voiceStatus = params.voiceStatus;
        }
        if (params.isWheelSpinning !== undefined) {
            this.isWheelSpinning = params.isWheelSpinning;
        }
        if (params.spinTrigger !== undefined) {
            this.spinTrigger = params.spinTrigger;
        }
        if (params.destinyTrigger !== undefined) {
            this.destinyTrigger = params.destinyTrigger;
        }
        if (params.destinyTargetIndex !== undefined) {
            this.destinyTargetIndex = params.destinyTargetIndex;
        }
        if (params.showDestinyPanel !== undefined) {
            this.showDestinyPanel = params.showDestinyPanel;
        }
        if (params.voiceService !== undefined) {
            this.voiceService = params.voiceService;
        }
        if (params.audioService !== undefined) {
            this.audioService = params.audioService;
        }
        if (params.buttonHeight !== undefined) {
            this.buttonHeight = params.buttonHeight;
        }
        if (params.buttonFontSize !== undefined) {
            this.buttonFontSize = params.buttonFontSize;
        }
        if (params.columnGap !== undefined) {
            this.columnGap = params.columnGap;
        }
        if (params.isLargeScreen !== undefined) {
            this.isLargeScreen = params.isLargeScreen;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__optionTexts.purgeDependencyOnElmtId(rmElmtId);
        this.__isVoiceListening.purgeDependencyOnElmtId(rmElmtId);
        this.__voiceStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__isWheelSpinning.purgeDependencyOnElmtId(rmElmtId);
        this.__spinTrigger.purgeDependencyOnElmtId(rmElmtId);
        this.__destinyTrigger.purgeDependencyOnElmtId(rmElmtId);
        this.__destinyTargetIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__showDestinyPanel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__quantity.aboutToBeDeleted();
        this.__optionTexts.aboutToBeDeleted();
        this.__isVoiceListening.aboutToBeDeleted();
        this.__voiceStatus.aboutToBeDeleted();
        this.__isWheelSpinning.aboutToBeDeleted();
        this.__spinTrigger.aboutToBeDeleted();
        this.__destinyTrigger.aboutToBeDeleted();
        this.__destinyTargetIndex.aboutToBeDeleted();
        this.__showDestinyPanel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __quantity: ObservedPropertySimplePU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    private __optionTexts: ObservedPropertyObjectPU<string[]>;
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(newValue: string[]) {
        this.__optionTexts.set(newValue);
    }
    private __isVoiceListening: ObservedPropertySimplePU<boolean>;
    get isVoiceListening() {
        return this.__isVoiceListening.get();
    }
    set isVoiceListening(newValue: boolean) {
        this.__isVoiceListening.set(newValue);
    }
    private __voiceStatus: ObservedPropertySimplePU<string>;
    get voiceStatus() {
        return this.__voiceStatus.get();
    }
    set voiceStatus(newValue: string) {
        this.__voiceStatus.set(newValue);
    }
    private __isWheelSpinning: ObservedPropertySimplePU<boolean>; // 转盘旋转状态（同步自 Wheel 组件）
    get isWheelSpinning() {
        return this.__isWheelSpinning.get();
    }
    set isWheelSpinning(newValue: boolean) {
        this.__isWheelSpinning.set(newValue);
    }
    private __spinTrigger: ObservedPropertySimplePU<number>; // 旋转触发器
    get spinTrigger() {
        return this.__spinTrigger.get();
    }
    set spinTrigger(newValue: number) {
        this.__spinTrigger.set(newValue);
    }
    private __destinyTrigger: ObservedPropertySimplePU<number>; // 天意触发器
    get destinyTrigger() {
        return this.__destinyTrigger.get();
    }
    set destinyTrigger(newValue: number) {
        this.__destinyTrigger.set(newValue);
    }
    private __destinyTargetIndex: ObservedPropertySimplePU<number>; // 天意目标选项索引
    get destinyTargetIndex() {
        return this.__destinyTargetIndex.get();
    }
    set destinyTargetIndex(newValue: number) {
        this.__destinyTargetIndex.set(newValue);
    }
    private __showDestinyPanel: ObservedPropertySimplePU<boolean>; // 是否显示天意面板
    get showDestinyPanel() {
        return this.__showDestinyPanel.get();
    }
    set showDestinyPanel(newValue: boolean) {
        this.__showDestinyPanel.set(newValue);
    }
    private voiceService: VoiceRecognitionService;
    private audioService: AudioPlayerService;
    // 响应式布局参数
    private buttonHeight: number;
    private buttonFontSize: number;
    private columnGap: number;
    private isLargeScreen: boolean;
    aboutToAppear() {
        // 初始化选项文本
        this.initOptionTexts();
        // 初始化音频服务
        const context = getContext(this) as common.UIAbilityContext;
        this.audioService.init(context);
        // 初始化响应式布局参数
        this.initLayoutParams();
    }
    // 初始化响应式布局参数
    private initLayoutParams(): void {
        const adapter = getDeviceAdapter();
        this.buttonHeight = adapter.getButtonHeight();
        this.buttonFontSize = adapter.getButtonFontSize();
        this.columnGap = adapter.getColumnGap();
        this.isLargeScreen = adapter.isLargeScreen();
    }
    aboutToDisappear() {
        // 释放资源
        this.voiceService.destroy();
        this.audioService.release();
    }
    aboutToForeground() {
        // 页面重新进入前台时，检查是否有编辑后的数据
        const editedTexts = AppStorage.get<string[]>('editedOptionTexts');
        if (editedTexts && editedTexts.length > 0) {
            // 更新选项文本
            for (let i = 0; i < editedTexts.length; i++) {
                this.optionTexts[i] = editedTexts[i];
            }
            // 清除临时存储
            AppStorage.delete('editedOptionTexts');
        }
    }
    initOptionTexts() {
        this.optionTexts = [];
        for (let i = 0; i < Common.IMAGES_TOTAL; i++) {
            if (i === 0) {
                // 选项一的默认文本设置为"一对笑面虎"
                this.optionTexts.push('一对笑面虎');
            }
            else if (i === 1) {
                // 选项二的默认文本设置为"两头乌角鲨"
                this.optionTexts.push('两头乌角鲨');
            }
            else if (i === 2) {
                // 选项三的默认文本设置为"三军听令，自刎归天"
                this.optionTexts.push('三军听令，自刎归天');
            }
            else if (i === 3) {
                // 选项四的默认文本设置为"死是凉爽的夏夜"
                this.optionTexts.push('死是凉爽的夏夜');
            }
            else if (i === 4) {
                // 选项五的默认文本设置为"五百个弟兄全死了都值"
                this.optionTexts.push('五百个弟兄全死了都值');
            }
            else if (i === 5) {
                // 选项六的默认文本设置为"六亲不认，水火无敌"
                this.optionTexts.push('六亲不认，水火无敌');
            }
            else {
                this.optionTexts.push(`选项${i + 1}`);
            }
        }
    }
    // 启动语音识别
    async startVoiceRecognition() {
        this.voiceStatus = '正在启动...';
        const success = await this.voiceService.startListening(() => {
            // 检测到触发词"释怀"时的回调
            this.onTriggerWordDetected();
        });
        if (success) {
            this.isVoiceListening = true;
            this.voiceStatus = '正在监听中';
        }
        else {
            this.voiceStatus = '启动失败';
        }
    }
    // 停止语音识别
    stopVoiceRecognition() {
        this.voiceService.stopListening();
        this.isVoiceListening = false;
        this.voiceStatus = '已停止';
    }
    // 获取天意选项数组
    getDestinyOptions(): number[] {
        const options: number[] = [];
        for (let i = 0; i < this.quantity; i++) {
            options.push(i);
        }
        return options;
    }
    // 检测到触发词
    async onTriggerWordDetected() {
        console.info('Index: Trigger word "释怀" detected!');
        this.voiceStatus = '检测到"释怀"！播放音乐...';
        try {
            // 播放音频文件
            // 注意：你需要将音频文件放在 entry/src/main/resources/rawfile/ 目录下
            // 文件名需要替换为你实际的音频文件名
            // 例如：await this.audioService.playFromRawFile('guanyu_song.mp3');
            // 这里使用一个示例文件名，请替换为你的实际文件
            await this.audioService.playFromRawFile('guanyu.mp3');
            // 播放完成后恢复监听状态
            setTimeout(() => {
                if (this.isVoiceListening) {
                    this.voiceStatus = '正在监听中';
                }
            }, 3000);
        }
        catch (error) {
            console.error(`Index: Failed to play audio - ${error}`);
            this.voiceStatus = '播放失败';
        }
    }
    // 转盘旋转完成回调
    async onWheelSpinComplete(selectedIndex: number) {
        console.info(`Index: Wheel spin completed, selected index: ${selectedIndex}`);
        const selectedOption = this.optionTexts[selectedIndex] || `选项${selectedIndex + 1}`;
        console.info(`Index: Selected option: ${selectedOption}`);
        // 自动播放音频
        try {
            console.info('Index: Auto-playing audio after spin complete');
            await this.audioService.playFromRawFile('guanyu.mp3');
        }
        catch (error) {
            console.error(`Index: Failed to play audio after spin - ${error}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/Index.ets(184:5)", "entry");
            Column.width(Common.DEFAULT_FULL_WIDTH);
            Column.height(Common.DEFAULT_FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777231, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Wheel(this, {
                        quantity: this.__quantity,
                        optionTexts: this.__optionTexts,
                        isSpinningState: this.__isWheelSpinning,
                        spinTrigger: this.__spinTrigger,
                        destinyTrigger: this.__destinyTrigger,
                        destinyTargetIndex: this.__destinyTargetIndex,
                        onSpinComplete: (index: number) => {
                            this.onWheelSpinComplete(index);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 185, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            quantity: this.quantity,
                            optionTexts: this.optionTexts,
                            isSpinningState: this.isWheelSpinning,
                            spinTrigger: this.spinTrigger,
                            destinyTrigger: this.destinyTrigger,
                            destinyTargetIndex: this.destinyTargetIndex,
                            onSpinComplete: (index: number) => {
                                this.onWheelSpinComplete(index);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Wheel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 天意功能区域
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(198:7)", "entry");
            // 天意功能区域
            Row.width('100%');
            // 天意功能区域
            Row.justifyContent(FlexAlign.Center);
            // 天意功能区域
            Row.margin({ top: this.columnGap });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('🎯 天意');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(199:9)", "entry");
            Button.width(this.isLargeScreen ? '40%' : '80%');
            Button.height(this.buttonHeight);
            Button.fontSize(this.buttonFontSize);
            Button.backgroundColor('#9C27B0');
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.showDestinyPanel = !this.showDestinyPanel;
            });
        }, Button);
        Button.pop();
        // 天意功能区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 天意选项面板
            if (this.showDestinyPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/pages/Index.ets(215:9)", "entry");
                        Column.width(this.isLargeScreen ? '60%' : '85%');
                        Column.padding(this.isLargeScreen ? 20 : 15);
                        Column.backgroundColor('#F3E5F5');
                        Column.borderRadius(12);
                        Column.margin({ top: 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('选择天意目标');
                        Text.debugLine("entry/src/main/ets/pages/Index.ets(216:11)", "entry");
                        Text.fontSize(this.buttonFontSize);
                        Text.fontColor('#666666');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceEvenly });
                        Flex.debugLine("entry/src/main/ets/pages/Index.ets(221:11)", "entry");
                        Flex.width('90%');
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const index = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel(this.optionTexts[index] || `选项${index + 1}`);
                                Button.debugLine("entry/src/main/ets/pages/Index.ets(223:15)", "entry");
                                Button.width(this.isLargeScreen ? '30%' : '40%');
                                Button.height(this.buttonHeight - 5);
                                Button.fontSize(this.buttonFontSize - 2);
                                Button.backgroundColor('#E1BEE7');
                                Button.fontColor('#4A148C');
                                Button.margin({ top: 8, bottom: 8 });
                                Button.onClick(() => {
                                    this.destinyTargetIndex = index;
                                    this.destinyTrigger++;
                                    this.showDestinyPanel = false;
                                });
                            }, Button);
                            Button.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.getDestinyOptions(), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Flex.pop();
                    Column.pop();
                });
            }
            // 上方按钮行：开始抽奖 + 编辑选项
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 上方按钮行：开始抽奖 + 编辑选项
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(247:7)", "entry");
            // 上方按钮行：开始抽奖 + 编辑选项
            Row.width(this.isLargeScreen ? '70%' : '80%');
            // 上方按钮行：开始抽奖 + 编辑选项
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 上方按钮行：开始抽奖 + 编辑选项
            Row.margin({ top: this.columnGap });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isWheelSpinning ? '旋转中...' : '开始抽奖');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(248:9)", "entry");
            Button.width(this.isLargeScreen ? '30%' : '45%');
            Button.height(this.buttonHeight);
            Button.fontSize(this.buttonFontSize);
            Button.backgroundColor(this.isWheelSpinning ? '#CCCCCC' : '#FF6B6B');
            Button.fontColor(Color.White);
            Button.enabled(!this.isWheelSpinning);
            Button.onClick(() => {
                // 触发转盘旋转
                this.spinTrigger++;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('编辑选项');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(260:9)", "entry");
            Button.width(this.isLargeScreen ? '30%' : '45%');
            Button.height(this.buttonHeight);
            Button.fontSize(this.buttonFontSize);
            Button.backgroundColor('#FF9800');
            Button.fontColor(Color.White);
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/OptionEditor',
                    params: {
                        quantity: this.quantity,
                        optionTexts: this.optionTexts.slice(0, this.quantity)
                    }
                });
            });
        }, Button);
        Button.pop();
        // 上方按钮行：开始抽奖 + 编辑选项
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 下方按钮行：开始监听 + 测试播放
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/Index.ets(281:7)", "entry");
            // 下方按钮行：开始监听 + 测试播放
            Row.width(this.isLargeScreen ? '70%' : '80%');
            // 下方按钮行：开始监听 + 测试播放
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 下方按钮行：开始监听 + 测试播放
            Row.margin({ top: this.columnGap });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isVoiceListening ? '停止监听' : '开始监听');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(282:9)", "entry");
            Button.width(this.isLargeScreen ? '30%' : '45%');
            Button.height(this.buttonHeight);
            Button.fontSize(this.buttonFontSize);
            Button.backgroundColor(this.isVoiceListening ? '#F44336' : '#4CAF50');
            Button.fontColor(Color.White);
            Button.onClick(() => {
                if (this.isVoiceListening) {
                    this.stopVoiceRecognition();
                }
                else {
                    this.startVoiceRecognition();
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('测试播放');
            Button.debugLine("entry/src/main/ets/pages/Index.ets(296:9)", "entry");
            Button.width(this.isLargeScreen ? '30%' : '45%');
            Button.height(this.buttonHeight);
            Button.fontSize(this.buttonFontSize);
            Button.backgroundColor('#2196F3');
            Button.fontColor(Color.White);
            Button.onClick(async () => {
                try {
                    await this.audioService.playFromRawFile('guanyu.mp3');
                }
                catch (error) {
                    console.error(`Test play failed: ${error}`);
                }
            });
        }, Button);
        Button.pop();
        // 下方按钮行：开始监听 + 测试播放
        Row.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 数量控制器
                    CountController(this, {
                        quantity: this.__quantity
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 315, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            quantity: this.quantity
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "CountController" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.animation", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
