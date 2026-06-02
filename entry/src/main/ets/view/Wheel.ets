
import Common from '../common/constants/Const';
import { curves } from '@kit.ArkUI';
import { getDeviceAdapter, DeviceType } from '../common/utils/DeviceAdapter';

// 字幕标签位置接口
interface LabelPosition {
  x: number;
  y: number;
}

@Component
export struct Wheel {
  @Link @Watch('onQuantityChange') quantity: number;
  @Link optionTexts: string[]; // 选项文本数组
  @Link isSpinningState: boolean; // 暴露旋转状态给父组件
  @Link @Watch('onSpinTrigger') spinTrigger: number; // 旋转触发器（改变时触发旋转）
  @Link @Watch('onDestinyTrigger') destinyTrigger: number; // 天意触发器
  @Link destinyTargetIndex: number; // 天意目标选项索引
  @State rotateAngle: number = 0;
  @State isSpinning: boolean = false;
  @State selectedIndex: number = -1;
  @State canvasReady: boolean = false; // 标记canvas是否准备好
  @State currentOption: string = '等待开始'; // 当前指针指向的选项
  private settings: RenderingContextSettings = new RenderingContextSettings(true);
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings);
  // 响应式转盘半径 - 根据设备类型自动调整
  private wheelRadius: number = 130;
  // 响应式布局参数
  private titleFontSize: number = 20;
  private labelFontSize: number = 10;
  private labelWidth: number = 50;
  private labelOffset: number = 45;
  private colors: string[] = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF6B35',
    '#1DD1A1', '#F368E0', '#FF9F43', '#EE5A24', '#00B894'
  ];
  private updateTimer: number = -1; // 定时器ID
  onSpinComplete?: (selectedIndex: number) => void; // 旋转完成回调
  onSpinStateChange?: (isSpinning: boolean) => void; // 旋转状态变化回调

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
      } else {
        this.currentOption = this.getCurrentOption(displayAngle);
      }
    }, updateInterval);

    // 执行旋转动画
    this.getUIContext().animateTo(
      {
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
      },
      () => {
        this.rotateAngle = targetAngle;
      }
    );
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
      } else {
        this.currentOption = this.getCurrentOption(displayAngle);
      }
    }, updateInterval);

    // 执行旋转动画
    this.getUIContext().animateTo(
      {
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
      },
      () => {
        this.rotateAngle = targetAngle;
      }
    );
  }

  // 字幕标签位置
  private labelPosition: LabelPosition = { x: 0, y: 0 };

  // 获取索引数组
  private getIndexArray(): number[] {
    const arr: number[] = [];
    for (let i = 0; i < this.quantity; i++) {
      arr.push(i);
    }
    return arr;
  }

  // 计算字幕标签位置
  getLabelPosition(index: number): LabelPosition {
    const anglePerSection = 360 / this.quantity;
    const angle = index * anglePerSection - 90;
    const radians = angle * Math.PI / 180;
    
    // 标签尺寸
    const labelW = this.quantity > 8 ? this.labelWidth - 10 : this.labelWidth;
    const labelH = 28;
    
    // 标签中心到转盘中心的距离
    const labelRadius = this.wheelRadius + this.labelOffset;
    
    // Stack 中心位置
    const stackSize = this.wheelRadius * 2 + this.labelOffset * 2 + 20;
    const centerX = stackSize / 2;
    const centerY = stackSize / 2;
    
    // 标签中心位置
    const labelCenterX = centerX + labelRadius * Math.cos(radians);
    const labelCenterY = centerY + labelRadius * Math.sin(radians);
    
    return { 
      x: labelCenterX - labelW / 2, 
      y: labelCenterY - labelH / 2 
    };
  }

  build() {
    Column() {
      // 当前选项显示框
      Column() {
        Text(this.currentOption)
          .fontSize(this.titleFontSize)
          .fontColor(this.isSpinning ? '#FF6B6B' : '#333333')
          .fontWeight(FontWeight.Bold)
      }
      .width('80%')
      .height(60)
      .justifyContent(FlexAlign.Center)
      .backgroundColor('#FFFFFF')
      .borderRadius(12)
      .shadow({ radius: 8, color: '#40000000', offsetX: 0, offsetY: 2 })
      .margin({ top: 20, bottom: 10 })

      // 转盘和字幕区域
      Stack({ alignContent: Alignment.Center }) {
        // 旋转组：转盘 + 标签一起旋转
        Stack() {
          // 转盘画布
          Canvas(this.context)
            .width(this.wheelRadius * 2)
            .height(this.wheelRadius * 2)
            .onReady(() => {
              this.canvasReady = true;
              this.drawWheel();
            })

          // 标签跟随转盘旋转
          ForEach(this.getIndexArray(), (index: number) => {
            Column() {
              Text(this.optionTexts[index] || `选项${index + 1}`)
                .fontSize(this.quantity > 8 ? this.labelFontSize - 2 : this.labelFontSize)
                .fontColor('#333333')
                .fontWeight(FontWeight.Medium)
                .maxLines(1)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
            }
            .width(this.quantity > 8 ? this.labelWidth - 10 : this.labelWidth)
            .padding(4)
            .backgroundColor(this.colors[index % this.colors.length])
            .borderRadius(6)
            .shadow({ radius: 4, color: '#30000000', offsetX: 0, offsetY: 2 })
            .position(this.getLabelPosition(index))
          }, (index: number): string => index.toString())
        }
        .width(this.wheelRadius * 2 + this.labelOffset * 2 + 20)
        .height(this.wheelRadius * 2 + this.labelOffset * 2 + 20)
        .rotate({ angle: this.rotateAngle })

        // 指针（固定不动）
        Column()
          .width(4)
          .height(40)
          .backgroundColor('#FF0000')
          .position({ 
            x: (this.wheelRadius * 2 + this.labelOffset * 2 + 20) / 2 - 2, 
            y: (this.labelOffset * 2 + 20) / 2 
          })
      }
      .width(this.wheelRadius * 2 + this.labelOffset * 2 + 20)
      .height(this.wheelRadius * 2 + this.labelOffset * 2 + 20)
      .margin({ top: 10 })

      // 结果显示
      if (this.selectedIndex >= 0) {
        Text(`恭喜选中：选项${this.selectedIndex + 1}`)
          .fontSize(this.titleFontSize - 4)
          .fontColor('#333333')
          .fontWeight(FontWeight.Bold)
          .margin({ top: 20 })
      }
    }
    .width(Common.DEFAULT_FULL_WIDTH)
    .justifyContent(FlexAlign.Center)
  }
}
