import media from "@ohos:multimedia.media";
import type common from "@ohos:app.ability.common";
import fs from "@ohos:file.fs";
export class AudioPlayerService {
    private avPlayer: media.AVPlayer | null = null;
    private isPlaying: boolean = false;
    private context: common.UIAbilityContext | null = null;
    init(j5: common.UIAbilityContext) {
        this.context = j5;
    }
    async playFromRawFile(g5: string): Promise<void> {
        if (!this.context) {
            console.error('AudioPlayerService: Context not initialized');
            return;
        }
        if (this.isPlaying) {
            console.warn('AudioPlayerService: Already playing, stopping current playback');
            await this.stop();
        }
        try {
            console.info(`AudioPlayerService: Creating AVPlayer for ${g5}`);
            this.avPlayer = await media.createAVPlayer();
            console.info('AudioPlayerService: AVPlayer created');
            this.setAVPlayerCallback();
            console.info('AudioPlayerService: Getting raw file descriptor');
            const i5 = await this.context.resourceManager.getRawFd(g5);
            console.info(`AudioPlayerService: File descriptor - fd: ${i5.fd}, offset: ${i5.offset}, length: ${i5.length}`);
            this.avPlayer.fdSrc = i5;
            console.info(`AudioPlayerService: Source set, waiting for playback`);
        }
        catch (h5) {
            console.error(`AudioPlayerService: Failed to play audio - ${h5}`);
            if (this.avPlayer) {
                this.avPlayer.release();
                this.avPlayer = null;
            }
        }
    }
    async playFromFile(c5: string): Promise<void> {
        if (this.isPlaying) {
            console.warn('AudioPlayerService: Already playing, stopping current playback');
            await this.stop();
        }
        try {
            this.avPlayer = await media.createAVPlayer();
            this.setAVPlayerCallback();
            const e5 = await fs.open(c5);
            const f5 = `fd://${e5.fd}`;
            this.avPlayer.url = f5;
            console.info(`AudioPlayerService: Started playing from file ${c5}`);
        }
        catch (d5) {
            console.error(`AudioPlayerService: Failed to play audio from file - ${d5}`);
            if (this.avPlayer) {
                this.avPlayer.release();
                this.avPlayer = null;
            }
        }
    }
    private setAVPlayerCallback() {
        if (!this.avPlayer) {
            return;
        }
        this.avPlayer.on('error', (b5) => {
            console.error(`AudioPlayerService: Error - code: ${b5.code}, message: ${b5.message}`);
            this.isPlaying = false;
            if (this.avPlayer) {
                this.avPlayer.reset();
            }
        });
        this.avPlayer.on('stateChange', async (a5: string) => {
            console.info(`AudioPlayerService: State changed to ${a5}`);
            switch (a5) {
                case 'initialized':
                    if (this.avPlayer) {
                        await this.avPlayer.prepare();
                    }
                    break;
                case 'prepared':
                    if (this.avPlayer) {
                        console.info('AudioPlayerService: Starting playback');
                        await this.avPlayer.play();
                        this.isPlaying = true;
                        console.info('AudioPlayerService: Playback started');
                    }
                    break;
                case 'completed':
                    this.isPlaying = false;
                    if (this.avPlayer) {
                        await this.avPlayer.reset();
                    }
                    break;
                case 'stopped':
                    this.isPlaying = false;
                    if (this.avPlayer) {
                        await this.avPlayer.reset();
                    }
                    break;
                case 'idle':
                    this.isPlaying = false;
                    break;
            }
        });
    }
    async stop(): Promise<void> {
        if (this.avPlayer && this.isPlaying) {
            try {
                await this.avPlayer.stop();
                this.isPlaying = false;
                console.info('AudioPlayerService: Stopped playing');
            }
            catch (z4) {
                console.error(`AudioPlayerService: Failed to stop - ${z4}`);
            }
        }
    }
    async pause(): Promise<void> {
        if (this.avPlayer && this.isPlaying) {
            try {
                await this.avPlayer.pause();
                this.isPlaying = false;
                console.info('AudioPlayerService: Paused playing');
            }
            catch (y4) {
                console.error(`AudioPlayerService: Failed to pause - ${y4}`);
            }
        }
    }
    async resume(): Promise<void> {
        if (this.avPlayer && !this.isPlaying) {
            try {
                await this.avPlayer.play();
                this.isPlaying = true;
                console.info('AudioPlayerService: Resumed playing');
            }
            catch (x4) {
                console.error(`AudioPlayerService: Failed to resume - ${x4}`);
            }
        }
    }
    async release(): Promise<void> {
        if (this.avPlayer) {
            try {
                await this.avPlayer.release();
                this.avPlayer = null;
                this.isPlaying = false;
                console.info('AudioPlayerService: Released');
            }
            catch (w4) {
                console.error(`AudioPlayerService: Failed to release - ${w4}`);
            }
        }
    }
    getIsPlaying(): boolean {
        return this.isPlaying;
    }
}
