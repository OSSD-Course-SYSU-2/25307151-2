import speechRecognizer from "@hms:ai.speechRecognizer";
import type { BusinessError } from "@ohos:base";
import type audio from "@ohos:multimedia.audio";
export class VoiceRecognitionService {
    private asrEngine: speechRecognizer.SpeechRecognitionEngine | null = null;
    private audioCapturer: audio.AudioCapturer | null = null;
    private isListening: boolean = false;
    private sessionId: string = 'voice_recognition_session';
    private triggerWord: string = '释怀';
    private onTriggerCallback: (() => void) | null = null;
    async createEngine(): Promise<boolean> {
        return new Promise<boolean>((c6) => {
            const d6: Record<string, Object> = {
                'locate': 'CN',
                'recognizerMode': 'short'
            };
            const e6: speechRecognizer.CreateEngineParams = {
                language: 'zh-CN',
                online: 1,
                extraParams: d6
            };
            speechRecognizer.createEngine(e6, (f6: BusinessError, g6: speechRecognizer.SpeechRecognitionEngine) => {
                if (!f6) {
                    console.info('VoiceRecognitionService: Engine created successfully');
                    this.asrEngine = g6;
                    this.setListener();
                    c6(true);
                }
                else {
                    console.error(`VoiceRecognitionService: Failed to create engine. Code: ${f6.code}, message: ${f6.message}`);
                    c6(false);
                }
            });
        });
    }
    private setListener() {
        if (!this.asrEngine) {
            return;
        }
        const o5: speechRecognizer.RecognitionListener = {
            onStart: (a6: string, b6: string) => {
                console.info(`VoiceRecognitionService: onStart - ${a6}`);
            },
            onEvent: (x5: string, y5: number, z5: string) => {
                console.info(`VoiceRecognitionService: onEvent - ${x5}, code: ${y5}`);
            },
            onResult: (u5: string, v5: speechRecognizer.SpeechRecognitionResult) => {
                console.info(`VoiceRecognitionService: onResult - ${u5}`);
                if (v5 && v5.result && v5.result.length > 0) {
                    const w5 = v5.result[0];
                    console.info(`VoiceRecognitionService: Recognized text: ${w5}`);
                    if (w5.includes(this.triggerWord)) {
                        console.info(`VoiceRecognitionService: Trigger word "${this.triggerWord}" detected!`);
                        if (this.onTriggerCallback) {
                            this.onTriggerCallback();
                        }
                    }
                }
            },
            onComplete: (s5: string, t5: string) => {
                console.info(`VoiceRecognitionService: onComplete - ${s5}`);
                if (this.isListening) {
                    this.startRecognition();
                }
            },
            onError: (p5: string, q5: number, r5: string) => {
                console.error(`VoiceRecognitionService: onError - ${p5}, code: ${q5}, message: ${r5}`);
                if (this.isListening) {
                    setTimeout(() => {
                        this.startRecognition();
                    }, 1000);
                }
            }
        };
        this.asrEngine.setListener(o5);
    }
    private startRecognition() {
        if (!this.asrEngine) {
            console.error('VoiceRecognitionService: Engine not initialized');
            return;
        }
        const n5: speechRecognizer.StartParams = {
            sessionId: this.sessionId,
            audioInfo: {
                audioType: 'pcm',
                sampleRate: 16000,
                soundChannel: 1,
                sampleBit: 16
            },
            extraParams: {
                'vadBegin': 2000,
                'vadEnd': 3000,
                'maxAudioDuration': 60000
            }
        };
        this.asrEngine.startListening(n5);
    }
    async startListening(l5: () => void): Promise<boolean> {
        if (this.isListening) {
            console.warn('VoiceRecognitionService: Already listening');
            return true;
        }
        if (!this.asrEngine) {
            const m5 = await this.createEngine();
            if (!m5) {
                return false;
            }
        }
        this.onTriggerCallback = l5;
        this.isListening = true;
        this.startRecognition();
        console.info('VoiceRecognitionService: Started listening');
        return true;
    }
    stopListening() {
        this.isListening = false;
        if (this.asrEngine) {
            this.asrEngine.cancel(this.sessionId);
        }
        console.info('VoiceRecognitionService: Stopped listening');
    }
    destroy() {
        this.stopListening();
        if (this.audioCapturer) {
            this.audioCapturer.release();
            this.audioCapturer = null;
        }
        if (this.asrEngine) {
            this.asrEngine.shutdown();
            this.asrEngine = null;
        }
        console.info('VoiceRecognitionService: Destroyed');
    }
    setTriggerWord(k5: string) {
        this.triggerWord = k5;
        console.info(`VoiceRecognitionService: Trigger word set to "${k5}"`);
    }
}
