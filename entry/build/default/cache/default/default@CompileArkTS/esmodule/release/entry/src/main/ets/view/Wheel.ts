if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Wheel_Params {
    quantity?: number;
    optionTexts?: string[];
    isSpinningState?: boolean;
    spinTrigger?: number;
    destinyTrigger?: number;
    destinyTargetIndex?: number;
    rotateAngle?: number;
    isSpinning?: boolean;
    selectedIndex?: number;
    canvasReady?: boolean;
    currentOption?: string;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    wheelRadius?: number;
    colors?: string[];
    updateTimer?: number;
    onSpinComplete?: (selectedIndex: number) => void;
    onSpinStateChange?: (isSpinning: boolean) => void;
    labelPosition?: LabelPosition;
}
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import curves from "@native:ohos.curves";
interface LabelPosition {
    x: number;
    y: number;
}
export class Wheel extends ViewPU {
    constructor(k10, l10, m10, n10 = -1, o10 = undefined, p10) {
        super(k10, m10, n10, p10);
        if (typeof o10 === "function") {
            this.paramsGenerator_ = o10;
        }
        this.__quantity = new SynchedPropertySimpleTwoWayPU(l10.quantity, this, "quantity");
        this.__optionTexts = new SynchedPropertyObjectTwoWayPU(l10.optionTexts, this, "optionTexts");
        this.__isSpinningState = new SynchedPropertySimpleTwoWayPU(l10.isSpinningState, this, "isSpinningState");
        this.__spinTrigger = new SynchedPropertySimpleTwoWayPU(l10.spinTrigger, this, "spinTrigger");
        this.__destinyTrigger = new SynchedPropertySimpleTwoWayPU(l10.destinyTrigger, this, "destinyTrigger");
        this.__destinyTargetIndex = new SynchedPropertySimpleTwoWayPU(l10.destinyTargetIndex, this, "destinyTargetIndex");
        this.__rotateAngle = new ObservedPropertySimplePU(0, this, "rotateAngle");
        this.__isSpinning = new ObservedPropertySimplePU(false, this, "isSpinning");
        this.__selectedIndex = new ObservedPropertySimplePU(-1, this, "selectedIndex");
        this.__canvasReady = new ObservedPropertySimplePU(false, this, "canvasReady");
        this.__currentOption = new ObservedPropertySimplePU('等待开始', this, "currentOption");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.wheelRadius = 150;
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF6B35',
            '#1DD1A1', '#F368E0', '#FF9F43', '#EE5A24', '#00B894'
        ];
        this.updateTimer = -1;
        this.onSpinComplete = undefined;
        this.onSpinStateChange = undefined;
        this.labelPosition = { x: 0, y: 0 };
        this.setInitiallyProvidedValue(l10);
        this.declareWatch("quantity", this.onQuantityChange);
        this.declareWatch("spinTrigger", this.onSpinTrigger);
        this.declareWatch("destinyTrigger", this.onDestinyTrigger);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(j10: Wheel_Params) {
        if (j10.rotateAngle !== undefined) {
            this.rotateAngle = j10.rotateAngle;
        }
        if (j10.isSpinning !== undefined) {
            this.isSpinning = j10.isSpinning;
        }
        if (j10.selectedIndex !== undefined) {
            this.selectedIndex = j10.selectedIndex;
        }
        if (j10.canvasReady !== undefined) {
            this.canvasReady = j10.canvasReady;
        }
        if (j10.currentOption !== undefined) {
            this.currentOption = j10.currentOption;
        }
        if (j10.settings !== undefined) {
            this.settings = j10.settings;
        }
        if (j10.context !== undefined) {
            this.context = j10.context;
        }
        if (j10.wheelRadius !== undefined) {
            this.wheelRadius = j10.wheelRadius;
        }
        if (j10.colors !== undefined) {
            this.colors = j10.colors;
        }
        if (j10.updateTimer !== undefined) {
            this.updateTimer = j10.updateTimer;
        }
        if (j10.onSpinComplete !== undefined) {
            this.onSpinComplete = j10.onSpinComplete;
        }
        if (j10.onSpinStateChange !== undefined) {
            this.onSpinStateChange = j10.onSpinStateChange;
        }
        if (j10.labelPosition !== undefined) {
            this.labelPosition = j10.labelPosition;
        }
    }
    updateStateVars(i10: Wheel_Params) {
    }
    purgeVariableDependenciesOnElmtId(h10) {
        this.__quantity.purgeDependencyOnElmtId(h10);
        this.__optionTexts.purgeDependencyOnElmtId(h10);
        this.__isSpinningState.purgeDependencyOnElmtId(h10);
        this.__spinTrigger.purgeDependencyOnElmtId(h10);
        this.__destinyTrigger.purgeDependencyOnElmtId(h10);
        this.__destinyTargetIndex.purgeDependencyOnElmtId(h10);
        this.__rotateAngle.purgeDependencyOnElmtId(h10);
        this.__isSpinning.purgeDependencyOnElmtId(h10);
        this.__selectedIndex.purgeDependencyOnElmtId(h10);
        this.__canvasReady.purgeDependencyOnElmtId(h10);
        this.__currentOption.purgeDependencyOnElmtId(h10);
    }
    aboutToBeDeleted() {
        this.__quantity.aboutToBeDeleted();
        this.__optionTexts.aboutToBeDeleted();
        this.__isSpinningState.aboutToBeDeleted();
        this.__spinTrigger.aboutToBeDeleted();
        this.__destinyTrigger.aboutToBeDeleted();
        this.__destinyTargetIndex.aboutToBeDeleted();
        this.__rotateAngle.aboutToBeDeleted();
        this.__isSpinning.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__canvasReady.aboutToBeDeleted();
        this.__currentOption.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __quantity: SynchedPropertySimpleTwoWayPU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(g10: number) {
        this.__quantity.set(g10);
    }
    private __optionTexts: SynchedPropertySimpleOneWayPU<string[]>;
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(f10: string[]) {
        this.__optionTexts.set(f10);
    }
    private __isSpinningState: SynchedPropertySimpleTwoWayPU<boolean>;
    get isSpinningState() {
        return this.__isSpinningState.get();
    }
    set isSpinningState(e10: boolean) {
        this.__isSpinningState.set(e10);
    }
    private __spinTrigger: SynchedPropertySimpleTwoWayPU<number>;
    get spinTrigger() {
        return this.__spinTrigger.get();
    }
    set spinTrigger(d10: number) {
        this.__spinTrigger.set(d10);
    }
    private __destinyTrigger: SynchedPropertySimpleTwoWayPU<number>;
    get destinyTrigger() {
        return this.__destinyTrigger.get();
    }
    set destinyTrigger(c10: number) {
        this.__destinyTrigger.set(c10);
    }
    private __destinyTargetIndex: SynchedPropertySimpleTwoWayPU<number>;
    get destinyTargetIndex() {
        return this.__destinyTargetIndex.get();
    }
    set destinyTargetIndex(b10: number) {
        this.__destinyTargetIndex.set(b10);
    }
    private __rotateAngle: ObservedPropertySimplePU<number>;
    get rotateAngle() {
        return this.__rotateAngle.get();
    }
    set rotateAngle(a10: number) {
        this.__rotateAngle.set(a10);
    }
    private __isSpinning: ObservedPropertySimplePU<boolean>;
    get isSpinning() {
        return this.__isSpinning.get();
    }
    set isSpinning(z9: boolean) {
        this.__isSpinning.set(z9);
    }
    private __selectedIndex: ObservedPropertySimplePU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(y9: number) {
        this.__selectedIndex.set(y9);
    }
    private __canvasReady: ObservedPropertySimplePU<boolean>;
    get canvasReady() {
        return this.__canvasReady.get();
    }
    set canvasReady(x9: boolean) {
        this.__canvasReady.set(x9);
    }
    private __currentOption: ObservedPropertySimplePU<string>;
    get currentOption() {
        return this.__currentOption.get();
    }
    set currentOption(w9: string) {
        this.__currentOption.set(w9);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private wheelRadius: number;
    private colors: string[];
    private updateTimer: number;
    private onSpinComplete?: (selectedIndex: number) => void;
    private onSpinStateChange?: (isSpinning: boolean) => void;
    startSpin() {
        this.spin();
    }
    onQuantityChange() {
        this.selectedIndex = -1;
        this.rotateAngle = 0;
        if (this.canvasReady) {
            this.drawWheel();
        }
    }
    onSpinTrigger() {
        if (this.spinTrigger > 0) {
            this.spin();
        }
    }
    onDestinyTrigger() {
        if (this.destinyTrigger > 0 && this.destinyTargetIndex >= 0) {
            this.spinToTarget(this.destinyTargetIndex);
        }
    }
    drawWheel() {
        if (!this.context) {
            return;
        }
        const m9 = this.wheelRadius;
        const n9 = this.wheelRadius;
        const o9 = 2 * Math.PI / this.quantity;
        this.context.clearRect(0, 0, this.wheelRadius * 2, this.wheelRadius * 2);
        for (let p9 = 0; p9 < this.quantity; p9++) {
            const q9 = p9 * o9 - Math.PI / 2;
            const r9 = q9 + o9;
            this.context.beginPath();
            this.context.moveTo(m9, n9);
            this.context.arc(m9, n9, this.wheelRadius - 10, q9, r9);
            this.context.closePath();
            this.context.fillStyle = this.colors[p9 % this.colors.length];
            this.context.fill();
            this.context.strokeStyle = '#FFFFFF';
            this.context.lineWidth = 2;
            this.context.stroke();
            const s9 = q9 + o9 / 2;
            const t9 = this.wheelRadius - 40;
            const u9 = m9 + t9 * Math.cos(s9);
            const v9 = n9 + t9 * Math.sin(s9);
            this.context.save();
            this.context.translate(u9, v9);
            this.context.rotate(s9 + Math.PI / 2);
            this.context.fillStyle = '#FFFFFF';
            this.context.font = 'bold 18px sans-serif';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText(`${p9 + 1}`, 0, 0);
            this.context.restore();
        }
        this.context.beginPath();
        this.context.arc(m9, n9, 30, 0, 2 * Math.PI);
        this.context.fillStyle = '#FFFFFF';
        this.context.fill();
        this.context.strokeStyle = '#333333';
        this.context.lineWidth = 3;
        this.context.stroke();
    }
    getCurrentOption(i9: number): string {
        const j9 = 360 / this.quantity;
        const k9 = (360 - (i9 % 360)) % 360;
        const l9 = Math.floor(k9 / j9);
        return this.optionTexts[l9] || `选项${l9 + 1}`;
    }
    spin() {
        if (this.isSpinning) {
            return;
        }
        this.isSpinning = true;
        this.isSpinningState = true;
        if (this.onSpinStateChange) {
            this.onSpinStateChange(true);
        }
        this.selectedIndex = -1;
        this.currentOption = '旋转中...';
        const y8 = Math.floor(Math.random() * this.quantity);
        const z8 = 360 / this.quantity;
        const a9 = 5 + Math.floor(Math.random() * 3);
        const b9 = a9 * 360 + (360 - y8 * z8 - z8 / 2);
        let c9 = 0;
        const d9 = 0;
        const e9 = 3500;
        const f9 = 16;
        const g9 = e9 / f9;
        const h9 = (b9 - d9) / g9;
        this.updateTimer = setInterval(() => {
            c9 += h9;
            if (c9 >= b9) {
                clearInterval(this.updateTimer);
                this.currentOption = this.optionTexts[y8] || `选项${y8 + 1}`;
            }
            else {
                this.currentOption = this.getCurrentOption(c9);
            }
        }, f9);
        this.getUIContext().animateTo({
            duration: e9,
            curve: curves.springCurve(0, 1, 120, 12),
            onFinish: () => {
                this.isSpinning = false;
                this.isSpinningState = false;
                if (this.onSpinStateChange) {
                    this.onSpinStateChange(false);
                }
                this.selectedIndex = y8;
                this.currentOption = this.optionTexts[y8] || `选项${y8 + 1}`;
                if (this.updateTimer !== -1) {
                    clearInterval(this.updateTimer);
                    this.updateTimer = -1;
                }
                if (this.onSpinComplete) {
                    this.onSpinComplete(y8);
                }
            }
        }, () => {
            this.rotateAngle = b9;
        });
    }
    spinToTarget(o8: number) {
        if (this.isSpinning) {
            return;
        }
        if (o8 < 0 || o8 >= this.quantity) {
            return;
        }
        this.isSpinning = true;
        this.isSpinningState = true;
        if (this.onSpinStateChange) {
            this.onSpinStateChange(true);
        }
        this.selectedIndex = -1;
        this.currentOption = '天意降临...';
        const p8 = 360 / this.quantity;
        const q8 = 5 + Math.floor(Math.random() * 3);
        const r8 = q8 * 360 + (360 - o8 * p8 - p8 / 2);
        let s8 = 0;
        const t8 = 0;
        const u8 = 3500;
        const v8 = 16;
        const w8 = u8 / v8;
        const x8 = (r8 - t8) / w8;
        this.updateTimer = setInterval(() => {
            s8 += x8;
            if (s8 >= r8) {
                clearInterval(this.updateTimer);
                this.currentOption = this.optionTexts[o8] || `选项${o8 + 1}`;
            }
            else {
                this.currentOption = this.getCurrentOption(s8);
            }
        }, v8);
        this.getUIContext().animateTo({
            duration: u8,
            curve: curves.springCurve(0, 1, 120, 12),
            onFinish: () => {
                this.isSpinning = false;
                this.isSpinningState = false;
                if (this.onSpinStateChange) {
                    this.onSpinStateChange(false);
                }
                this.selectedIndex = o8;
                this.currentOption = this.optionTexts[o8] || `选项${o8 + 1}`;
                if (this.updateTimer !== -1) {
                    clearInterval(this.updateTimer);
                    this.updateTimer = -1;
                }
                if (this.onSpinComplete) {
                    this.onSpinComplete(o8);
                }
            }
        }, () => {
            this.rotateAngle = r8;
        });
    }
    private labelPosition: LabelPosition;
    private getIndexArray(): number[] {
        const m8: number[] = [];
        for (let n8 = 0; n8 < this.quantity; n8++) {
            m8.push(n8);
        }
        return m8;
    }
    getLabelPosition(c8: number): LabelPosition {
        const d8 = 360 / this.quantity;
        const e8 = c8 * d8 - 90 + d8 / 2;
        const f8 = e8 * Math.PI / 180;
        const g8 = this.wheelRadius + 50;
        const h8 = this.wheelRadius + 60;
        const i8 = this.wheelRadius + 60;
        const j8 = h8 + g8 * Math.cos(f8);
        const k8 = i8 + g8 * Math.sin(f8);
        const l8: LabelPosition = { x: j8 - (this.quantity > 8 ? 25 : 30), y: k8 - 15 };
        return l8;
    }
    initialRender() {
        this.observeComponentCreation2((a8, b8) => {
            Column.create();
            Column.width(Common.DEFAULT_FULL_WIDTH);
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((y7, z7) => {
            Column.create();
            Column.width('80%');
            Column.height(60);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({ radius: 8, color: '#40000000', offsetX: 0, offsetY: 2 });
            Column.margin({ top: 20, bottom: 10 });
        }, Column);
        this.observeComponentCreation2((w7, x7) => {
            Text.create(this.currentOption);
            Text.fontSize(24);
            Text.fontColor(this.isSpinning ? '#FF6B6B' : '#333333');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((u7, v7) => {
            Stack.create();
            Stack.width(this.wheelRadius * 2 + 120);
            Stack.height(this.wheelRadius * 2 + 120);
            Stack.margin({ top: 10 });
        }, Stack);
        this.observeComponentCreation2((s7, t7) => {
            Canvas.create(this.context);
            Canvas.width(this.wheelRadius * 2);
            Canvas.height(this.wheelRadius * 2);
            Canvas.onReady(() => {
                this.canvasReady = true;
                this.drawWheel();
            });
            Canvas.rotate({ angle: this.rotateAngle });
        }, Canvas);
        Canvas.pop();
        this.observeComponentCreation2((q7, r7) => {
            Column.create();
            Column.width(4);
            Column.height(40);
            Column.backgroundColor('#FF0000');
            Column.position({ x: this.wheelRadius - 2, y: 0 });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((g7, h7) => {
            ForEach.create();
            const i7 = k7 => {
                const l7 = k7;
                this.observeComponentCreation2((o7, p7) => {
                    Column.create();
                    Column.width(this.quantity > 8 ? 50 : 60);
                    Column.padding(4);
                    Column.backgroundColor(this.colors[l7 % this.colors.length]);
                    Column.borderRadius(6);
                    Column.shadow({ radius: 4, color: '#30000000', offsetX: 0, offsetY: 2 });
                    Column.position(this.getLabelPosition(l7));
                }, Column);
                this.observeComponentCreation2((m7, n7) => {
                    Text.create(this.optionTexts[l7] || `选项${l7 + 1}`);
                    Text.fontSize(this.quantity > 8 ? 10 : 12);
                    Text.fontColor('#333333');
                    Text.fontWeight(FontWeight.Medium);
                    Text.maxLines(2);
                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(g7, this.getIndexArray(), i7, (j7: number): string => j7.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
        this.observeComponentCreation2((c7, d7) => {
            If.create();
            if (this.selectedIndex >= 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((e7, f7) => {
                        Text.create(`恭喜选中：选项${this.selectedIndex + 1}`);
                        Text.fontSize(20);
                        Text.fontColor('#333333');
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
