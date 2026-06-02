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
    titleFontSize?: number;
    labelFontSize?: number;
    labelWidth?: number;
    labelOffset?: number;
    colors?: string[];
    updateTimer?: number;
    onSpinComplete?: (selectedIndex: number) => void;
    onSpinStateChange?: (isSpinning: boolean) => void;
    labelPosition?: LabelPosition;
}
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
import curves from "@native:ohos.curves";
import { getDeviceAdapter } from "@bundle:com.example.animation/entry/ets/common/utils/DeviceAdapter";
// 字幕标签位置接口
interface LabelPosition {
    x: number;
    y: number;
}
export class Wheel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__quantity = new SynchedPropertySimpleTwoWayPU(params.quantity, this, "quantity");
        this.__optionTexts = new SynchedPropertyObjectTwoWayPU(params.optionTexts, this, "optionTexts");
        this.__isSpinningState = new SynchedPropertySimpleTwoWayPU(params.isSpinningState, this, "isSpinningState");
        this.__spinTrigger = new SynchedPropertySimpleTwoWayPU(params.spinTrigger, this, "spinTrigger");
        this.__destinyTrigger = new SynchedPropertySimpleTwoWayPU(params.destinyTrigger, this, "destinyTrigger");
        this.__destinyTargetIndex = new SynchedPropertySimpleTwoWayPU(params.destinyTargetIndex, this, "destinyTargetIndex");
        this.__rotateAngle = new ObservedPropertySimplePU(0, this, "rotateAngle");
        this.__isSpinning = new ObservedPropertySimplePU(false, this, "isSpinning");
        this.__selectedIndex = new ObservedPropertySimplePU(-1, this, "selectedIndex");
        this.__canvasReady = new ObservedPropertySimplePU(false, this, "canvasReady");
        this.__currentOption = new ObservedPropertySimplePU('等待开始', this, "currentOption");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.wheelRadius = 130;
        this.titleFontSize = 20;
        this.labelFontSize = 10;
        this.labelWidth = 50;
        this.labelOffset = 45;
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
        this.setInitiallyProvidedValue(params);
        this.declareWatch("quantity", this.onQuantityChange);
        this.declareWatch("spinTrigger", this.onSpinTrigger);
        this.declareWatch("destinyTrigger", this.onDestinyTrigger);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Wheel_Params) {
        if (params.rotateAngle !== undefined) {
            this.rotateAngle = params.rotateAngle;
        }
        if (params.isSpinning !== undefined) {
            this.isSpinning = params.isSpinning;
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
        if (params.canvasReady !== undefined) {
            this.canvasReady = params.canvasReady;
        }
        if (params.currentOption !== undefined) {
            this.currentOption = params.currentOption;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.wheelRadius !== undefined) {
            this.wheelRadius = params.wheelRadius;
        }
        if (params.titleFontSize !== undefined) {
            this.titleFontSize = params.titleFontSize;
        }
        if (params.labelFontSize !== undefined) {
            this.labelFontSize = params.labelFontSize;
        }
        if (params.labelWidth !== undefined) {
            this.labelWidth = params.labelWidth;
        }
        if (params.labelOffset !== undefined) {
            this.labelOffset = params.labelOffset;
        }
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.updateTimer !== undefined) {
            this.updateTimer = params.updateTimer;
        }
        if (params.onSpinComplete !== undefined) {
            this.onSpinComplete = params.onSpinComplete;
        }
        if (params.onSpinStateChange !== undefined) {
            this.onSpinStateChange = params.onSpinStateChange;
        }
        if (params.labelPosition !== undefined) {
            this.labelPosition = params.labelPosition;
        }
    }
    updateStateVars(params: Wheel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__quantity.purgeDependencyOnElmtId(rmElmtId);
        this.__optionTexts.purgeDependencyOnElmtId(rmElmtId);
        this.__isSpinningState.purgeDependencyOnElmtId(rmElmtId);
        this.__spinTrigger.purgeDependencyOnElmtId(rmElmtId);
        this.__destinyTrigger.purgeDependencyOnElmtId(rmElmtId);
        this.__destinyTargetIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__rotateAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__isSpinning.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__canvasReady.purgeDependencyOnElmtId(rmElmtId);
        this.__currentOption.purgeDependencyOnElmtId(rmElmtId);
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
    set quantity(newValue: number) {
        this.__quantity.set(newValue);
    }
    private __optionTexts: SynchedPropertySimpleOneWayPU<string[]>; // 选项文本数组
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(newValue: string[]) {
        this.__optionTexts.set(newValue);
    }
    private __isSpinningState: SynchedPropertySimpleTwoWayPU<boolean>; // 暴露旋转状态给父组件
    get isSpinningState() {
        return this.__isSpinningState.get();
    }
    set isSpinningState(newValue: boolean) {
        this.__isSpinningState.set(newValue);
    }
    private __spinTrigger: SynchedPropertySimpleTwoWayPU<number>; // 旋转触发器（改变时触发旋转）
    get spinTrigger() {
        return this.__spinTrigger.get();
    }
    set spinTrigger(newValue: number) {
        this.__spinTrigger.set(newValue);
    }
    private __destinyTrigger: SynchedPropertySimpleTwoWayPU<number>; // 天意触发器
    get destinyTrigger() {
        return this.__destinyTrigger.get();
    }
    set destinyTrigger(newValue: number) {
        this.__destinyTrigger.set(newValue);
    }
    private __destinyTargetIndex: SynchedPropertySimpleTwoWayPU<number>; // 天意目标选项索引
    get destinyTargetIndex() {
        return this.__destinyTargetIndex.get();
    }
    set destinyTargetIndex(newValue: number) {
        this.__destinyTargetIndex.set(newValue);
    }
    private __rotateAngle: ObservedPropertySimplePU<number>;
    get rotateAngle() {
        return this.__rotateAngle.get();
    }
    set rotateAngle(newValue: number) {
        this.__rotateAngle.set(newValue);
    }
    private __isSpinning: ObservedPropertySimplePU<boolean>;
    get isSpinning() {
        return this.__isSpinning.get();
    }
    set isSpinning(newValue: boolean) {
        this.__isSpinning.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimplePU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __canvasReady: ObservedPropertySimplePU<boolean>; // 标记canvas是否准备好
    get canvasReady() {
        return this.__canvasReady.get();
    }
    set canvasReady(newValue: boolean) {
        this.__canvasReady.set(newValue);
    }
    private __currentOption: ObservedPropertySimplePU<string>; // 当前指针指向的选项
    get currentOption() {
        return this.__currentOption.get();
    }
    set currentOption(newValue: string) {
        this.__currentOption.set(newValue);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    // 响应式转盘半径 - 根据设备类型自动调整
    private wheelRadius: number;
    // 响应式布局参数
    private titleFontSize: number;
    private labelFontSize: number;
    private labelWidth: number;
    private labelOffset: number;
    private colors: string[];
    private updateTimer: number; // 定时器ID
    private onSpinComplete?: (selectedIndex: number) => void; // 旋转完成回调
    private onSpinStateChange?: (isSpinning: boolean) => void; // 旋转状态变化回调
    aboutToAppear(): void {
        // 初始化响应式布局参数
        const adapter = getDeviceAdapter();
        this.wheelRadius = adapter.getWheelRadius();
        this.titleFontSize = adapter.getTitleFontSize();
        this.labelFontSize = adapter.getLabelFontSize();
        this.labelWidth = adapter.getLabelWidth();
        this.labelOffset = adapter.getLabelOffset();
    }
    // 暴露给父组件的方法
    startSpin() {
        this.spin();
    }
    onQuantityChange() {
        this.selectedIndex = -1;
        this.rotateAngle = 0; // 重置旋转角度
        // 数量变化时重新绘制转盘
        if (this.canvasReady) {
            this.drawWheel();
        }
    }
    // 监听旋转触发器
    onSpinTrigger() {
        if (this.spinTrigger > 0) {
            this.spin();
        }
    }
    // 监听天意触发器
    onDestinyTrigger() {
        if (this.destinyTrigger > 0 && this.destinyTargetIndex >= 0) {
            this.spinToTarget(this.destinyTargetIndex);
        }
    }
    // 绘制转盘（不包含文字，文字在外部显示）
    drawWheel() {
        if (!this.context) {
            return;
        }
        const centerX = this.wheelRadius;
        const centerY = this.wheelRadius;
        const anglePerSection = 2 * Math.PI / this.quantity;
        // 清空画布
        this.context.clearRect(0, 0, this.wheelRadius * 2, this.wheelRadius * 2);
        // 绘制每个扇形（不绘制文字）
        // 起始角度偏移半个扇形，让选项0的中心在顶部(指针位置)
        const startOffset = -Math.PI / 2 - anglePerSection / 2;
        for (let i = 0; i < this.quantity; i++) {
            const startAngle = i * anglePerSection + startOffset;
            const endAngle = startAngle + anglePerSection;
            // 绘制扇形
            this.context.beginPath();
            this.context.moveTo(centerX, centerY);
            this.context.arc(centerX, centerY, this.wheelRadius - 10, startAngle, endAngle);
            this.context.closePath();
            this.context.fillStyle = this.colors[i % this.colors.length];
            this.context.fill();
            // 绘制边框
            this.context.strokeStyle = '#FFFFFF';
            this.context.lineWidth = 2;
            this.context.stroke();
            // 绘制序号（在扇形中心位置）
            const textAngle = startAngle + anglePerSection / 2;
            const textRadius = this.wheelRadius - 40;
            const textX = centerX + textRadius * Math.cos(textAngle);
            const textY = centerY + textRadius * Math.sin(textAngle);
            this.context.save();
            this.context.translate(textX, textY);
            this.context.rotate(textAngle + Math.PI / 2);
            this.context.fillStyle = '#FFFFFF';
            this.context.font = 'bold 18px sans-serif';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText(`${i + 1}`, 0, 0);
            this.context.restore();
        }
        // 绘制中心圆
        this.context.beginPath();
        this.context.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        this.context.fillStyle = '#FFFFFF';
        this.context.fill();
        this.context.strokeStyle = '#333333';
        this.context.lineWidth = 3;
        this.context.stroke();
    }
    // 根据当前角度计算指针指向的选项
    // 绘制时选项i的中心在 (i * anglePerSection - 90°) 位置(Canvas坐标)
    // 指针固定在顶部(270° Canvas坐标)
    getCurrentOption(angle: number): string {
        const anglePerSection = 360 / this.quantity;
        // 将角度归一化到 0-360 范围
        const normalizedAngle = ((angle % 360) + 360) % 360;
        // 旋转normalizedAngle度后，选项i的中心移动到 = i * anglePerSection - 90 + normalizedAngle
        // 指针在270°，指向的选项满足: i * anglePerSection - 90 + normalizedAngle ≈ 270 (mod 360)
        // 简化: i * anglePerSection + normalizedAngle ≈ 360 (mod 360)
        // 即: i ≈ (360 - normalizedAngle) / anglePerSection
        let pointerValue = 360 - normalizedAngle;
        // 确保为正数
        while (pointerValue < 0) {
            pointerValue += 360;
        }
        pointerValue = pointerValue % 360;
        const optionIndex = Math.floor(pointerValue / anglePerSection);
        return this.optionTexts[optionIndex] || `选项${optionIndex + 1}`;
    }
    // 计算旋转到目标选项所需的角度增量
    private calculateTargetAngle(targetIndex: number): number {
        const anglePerSection = 360 / this.quantity;
        // 目标选项的中心角度(Canvas坐标) = targetIndex * anglePerSection - 90
        // 指针在270°，需要让目标中心移动到270°
        // 目标中心 + 当前角度 + 旋转增量 ≡ 270 (mod 360)
        // 旋转增量 = 270 - 目标中心 - 当前角度 (mod 360)
        // 旋转增量 = 270 - (targetIndex * anglePerSection - 90) - 当前角度 (mod 360)
        // 旋转增量 = 360 - targetIndex * anglePerSection - 当前角度 (mod 360)
        const currentNormalized = ((this.rotateAngle % 360) + 360) % 360;
        let delta = 360 - targetIndex * anglePerSection - currentNormalized;
        // 确保正向旋转(顺时针)
        while (delta < 0) {
            delta += 360;
        }
        // 加上额外圈数
        const extraRotations = 5 + Math.floor(Math.random() * 3);
        return extraRotations * 360 + delta;
    }
    // 开始旋转
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
        // 随机选择结果
        const targetIndex = Math.floor(Math.random() * this.quantity);
        // 计算需要旋转的角度增量
        const angleDelta = this.calculateTargetAngle(targetIndex);
        const startAngle = this.rotateAngle;
        const targetAngle = startAngle + angleDelta;
        // 动画参数
        const animationDuration = 3500;
        const updateInterval = 16;
        const totalSteps = animationDuration / updateInterval;
        const angleStep = angleDelta / totalSteps;
        // 用于更新显示的当前角度
        let displayAngle = startAngle;
        this.updateTimer = setInterval(() => {
            displayAngle += angleStep;
            if (displayAngle >= targetAngle) {
                clearInterval(this.updateTimer);
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
            }
            else {
                this.currentOption = this.getCurrentOption(displayAngle);
            }
        }, updateInterval);
        // 执行旋转动画
        this.getUIContext().animateTo({
            duration: animationDuration,
            curve: curves.springCurve(0, 1, 120, 12),
            onFinish: () => {
                this.isSpinning = false;
                this.isSpinningState = false;
                if (this.onSpinStateChange) {
                    this.onSpinStateChange(false);
                }
                this.selectedIndex = targetIndex;
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
                if (this.updateTimer !== -1) {
                    clearInterval(this.updateTimer);
                    this.updateTimer = -1;
                }
                if (this.onSpinComplete) {
                    this.onSpinComplete(targetIndex);
                }
            }
        }, () => {
            this.rotateAngle = targetAngle;
        });
    }
    // 旋转到指定目标（天意功能）
    spinToTarget(targetIndex: number) {
        if (this.isSpinning) {
            return;
        }
        if (targetIndex < 0 || targetIndex >= this.quantity) {
            return;
        }
        this.isSpinning = true;
        this.isSpinningState = true;
        if (this.onSpinStateChange) {
            this.onSpinStateChange(true);
        }
        this.selectedIndex = -1;
        this.currentOption = '天意降临...';
        // 计算需要旋转的角度增量
        const angleDelta = this.calculateTargetAngle(targetIndex);
        const startAngle = this.rotateAngle;
        const targetAngle = startAngle + angleDelta;
        // 动画参数
        const animationDuration = 3500;
        const updateInterval = 16;
        const totalSteps = animationDuration / updateInterval;
        const angleStep = angleDelta / totalSteps;
        // 用于更新显示的当前角度
        let displayAngle = startAngle;
        this.updateTimer = setInterval(() => {
            displayAngle += angleStep;
            if (displayAngle >= targetAngle) {
                clearInterval(this.updateTimer);
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
            }
            else {
                this.currentOption = this.getCurrentOption(displayAngle);
            }
        }, updateInterval);
        // 执行旋转动画
        this.getUIContext().animateTo({
            duration: animationDuration,
            curve: curves.springCurve(0, 1, 120, 12),
            onFinish: () => {
                this.isSpinning = false;
                this.isSpinningState = false;
                if (this.onSpinStateChange) {
                    this.onSpinStateChange(false);
                }
                this.selectedIndex = targetIndex;
                this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
                if (this.updateTimer !== -1) {
                    clearInterval(this.updateTimer);
                    this.updateTimer = -1;
                }
                if (this.onSpinComplete) {
                    this.onSpinComplete(targetIndex);
                }
            }
        }, () => {
            this.rotateAngle = targetAngle;
        });
    }
    // 字幕标签位置
    private labelPosition: LabelPosition;
    // 获取索引数组
    private getIndexArray(): number[] {
        const arr: number[] = [];
        for (let i = 0; i < this.quantity; i++) {
            arr.push(i);
        }
        return arr;
    }
    // 计算字幕标签位置
    // 选项i的中心角度(Canvas坐标) = i * anglePerSection - 90°
    getLabelPosition(index: number): LabelPosition {
        const anglePerSection = 360 / this.quantity;
        // 选项中心角度(度数)
        const angle = index * anglePerSection - 90;
        const radians = angle * Math.PI / 180;
        const labelRadius = this.wheelRadius + this.labelOffset;
        const centerX = this.wheelRadius + this.labelOffset + 10;
        const centerY = this.wheelRadius + this.labelOffset + 10;
        const labelX = centerX + labelRadius * Math.cos(radians);
        const labelY = centerY + labelRadius * Math.sin(radians);
        const result: LabelPosition = { x: labelX - this.labelWidth / 2, y: labelY - 15 };
        return result;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Wheel.ets(356:5)", "entry");
            Column.width(Common.DEFAULT_FULL_WIDTH);
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 当前选项显示框
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Wheel.ets(358:7)", "entry");
            // 当前选项显示框
            Column.width('80%');
            // 当前选项显示框
            Column.height(60);
            // 当前选项显示框
            Column.justifyContent(FlexAlign.Center);
            // 当前选项显示框
            Column.backgroundColor('#FFFFFF');
            // 当前选项显示框
            Column.borderRadius(12);
            // 当前选项显示框
            Column.shadow({ radius: 8, color: '#40000000', offsetX: 0, offsetY: 2 });
            // 当前选项显示框
            Column.margin({ top: 20, bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentOption);
            Text.debugLine("entry/src/main/ets/view/Wheel.ets(359:9)", "entry");
            Text.fontSize(this.titleFontSize);
            Text.fontColor(this.isSpinning ? '#FF6B6B' : '#333333');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 当前选项显示框
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 转盘和字幕区域
            Stack.create();
            Stack.debugLine("entry/src/main/ets/view/Wheel.ets(373:7)", "entry");
            // 转盘和字幕区域
            Stack.width(this.wheelRadius * 2 + this.labelOffset * 2 + 20);
            // 转盘和字幕区域
            Stack.height(this.wheelRadius * 2 + this.labelOffset * 2 + 20);
            // 转盘和字幕区域
            Stack.margin({ top: 10 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 转盘画布
            Canvas.create(this.context);
            Canvas.debugLine("entry/src/main/ets/view/Wheel.ets(375:9)", "entry");
            // 转盘画布
            Canvas.width(this.wheelRadius * 2);
            // 转盘画布
            Canvas.height(this.wheelRadius * 2);
            // 转盘画布
            Canvas.onReady(() => {
                this.canvasReady = true;
                this.drawWheel();
            });
            // 转盘画布
            Canvas.rotate({ angle: this.rotateAngle });
        }, Canvas);
        // 转盘画布
        Canvas.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 指针
            Column.create();
            Column.debugLine("entry/src/main/ets/view/Wheel.ets(385:9)", "entry");
            // 指针
            Column.width(4);
            // 指针
            Column.height(40);
            // 指针
            Column.backgroundColor('#FF0000');
            // 指针
            Column.position({ x: this.wheelRadius - 2, y: 0 });
        }, Column);
        // 指针
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 外围字幕标签（固定位置，不随转盘旋转）
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const index = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.debugLine("entry/src/main/ets/view/Wheel.ets(393:11)", "entry");
                    Column.width(this.quantity > 8 ? this.labelWidth - 10 : this.labelWidth);
                    Column.padding(4);
                    Column.backgroundColor(this.colors[index % this.colors.length]);
                    Column.borderRadius(6);
                    Column.shadow({ radius: 4, color: '#30000000', offsetX: 0, offsetY: 2 });
                    Column.position(this.getLabelPosition(index));
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.optionTexts[index] || `选项${index + 1}`);
                    Text.debugLine("entry/src/main/ets/view/Wheel.ets(394:13)", "entry");
                    Text.fontSize(this.quantity > 8 ? this.labelFontSize - 2 : this.labelFontSize);
                    Text.fontColor('#333333');
                    Text.fontWeight(FontWeight.Medium);
                    Text.maxLines(2);
                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.getIndexArray(), forEachItemGenFunction, (index: number): string => index.toString(), false, false);
        }, ForEach);
        // 外围字幕标签（固定位置，不随转盘旋转）
        ForEach.pop();
        // 转盘和字幕区域
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 结果显示
            if (this.selectedIndex >= 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`恭喜选中：选项${this.selectedIndex + 1}`);
                        Text.debugLine("entry/src/main/ets/view/Wheel.ets(415:9)", "entry");
                        Text.fontSize(this.titleFontSize - 4);
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
