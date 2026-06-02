import display from "@ohos:display";
// 设备类型枚举
export enum DeviceType {
    PHONE = "phone",
    TABLET = "tablet",
    TWO_IN_ONE = "2in1",
    UNKNOWN = "unknown"
}
// 断点类型
export enum BreakpointType {
    SM = "sm",
    MD = "md",
    LG = "lg" // 大屏 > 840vp
}
// 设备适配配置接口
interface DeviceConfig {
    wheelRadius: number; // 转盘半径
    labelOffset: number; // 标签偏移
    buttonHeight: number; // 按钮高度
    buttonFontSize: number; // 按钮字体大小
    titleFontSize: number; // 标题字体大小
    labelFontSize: number; // 标签字体大小
    labelWidth: number; // 标签宽度
    panelPadding: number; // 面板内边距
    columnGap: number; // 列间距
}
export class DeviceAdapter {
    private static instance: DeviceAdapter;
    private screenWidth: number = 360;
    private screenHeight: number = 640;
    private deviceType: DeviceType = DeviceType.PHONE;
    private breakpoint: BreakpointType = BreakpointType.SM;
    // 不同设备的配置
    private readonly deviceConfigs: Record<string, DeviceConfig> = {
        [DeviceType.PHONE]: {
            wheelRadius: 130,
            labelOffset: 45,
            buttonHeight: 45,
            buttonFontSize: 14,
            titleFontSize: 20,
            labelFontSize: 10,
            labelWidth: 50,
            panelPadding: 12,
            columnGap: 15
        },
        [DeviceType.TABLET]: {
            wheelRadius: 180,
            labelOffset: 55,
            buttonHeight: 50,
            buttonFontSize: 16,
            titleFontSize: 24,
            labelFontSize: 12,
            labelWidth: 60,
            panelPadding: 16,
            columnGap: 20
        },
        [DeviceType.TWO_IN_ONE]: {
            wheelRadius: 200,
            labelOffset: 60,
            buttonHeight: 55,
            buttonFontSize: 18,
            titleFontSize: 28,
            labelFontSize: 14,
            labelWidth: 70,
            panelPadding: 20,
            columnGap: 25
        }
    };
    private constructor() {
        this.initScreenInfo();
    }
    // 获取单例实例
    static getInstance(): DeviceAdapter {
        if (!DeviceAdapter.instance) {
            DeviceAdapter.instance = new DeviceAdapter();
        }
        return DeviceAdapter.instance;
    }
    // 初始化屏幕信息
    private initScreenInfo(): void {
        try {
            const displayInfo = display.getDefaultDisplaySync();
            this.screenWidth = px2vp(displayInfo.width);
            this.screenHeight = px2vp(displayInfo.height);
            // 根据屏幕宽度判断设备类型
            if (this.screenWidth < 600) {
                this.deviceType = DeviceType.PHONE;
                this.breakpoint = BreakpointType.SM;
            }
            else if (this.screenWidth < 840) {
                this.deviceType = DeviceType.TABLET;
                this.breakpoint = BreakpointType.MD;
            }
            else {
                this.deviceType = DeviceType.TWO_IN_ONE;
                this.breakpoint = BreakpointType.LG;
            }
        }
        catch (error) {
            console.error(`DeviceAdapter init error: ${error}`);
        }
    }
    // 获取屏幕宽度
    getScreenWidth(): number {
        return this.screenWidth;
    }
    // 获取屏幕高度
    getScreenHeight(): number {
        return this.screenHeight;
    }
    // 获取设备类型
    getDeviceType(): DeviceType {
        return this.deviceType;
    }
    // 获取断点类型
    getBreakpoint(): BreakpointType {
        return this.breakpoint;
    }
    // 判断是否为大屏设备
    isLargeScreen(): boolean {
        return this.breakpoint === BreakpointType.LG || this.breakpoint === BreakpointType.MD;
    }
    // 获取当前设备配置
    getConfig(): DeviceConfig {
        return this.deviceConfigs[this.deviceType] || this.deviceConfigs[DeviceType.PHONE];
    }
    // 获取转盘半径
    getWheelRadius(): number {
        return this.getConfig().wheelRadius;
    }
    // 获取标签偏移
    getLabelOffset(): number {
        return this.getConfig().labelOffset;
    }
    // 获取按钮高度
    getButtonHeight(): number {
        return this.getConfig().buttonHeight;
    }
    // 获取按钮字体大小
    getButtonFontSize(): number {
        return this.getConfig().buttonFontSize;
    }
    // 获取标题字体大小
    getTitleFontSize(): number {
        return this.getConfig().titleFontSize;
    }
    // 获取标签字体大小
    getLabelFontSize(): number {
        return this.getConfig().labelFontSize;
    }
    // 获取标签宽度
    getLabelWidth(): number {
        return this.getConfig().labelWidth;
    }
    // 获取面板内边距
    getPanelPadding(): number {
        return this.getConfig().panelPadding;
    }
    // 获取列间距
    getColumnGap(): number {
        return this.getConfig().columnGap;
    }
    // 响应式尺寸计算 - 根据屏幕宽度比例计算
    responsiveWidth(ratio: number): number {
        return this.screenWidth * ratio;
    }
    // 响应式尺寸计算 - 根据屏幕高度比例计算
    responsiveHeight(ratio: number): number {
        return this.screenHeight * ratio;
    }
    // 根据断点返回不同值
    valueByBreakpoint<T>(sm: T, md: T, lg: T): T {
        switch (this.breakpoint) {
            case BreakpointType.SM:
                return sm;
            case BreakpointType.MD:
                return md;
            case BreakpointType.LG:
                return lg;
            default:
                return sm;
        }
    }
    // 刷新屏幕信息（屏幕旋转时调用）
    refresh(): void {
        this.initScreenInfo();
    }
}
// 导出便捷方法
export function getDeviceAdapter(): DeviceAdapter {
    return DeviceAdapter.getInstance();
}
