if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CountController_Params {
    quantity?: number;
}
import Common from "@bundle:com.example.animation/entry/ets/common/constants/Const";
function __Text__textStyle(): void {
    Text.fontSize({ "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
    Text.fontWeight(Common.FONT_WEIGHT_500);
}
export class CountController extends ViewPU {
    constructor(w6, x6, y6, z6 = -1, a7 = undefined, b7) {
        super(w6, y6, z6, b7);
        if (typeof a7 === "function") {
            this.paramsGenerator_ = a7;
        }
        this.__quantity = new SynchedPropertySimpleTwoWayPU(x6.quantity, this, "quantity");
        this.setInitiallyProvidedValue(x6);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(v6: CountController_Params) {
    }
    updateStateVars(u6: CountController_Params) {
    }
    purgeVariableDependenciesOnElmtId(t6) {
        this.__quantity.purgeDependencyOnElmtId(t6);
    }
    aboutToBeDeleted() {
        this.__quantity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __quantity: SynchedPropertySimpleTwoWayPU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(s6: number) {
        this.__quantity.set(s6);
    }
    initialRender() {
        this.observeComponentCreation2((q6, r6) => {
            Column.create();
            Column.height(Common.CONTROLLER_WIDTH);
            Column.padding({
                top: { "id": 16777229, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
                bottom: { "id": 16777229, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
                left: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" },
                right: { "id": 16777232, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
            Column.margin({
                bottom: { "id": 16777236, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
            Column.width(Common.CONTROLLER_HEIGHT);
            Column.borderRadius({ "id": 16777234, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777227, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((o6, p6) => {
            Row.create();
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.width(Common.DEFAULT_FULL_WIDTH);
            Row.margin({
                top: { "id": 16777235, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((m6, n6) => {
            Text.create({ "id": 16777220, "type": 10003, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            __Text__textStyle();
        }, Text);
        Text.pop();
        this.observeComponentCreation2((k6, l6) => {
            Text.create(this.quantity.toFixed(0));
            __Text__textStyle();
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((h6, i6) => {
            Slider.create({
                value: this.quantity,
                min: Common.IMAGES_MIN,
                max: Common.IMAGES_TOTAL,
                step: 1,
                style: SliderStyle.InSet
            });
            Slider.blockColor(Color.White);
            Slider.selectedColor({ "id": 16777223, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Slider.margin({
                top: { "id": 16777237, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" }
            });
            Slider.showSteps(true);
            Slider.trackThickness({ "id": 16777233, "type": 10002, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Slider.onChange((j6: number) => {
                this.quantity = j6;
            });
        }, Slider);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
