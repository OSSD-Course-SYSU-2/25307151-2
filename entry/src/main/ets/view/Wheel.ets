
import Common from '../common/constants/Const';
import { curves } from '@kit.ArkUI';

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
  private wheelRadius: number = 150;
  private colors: string[] = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF6B35',
    '#1DD1A1', '#F368E0', '#FF9F43', '#EE5A24', '#00B894'
  ];
  private updateTimer: number = -1; // 定时器ID
  onSpinComplete?: (selectedIndex: number) => void; // 旋转完成回调
  onSpinStateChange?: (isSpinning: boolean) => void; // 旋转状态变化回调

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
    for (let i = 0; i < this.quantity; i++) {
      const startAngle = i * anglePerSection - Math.PI / 2;
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
  getCurrentOption(angle: number): string {
    const anglePerSection = 360 / this.quantity;
    // 指针在顶部，需要计算转盘旋转后指针指向的位置
    // 指针指向的角度 = 360 - (angle % 360)
    const pointerAngle = (360 - (angle % 360)) % 360;
    // 计算是第几个选项（从顶部顺时针方向）
    const optionIndex = Math.floor(pointerAngle / anglePerSection);
    return this.optionTexts[optionIndex] || `选项${optionIndex + 1}`;
  }
  // 开始旋转
  spin() {
    if (this.isSpinning) {
      return;
    }

    this.isSpinning = true;
    this.isSpinningState = true; // 同步状态给父组件
    if (this.onSpinStateChange) {
      this.onSpinStateChange(true);
    }
    this.selectedIndex = -1;
    this.currentOption = '旋转中...';

    // 随机选择结果（每个选项机会均等）
    const targetIndex = Math.floor(Math.random() * this.quantity);
    const anglePerSection = 360 / this.quantity;
    
    // 计算目标角度（多转几圈 + 目标位置）
    const extraRotations = 5 + Math.floor(Math.random() * 3); // 5-7圈
    const targetAngle = extraRotations * 360 + (360 - targetIndex * anglePerSection - anglePerSection / 2);

    // 使用更丝滑的动画 - 增加帧率到60fps（每16ms更新一次）
    let currentAngle = 0;
    const startAngle = 0;
    const animationDuration = 3500; // 稍微缩短动画时间
    const updateInterval = 16; // 60fps
    const totalSteps = animationDuration / updateInterval;
    const angleStep = (targetAngle - startAngle) / totalSteps;
    
    this.updateTimer = setInterval(() => {
      currentAngle += angleStep;
      if (currentAngle >= targetAngle) {
        clearInterval(this.updateTimer);
        this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
      } else {
        this.currentOption = this.getCurrentOption(currentAngle);
      }
    }, updateInterval);

    // 使用更丝滑的动画曲线
    this.getUIContext().animateTo(
      {
        duration: animationDuration,
        curve: curves.springCurve(0, 1, 120, 12),
        onFinish: () => {
          this.isSpinning = false;
          this.isSpinningState = false; // 同步状态给父组件
          if (this.onSpinStateChange) {
            this.onSpinStateChange(false);
          }
          this.selectedIndex = targetIndex;
          this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
          // 清除定时器
          if (this.updateTimer !== -1) {
            clearInterval(this.updateTimer);
            this.updateTimer = -1;
          }
          // 调用旋转完成回调
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
    this.isSpinningState = true; // 同步状态给父组件
    if (this.onSpinStateChange) {
      this.onSpinStateChange(true);
    }
    this.selectedIndex = -1;
    this.currentOption = '天意降临...';

    const anglePerSection = 360 / this.quantity;
    
    // 计算目标角度（多转几圈 + 目标位置）
    const extraRotations = 5 + Math.floor(Math.random() * 3); // 5-7圈
    const targetAngle = extraRotations * 360 + (360 - targetIndex * anglePerSection - anglePerSection / 2);

    // 使用更丝滑的动画 - 增加帧率到60fps（每16ms更新一次）
    let currentAngle = 0;
    const startAngle = 0;
    const animationDuration = 3500; // 稍微缩短动画时间
    const updateInterval = 16; // 60fps
    const totalSteps = animationDuration / updateInterval;
    const angleStep = (targetAngle - startAngle) / totalSteps;
    
    this.updateTimer = setInterval(() => {
      currentAngle += angleStep;
      if (currentAngle >= targetAngle) {
        clearInterval(this.updateTimer);
        this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
      } else {
        this.currentOption = this.getCurrentOption(currentAngle);
      }
    }, updateInterval);

    // 使用更丝滑的动画曲线
    this.getUIContext().animateTo(
      {
        duration: animationDuration,
        curve: curves.springCurve(0, 1, 120, 12),
        onFinish: () => {
          this.isSpinning = false;
          this.isSpinningState = false; // 同步状态给父组件
          if (this.onSpinStateChange) {
            this.onSpinStateChange(false);
          }
          this.selectedIndex = targetIndex;
          this.currentOption = this.optionTexts[targetIndex] || `选项${targetIndex + 1}`;
          // 清除定时器
          if (this.updateTimer !== -1) {
            clearInterval(this.updateTimer);
            this.updateTimer = -1;
          }
          // 调用旋转完成回调
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

  // 计算字幕标签位置
  getLabelPosition(index: number): LabelPosition {
    const anglePerSection = 360 / this.quantity;
    const angle = index * anglePerSection - 90 + anglePerSection / 2;
    const radians = angle * Math.PI / 180;
    const labelRadius = this.wheelRadius + 50;
    const centerX = this.wheelRadius + 60;
    const centerY = this.wheelRadius + 60;
    const labelX = centerX + labelRadius * Math.cos(radians);
    const labelY = centerY + labelRadius * Math.sin(radians);
    const result: LabelPosition = { x: labelX - (this.quantity > 8 ? 25 : 30), y: labelY - 15 };
    return result;
  }

  build() {
    Column() {
      // 当前选项显示框
      Column() {
        Text(this.currentOption)
          .fontSize(24)
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
      Stack() {
        // 转盘画布
        Canvas(this.context)
          .width(this.wheelRadius * 2)
          .height(this.wheelRadius * 2)
          .onReady(() => {
            this.canvasReady = true;
            this.drawWheel();
          })
          .rotate({ angle: this.rotateAngle })

        // 指针
        Column()
          .width(4)
          .height(40)
          .backgroundColor('#FF0000')
          .position({ x: this.wheelRadius - 2, y: 0 })

        // 外围字幕标签（固定位置，不随转盘旋转）
        ForEach(Array.from({ length: this.quantity }, (_, i: number): number => i), (index: number) => {
          Column() {
            Text(this.optionTexts[index] || `选项${index + 1}`)
              .fontSize(this.quantity > 8 ? 10 : 12)
              .fontColor('#333333')
              .fontWeight(FontWeight.Medium)
              .maxLines(2)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
          }
          .width(this.quantity > 8 ? 50 : 60)
          .padding(4)
          .backgroundColor(this.colors[index % this.colors.length])
          .borderRadius(6)
          .shadow({ radius: 4, color: '#30000000', offsetX: 0, offsetY: 2 })
          .position(this.getLabelPosition(index))
        }, (index: number): string => index.toString())
      }
      .width(this.wheelRadius * 2 + 120) // 增加宽度以容纳字幕
      .height(this.wheelRadius * 2 + 120) // 增加高度以容纳字幕
      .margin({ top: 10 })

      // 结果显示
      if (this.selectedIndex >= 0) {
        Text(`恭喜选中：选项${this.selectedIndex + 1}`)
          .fontSize(20)
          .fontColor('#333333')
          .fontWeight(FontWeight.Bold)
          .margin({ top: 20 })
      }
    }
    .width(Common.DEFAULT_FULL_WIDTH)
    .layoutWeight(1)
    .justifyContent(FlexAlign.Center)
  }
}
