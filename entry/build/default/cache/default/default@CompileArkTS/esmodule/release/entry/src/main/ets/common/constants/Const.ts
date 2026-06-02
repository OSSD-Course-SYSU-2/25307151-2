const IMAGE_ARR = [
    { "id": 16777239, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
    { "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
    { "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
    { "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
    { "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
    { "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
];
export default class Common {
    static readonly IMAGE_RESOURCE: Resource[] = IMAGE_ARR;
    static readonly IMAGES_TOTAL: number = 20;
    static readonly IMAGES_MIN: number = 3;
    static readonly ROTATE_ANGLE_360: number = 360;
    static readonly DELAY_10: number = 10;
    static readonly DEFAULT_FULL_WIDTH: string = '100%';
    static readonly DEFAULT_FULL_HEIGHT: string = '100%';
    static readonly ICON_WIDTH: number = 58;
    static readonly ICON_HEIGHT: number = 58;
    static readonly CONTROLLER_WIDTH: string = '97vp';
    static readonly CONTROLLER_HEIGHT: string = '336vp';
    static readonly FONT_WEIGHT_500: number = 500;
    static readonly OPACITY_06: number = 0.6;
    static readonly OFFSET_RADIUS: number = 145;
    static readonly INIT_SCALE: number = 0.75;
    static readonly DURATION_500: number = 500;
    static readonly TEMPO: number = 0.68;
    static readonly SCALE_RATIO: number = 1.25;
    static readonly DURATION_1000: number = 1000;
}
