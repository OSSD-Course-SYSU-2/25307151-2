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
}
import { Wheel } from "@bundle:com.example.animation/entry/ets/view/Wheel";
import { CountController } from "@bundle:com.example.animation/entry/ets/view/CountController";
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import router from "@ohos:router";
import { VoiceRecognitionService } from "@bundle:com.example.animation/entry/ets/service/VoiceRecognitionService";
import { AudioPlayerService } from "@bundle:com.example.animation/entry/ets/service/AudioPlayerService";
import type common from "@ohos:app.ability.common";
class Index extends ViewPU {
    constructor(u2, v2, w2, x2 = -1, y2 = undefined, z2) {
        super(u2, w2, x2, z2);
        if (typeof y2 === "function") {
            this.paramsGenerator_ = y2;
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
        this.setInitiallyProvidedValue(v2);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(t2: Index_Params) {
        if (t2.quantity !== undefined) {
            this.quantity = t2.quantity;
        }
        if (t2.optionTexts !== undefined) {
            this.optionTexts = t2.optionTexts;
        }
        if (t2.isVoiceListening !== undefined) {
            this.isVoiceListening = t2.isVoiceListening;
        }
        if (t2.voiceStatus !== undefined) {
            this.voiceStatus = t2.voiceStatus;
        }
        if (t2.isWheelSpinning !== undefined) {
            this.isWheelSpinning = t2.isWheelSpinning;
        }
        if (t2.spinTrigger !== undefined) {
            this.spinTrigger = t2.spinTrigger;
        }
        if (t2.destinyTrigger !== undefined) {
            this.destinyTrigger = t2.destinyTrigger;
        }
        if (t2.destinyTargetIndex !== undefined) {
            this.destinyTargetIndex = t2.destinyTargetIndex;
        }
        if (t2.showDestinyPanel !== undefined) {
            this.showDestinyPanel = t2.showDestinyPanel;
        }
        if (t2.voiceService !== undefined) {
            this.voiceService = t2.voiceService;
        }
        if (t2.audioService !== undefined) {
            this.audioService = t2.audioService;
        }
    }
    updateStateVars(s2: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(r2) {
        this.__quantity.purgeDependencyOnElmtId(r2);
        this.__optionTexts.purgeDependencyOnElmtId(r2);
        this.__isVoiceListening.purgeDependencyOnElmtId(r2);
        this.__voiceStatus.purgeDependencyOnElmtId(r2);
        this.__isWheelSpinning.purgeDependencyOnElmtId(r2);
        this.__spinTrigger.purgeDependencyOnElmtId(r2);
        this.__destinyTrigger.purgeDependencyOnElmtId(r2);
        this.__destinyTargetIndex.purgeDependencyOnElmtId(r2);
        this.__showDestinyPanel.purgeDependencyOnElmtId(r2);
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
    set quantity(q2: number) {
        this.__quantity.set(q2);
    }
    private __optionTexts: ObservedPropertyObjectPU<string[]>;
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(p2: string[]) {
        this.__optionTexts.set(p2);
    }
    private __isVoiceListening: ObservedPropertySimplePU<boolean>;
    get isVoiceListening() {
        return this.__isVoiceListening.get();
    }
    set isVoiceListening(o2: boolean) {
        this.__isVoiceListening.set(o2);
    }
    private __voiceStatus: ObservedPropertySimplePU<string>;
    get voiceStatus() {
        return this.__voiceStatus.get();
    }
    set voiceStatus(n2: string) {
        this.__voiceStatus.set(n2);
    }
    private __isWheelSpinning: ObservedPropertySimplePU<boolean>;
    get isWheelSpinning() {
        return this.__isWheelSpinning.get();
    }
    set isWheelSpinning(m2: boolean) {
        this.__isWheelSpinning.set(m2);
    }
    private __spinTrigger: ObservedPropertySimplePU<number>;
    get spinTrigger() {
        return this.__spinTrigger.get();
    }
    set spinTrigger(l2: number) {
        this.__spinTrigger.set(l2);
    }
    private __destinyTrigger: ObservedPropertySimplePU<number>;
    get destinyTrigger() {
        return this.__destinyTrigger.get();
    }
    set destinyTrigger(k2: number) {
        this.__destinyTrigger.set(k2);
    }
    private __destinyTargetIndex: ObservedPropertySimplePU<number>;
    get destinyTargetIndex() {
        return this.__destinyTargetIndex.get();
    }
    set destinyTargetIndex(j2: number) {
        this.__destinyTargetIndex.set(j2);
    }
    private __showDestinyPanel: ObservedPropertySimplePU<boolean>;
    get showDestinyPanel() {
        return this.__showDestinyPanel.get();
    }
    set showDestinyPanel(i2: boolean) {
        this.__showDestinyPanel.set(i2);
    }
    private voiceService: VoiceRecognitionService;
    private audioService: AudioPlayerService;
    aboutToAppear() {
        this.initOptionTexts();
        const h2 = getContext(this) as common.UIAbilityContext;
        this.audioService.init(h2);
    }
    aboutToDisappear() {
        this.voiceService.destroy();
        this.audioService.release();
    }
    aboutToForeground() {
        const f2 = AppStorage.get<string[]>('editedOptionTexts');
        if (f2 && f2.length > 0) {
            for (let g2 = 0; g2 < f2.length; g2++) {
                this.optionTexts[g2] = f2[g2];
            }
            AppStorage.delete('editedOptionTexts');
        }
    }
    initOptionTexts() {
        this.optionTexts = [];
        for (let e2 = 0; e2 < Common.IMAGES_TOTAL; e2++) {
            if (e2 === 0) {
                this.optionTexts.push('一对笑面虎');
            }
            else if (e2 === 1) {
                this.optionTexts.push('两头乌角鲨');
            }
            else if (e2 === 2) {
                this.optionTexts.push('三军听令，自刎归天');
            }
            else if (e2 === 3) {
                this.optionTexts.push('死是凉爽的夏夜');
            }
            else if (e2 === 4) {
                this.optionTexts.push('五百个弟兄全死了都值');
            }
            else if (e2 === 5) {
                this.optionTexts.push('六亲不认，水火无敌');
            }
            else {
                this.optionTexts.push(`选项${e2 + 1}`);
            }
        }
    }
    async startVoiceRecognition() {
        this.voiceStatus = '正在启动...';
        const d2 = await this.voiceService.startListening(() => {
            this.onTriggerWordDetected();
        });
        if (d2) {
            this.isVoiceListening = true;
            this.voiceStatus = '正在监听中';
        }
        else {
            this.voiceStatus = '启动失败';
        }
    }
    stopVoiceRecognition() {
        this.voiceService.stopListening();
        this.isVoiceListening = false;
        this.voiceStatus = '已停止';
    }
    getDestinyOptions(): number[] {
        const b2: number[] = [];
        for (let c2 = 0; c2 < this.quantity; c2++) {
            b2.push(c2);
        }
        return b2;
    }
    async onTriggerWordDetected() {
        console.info('Index: Trigger word "释怀" detected!');
        this.voiceStatus = '检测到"释怀"！播放音乐...';
        try {
            await this.audioService.playFromRawFile('guanyu.mp3');
            setTimeout(() => {
                if (this.isVoiceListening) {
                    this.voiceStatus = '正在监听中';
                }
            }, 3000);
        }
        catch (a2) {
            console.error(`Index: Failed to play audio - ${a2}`);
            this.voiceStatus = '播放失败';
        }
    }
    async onWheelSpinComplete(x1: number) {
        console.info(`Index: Wheel spin completed, selected index: ${x1}`);
        const y1 = this.optionTexts[x1] || `选项${x1 + 1}`;
        console.info(`Index: Selected option: ${y1}`);
        try {
            console.info('Index: Auto-playing audio after spin complete');
            await this.audioService.playFromRawFile('guanyu.mp3');
        }
        catch (z1) {
            console.error(`Index: Failed to play audio after spin - ${z1}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((v1, w1) => {
            Column.create();
            Column.width(Common.DEFAULT_FULL_WIDTH);
            Column.height(Common.DEFAULT_FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((p1, q1) => {
                if (q1) {
                    let r1 = new Wheel(this, {
                        quantity: this.__quantity,
                        optionTexts: this.__optionTexts,
                        isSpinningState: this.__isWheelSpinning,
                        spinTrigger: this.__spinTrigger,
                        destinyTrigger: this.__destinyTrigger,
                        destinyTargetIndex: this.__destinyTargetIndex,
                        onSpinComplete: (u1: number) => {
                            this.onWheelSpinComplete(u1);
                        }
                    }, undefined, p1, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 168, col: 7 });
                    ViewPU.create(r1);
                    let s1 = () => {
                        return {
                            quantity: this.quantity,
                            optionTexts: this.optionTexts,
                            isSpinningState: this.isWheelSpinning,
                            spinTrigger: this.spinTrigger,
                            destinyTrigger: this.destinyTrigger,
                            destinyTargetIndex: this.destinyTargetIndex,
                            onSpinComplete: (t1: number) => {
                                this.onWheelSpinComplete(t1);
                            }
                        };
                    };
                    r1.paramsGenerator_ = s1;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(p1, {});
                }
            }, { name: "Wheel" });
        }
        this.observeComponentCreation2((n1, o1) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.margin({ top: 15 });
        }, Row);
        this.observeComponentCreation2((l1, m1) => {
            Button.createWithLabel('🎯 天意');
            Button.width('80%');
            Button.height(45);
            Button.fontSize(16);
            Button.backgroundColor('#9C27B0');
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.showDestinyPanel = !this.showDestinyPanel;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((w, x) => {
            If.create();
            if (this.showDestinyPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((j1, k1) => {
                        Column.create();
                        Column.width('85%');
                        Column.padding(15);
                        Column.backgroundColor('#F3E5F5');
                        Column.borderRadius(12);
                        Column.margin({ top: 10 });
                    }, Column);
                    this.observeComponentCreation2((h1, i1) => {
                        Text.create('选择天意目标');
                        Text.fontSize(16);
                        Text.fontColor('#666666');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((f1, g1) => {
                        Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceEvenly });
                        Flex.width('90%');
                    }, Flex);
                    this.observeComponentCreation2((y, z) => {
                        ForEach.create();
                        const a1 = b1 => {
                            const c1 = b1;
                            this.observeComponentCreation2((d1, e1) => {
                                Button.createWithLabel(this.optionTexts[c1] || `选项${c1 + 1}`);
                                Button.width('40%');
                                Button.height(40);
                                Button.fontSize(14);
                                Button.backgroundColor('#E1BEE7');
                                Button.fontColor('#4A148C');
                                Button.margin({ top: 8, bottom: 8 });
                                Button.onClick(() => {
                                    this.destinyTargetIndex = c1;
                                    this.destinyTrigger++;
                                    this.showDestinyPanel = false;
                                });
                            }, Button);
                            Button.pop();
                        };
                        this.forEachUpdateFunction(y, this.getDestinyOptions(), a1);
                    }, ForEach);
                    ForEach.pop();
                    Flex.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((u, v) => {
            Row.create();
            Row.width('80%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((s, t) => {
            Button.createWithLabel(this.isWheelSpinning ? '旋转中...' : '开始抽奖');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
            Button.backgroundColor(this.isWheelSpinning ? '#CCCCCC' : '#FF6B6B');
            Button.fontColor(Color.White);
            Button.enabled(!this.isWheelSpinning);
            Button.onClick(() => {
                this.spinTrigger++;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((q, r) => {
            Button.createWithLabel('编辑选项');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
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
        Row.pop();
        this.observeComponentCreation2((o, p) => {
            Row.create();
            Row.width('80%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 15 });
        }, Row);
        this.observeComponentCreation2((m, n) => {
            Button.createWithLabel(this.isVoiceListening ? '停止监听' : '开始监听');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
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
        this.observeComponentCreation2((j, k) => {
            Button.createWithLabel('测试播放');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
            Button.backgroundColor('#2196F3');
            Button.fontColor(Color.White);
            Button.onClick(async () => {
                try {
                    await this.audioService.playFromRawFile('guanyu.mp3');
                }
                catch (l) {
                    console.error(`Test play failed: ${l}`);
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        {
            this.observeComponentCreation2((f, g) => {
                if (g) {
                    let h = new CountController(this, {
                        quantity: this.__quantity
                    }, undefined, f, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 298, col: 7 });
                    ViewPU.create(h);
                    let i = () => {
                        return {
                            quantity: this.quantity
                        };
                    };
                    h.paramsGenerator_ = i;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(f, {});
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
