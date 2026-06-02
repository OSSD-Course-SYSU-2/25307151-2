import media from "@ohos:multimedia.media";
import type common from "@ohos:app.ability.common";
import fs from "@ohos:file.fs";
export class AudioPlayerService {
    private avPlayer: media.AVPlayer | null = null;
    private isPlaying: boolean = false;
    private context: common.UIAbilityContext | null = null;
    // 初始化
    init(context: common.UIAbilityContext) {
        this.context = context;
    }
    // 播放音频文件（从rawfile资源）
    async playFromRawFile(fileName: string): Promise<void> {
        if (!this.context) {
            console.error('AudioPlayerService: Context not initialized');
            return;
        }
        if (this.isPlaying) {
            console.warn('AudioPlayerService: Already playing, stopping current playback');
            await this.stop();
        }
        try {
            console.info(`AudioPlayerService: Creating AVPlayer for ${fileName}`);
            // 创建AVPlayer
            this.avPlayer = await media.createAVPlayer();
            console.info('AudioPlayerService: AVPlayer created');
            this.setAVPlayerCallback();
            console.info('AudioPlayerService: Getting raw file descriptor');
            // 获取rawfile文件描述符
            const fileDescriptor = await this.context.resourceManager.getRawFd(fileName);
            console.info(`AudioPlayerService: File descriptor - fd: ${fileDescriptor.fd}, offset: ${fileDescriptor.offset}, length: ${fileDescriptor.length}`);
            // 设置播放源
            this.avPlayer.fdSrc = fileDescriptor;
            console.info(`AudioPlayerService: Source set, waiting for playback`);
        }
        catch (error) {
            console.error(`AudioPlayerService: Failed to play audio - ${error}`);
            if (this.avPlayer) {
                this.avPlayer.release();
                this.avPlayer = null;
            }
        }
    }
    // 播放音频文件（从沙箱路径）
    async playFromFile(filePath: string): Promise<void> {
        if (this.isPlaying) {
            console.warn('AudioPlayerService: Already playing, stopping current playback');
            await this.stop();
        }
        try {
            // 创建AVPlayer
            this.avPlayer = await media.createAVPlayer();
            this.setAVPlayerCallback();
            // 打开文件
            const file = await fs.open(filePath);
            const fdPath = `fd://${file.fd}`;
            // 设置播放源
            this.avPlayer.url = fdPath;
            console.info(`AudioPlayerService: Started playing from file ${filePath}`);
        }
        catch (error) {
            console.error(`AudioPlayerService: Failed to play audio from file - ${error}`);
            if (this.avPlayer) {
                this.avPlayer.release();
                this.avPlayer = null;
            }
        }
    }
    // 设置播放器回调
    private setAVPlayerCallback() {
        if (!this.avPlayer) {
            return;
        }
        // 错误回调
        this.avPlayer.on('error', (err) => {
            console.error(`AudioPlayerService: Error - code: ${err.code}, message: ${err.message}`);
            this.isPlaying = false;
            if (this.avPlayer) {
                this.avPlayer.reset();
            }
        });
        // 状态变化回调
        this.avPlayer.on('stateChange', async (state: string) => {
            console.info(`AudioPlayerService: State changed to ${state}`);
            switch (state) {
                case 'initialized':
                    // 准备播放
                    if (this.avPlayer) {
                        await this.avPlayer.prepare();
                    }
                    break;
                case 'prepared':
                    // 开始播放
                    if (this.avPlayer) {
                        console.info('AudioPlayerService: Starting playback');
                        await this.avPlayer.play();
                        this.isPlaying = true;
                        console.info('AudioPlayerService: Playback started');
                    }
                    break;
                case 'completed':
                    // 播放完成
                    this.isPlaying = false;
                    if (this.avPlayer) {
                        await this.avPlayer.reset();
                    }
                    break;
                case 'stopped':
                    // 停止播放
                    this.isPlaying = false;
                    if (this.avPlayer) {
                        await this.avPlayer.reset();
                    }
                    break;
                case 'idle':
                    // 空闲状态
                    this.isPlaying = false;
                    break;
            }
        });
    }
    // 停止播放
    async stop(): Promise<void> {
        if (this.avPlayer && this.isPlaying) {
            try {
                await this.avPlayer.stop();
                this.isPlaying = false;
                console.info('AudioPlayerService: Stopped playing');
            }
            catch (error) {
                console.error(`AudioPlayerService: Failed to stop - ${error}`);
            }
        }
    }
    // 暂停播放
    async pause(): Promise<void> {
        if (this.avPlayer && this.isPlaying) {
            try {
                await this.avPlayer.pause();
                this.isPlaying = false;
                console.info('AudioPlayerService: Paused playing');
            }
            catch (error) {
                console.error(`AudioPlayerService: Failed to pause - ${error}`);
            }
        }
    }
    // 恢复播放
    async resume(): Promise<void> {
        if (this.avPlayer && !this.isPlaying) {
            try {
                await this.avPlayer.play();
                this.isPlaying = true;
                console.info('AudioPlayerService: Resumed playing');
            }
            catch (error) {
                console.error(`AudioPlayerService: Failed to resume - ${error}`);
            }
        }
    }
    // 释放资源
    async release(): Promise<void> {
        if (this.avPlayer) {
            try {
                await this.avPlayer.release();
                this.avPlayer = null;
                this.isPlaying = false;
                console.info('AudioPlayerService: Released');
            }
            catch (error) {
                console.error(`AudioPlayerService: Failed to release - ${error}`);
            }
        }
    }
    // 获取播放状态
    getIsPlaying(): boolean {
        return this.isPlaying;
    }
}
