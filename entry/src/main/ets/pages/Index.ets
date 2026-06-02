/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Wheel } from '../view/Wheel';
import { CountController } from '../view/CountController';
import Common from '../common/constants/Const';
import router from '@ohos.router';
import { VoiceRecognitionService } from '../service/VoiceRecognitionService';
import { AudioPlayerService } from '../service/AudioPlayerService';
import common from '@ohos.app.ability.common';

@Entry
@Component
struct Index {
  @State quantity: number = Common.IMAGES_MIN;
  @State optionTexts: string[] = [];
  @State isVoiceListening: boolean = false;
  @State voiceStatus: string = '未启动';
  @State isWheelSpinning: boolean = false; // 转盘旋转状态（同步自 Wheel 组件）
  @State spinTrigger: number = 0; // 旋转触发器
  @State destinyTrigger: number = 0; // 天意触发器
  @State destinyTargetIndex: number = 0; // 天意目标选项索引
  @State showDestinyPanel: boolean = false; // 是否显示天意面板
  private voiceService: VoiceRecognitionService = new VoiceRecognitionService();
  private audioService: AudioPlayerService = new AudioPlayerService();

  aboutToAppear() {
    // 初始化选项文本
    this.initOptionTexts();
    // 初始化音频服务
    const context = getContext(this) as common.UIAbilityContext;
    this.audioService.init(context);
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
      } else if (i === 1) {
        // 选项二的默认文本设置为"两头乌角鲨"
        this.optionTexts.push('两头乌角鲨');
      } else if (i === 2) {
        // 选项三的默认文本设置为"三军听令，自刎归天"
        this.optionTexts.push('三军听令，自刎归天');
      } else if (i === 3) {
        // 选项四的默认文本设置为"死是凉爽的夏夜"
        this.optionTexts.push('死是凉爽的夏夜');
      } else if (i === 4) {
        // 选项五的默认文本设置为"五百个弟兄全死了都值"
        this.optionTexts.push('五百个弟兄全死了都值');
      } else if (i === 5) {
        // 选项六的默认文本设置为"六亲不认，水火无敌"
        this.optionTexts.push('六亲不认，水火无敌');
      } else {
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
    } else {
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
    } catch (error) {
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
    } catch (error) {
      console.error(`Index: Failed to play audio after spin - ${error}`);
    }
  }

  build() {
    Column() {
      Wheel({
        quantity: $quantity,
        optionTexts: $optionTexts,
        isSpinningState: $isWheelSpinning,
        spinTrigger: $spinTrigger,
        destinyTrigger: $destinyTrigger,
        destinyTargetIndex: $destinyTargetIndex,
        onSpinComplete: (index: number) => {
          this.onWheelSpinComplete(index);
        }
      })

      // 天意功能区域
      Row() {
        Button('🎯 天意')
          .width('80%')
          .height(45)
          .fontSize(16)
          .backgroundColor('#9C27B0')
          .fontColor(Color.White)
          .onClick(() => {
            this.showDestinyPanel = !this.showDestinyPanel;
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .margin({ top: 15 })

      // 天意选项面板
      if (this.showDestinyPanel) {
        Column() {
          Text('选择天意目标')
            .fontSize(16)
            .fontColor('#666666')
            .margin({ bottom: 10 })

          Flex({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceEvenly }) {
            ForEach(this.getDestinyOptions(), (index: number) => {
              Button(this.optionTexts[index] || `选项${index + 1}`)
                .width('40%')
                .height(40)
                .fontSize(14)
                .backgroundColor('#E1BEE7')
                .fontColor('#4A148C')
                .margin({ top: 8, bottom: 8 })
                .onClick(() => {
                  this.destinyTargetIndex = index;
                  this.destinyTrigger++;
                  this.showDestinyPanel = false;
                })
            })
          }
          .width('90%')
        }
        .width('85%')
        .padding(15)
        .backgroundColor('#F3E5F5')
        .borderRadius(12)
        .margin({ top: 10 })
      }

      // 上方按钮行：开始抽奖 + 编辑选项
      Row() {
        Button(this.isWheelSpinning ? '旋转中...' : '开始抽奖')
          .width('45%')
          .height(50)
          .fontSize(16)
          .backgroundColor(this.isWheelSpinning ? '#CCCCCC' : '#FF6B6B')
          .fontColor(Color.White)
          .enabled(!this.isWheelSpinning)
          .onClick(() => {
            // 触发转盘旋转
            this.spinTrigger++;
          })

        Button('编辑选项')
          .width('45%')
          .height(50)
          .fontSize(16)
          .backgroundColor('#FF9800')
          .fontColor(Color.White)
          .onClick(() => {
            router.pushUrl({
              url: 'pages/OptionEditor',
              params: {
                quantity: this.quantity,
                optionTexts: this.optionTexts.slice(0, this.quantity)
              }
            });
          })
      }
      .width('80%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ top: 20 })

      // 下方按钮行：开始监听 + 测试播放
      Row() {
        Button(this.isVoiceListening ? '停止监听' : '开始监听')
          .width('45%')
          .height(50)
          .fontSize(16)
          .backgroundColor(this.isVoiceListening ? '#F44336' : '#4CAF50')
          .fontColor(Color.White)
          .onClick(() => {
            if (this.isVoiceListening) {
              this.stopVoiceRecognition();
            } else {
              this.startVoiceRecognition();
            }
          })

        Button('测试播放')
          .width('45%')
          .height(50)
          .fontSize(16)
          .backgroundColor('#2196F3')
          .fontColor(Color.White)
          .onClick(async () => {
            try {
              await this.audioService.playFromRawFile('guanyu.mp3');
            } catch (error) {
              console.error(`Test play failed: ${error}`);
            }
          })
      }
      .width('80%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ top: 15 })

      // 数量控制器
      CountController({
        quantity: $quantity
      })
    }
    .width(Common.DEFAULT_FULL_WIDTH)
    .height(Common.DEFAULT_FULL_HEIGHT)
    .backgroundColor($r('app.color.bgColor'))
  }
}