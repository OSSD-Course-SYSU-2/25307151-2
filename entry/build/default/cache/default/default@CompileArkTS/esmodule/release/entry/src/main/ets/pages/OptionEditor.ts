if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface OptionEditor_Params {
    optionTexts?: string[];
    quantity?: number;
}
import router from "@ohos:router";
class OptionEditor extends ViewPU {
    constructor(q4, r4, s4, t4 = -1, u4 = undefined, v4) {
        super(q4, s4, t4, v4);
        if (typeof u4 === "function") {
            this.paramsGenerator_ = u4;
        }
        this.__optionTexts = new ObservedPropertyObjectPU([], this, "optionTexts");
        this.__quantity = new ObservedPropertySimplePU(3, this, "quantity");
        this.setInitiallyProvidedValue(r4);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(p4: OptionEditor_Params) {
        if (p4.optionTexts !== undefined) {
            this.optionTexts = p4.optionTexts;
        }
        if (p4.quantity !== undefined) {
            this.quantity = p4.quantity;
        }
    }
    updateStateVars(o4: OptionEditor_Params) {
    }
    purgeVariableDependenciesOnElmtId(n4) {
        this.__optionTexts.purgeDependencyOnElmtId(n4);
        this.__quantity.purgeDependencyOnElmtId(n4);
    }
    aboutToBeDeleted() {
        this.__optionTexts.aboutToBeDeleted();
        this.__quantity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __optionTexts: ObservedPropertyObjectPU<string[]>;
    get optionTexts() {
        return this.__optionTexts.get();
    }
    set optionTexts(m4: string[]) {
        this.__optionTexts.set(m4);
    }
    private __quantity: ObservedPropertySimplePU<number>;
    get quantity() {
        return this.__quantity.get();
    }
    set quantity(l4: number) {
        this.__quantity.set(l4);
    }
    aboutToAppear() {
        const k4 = router.getParams() as Record<string, Object>;
        if (k4) {
            this.quantity = k4['quantity'] as number;
            this.optionTexts = k4['optionTexts'] as string[];
        }
    }
    aboutToDisappear() {
    }
    initialRender() {
        this.observeComponentCreation2((i4, j4) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((g4, h4) => {
            Text.create('编辑选项文本');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 20, bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((e4, f4) => {
            List.create();
            List.width('100%');
            List.layoutWeight(1);
            List.margin({ top: 10 });
        }, List);
        this.observeComponentCreation2((g3, h3) => {
            ForEach.create();
            const i3 = (l3, m3: number) => {
                const n3 = l3;
                {
                    const o3 = (c4, d4) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(c4);
                        ListItem.create(q3, true);
                        if (!d4) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const p3 = (a4, b4) => {
                        ListItem.create(q3, true);
                    };
                    const q3 = (r3, s3) => {
                        o3(r3, s3);
                        this.observeComponentCreation2((y3, z3) => {
                            Row.create();
                            Row.width('100%');
                            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                        }, Row);
                        this.observeComponentCreation2((w3, x3) => {
                            Text.create(`${m3 + 1}.`);
                            Text.fontSize(18);
                            Text.fontColor('#666666');
                            Text.width(40);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((t3, u3) => {
                            TextInput.create({ text: n3 });
                            TextInput.width('100%');
                            TextInput.height(50);
                            TextInput.fontSize(16);
                            TextInput.backgroundColor('#F5F5F5');
                            TextInput.borderRadius(8);
                            TextInput.padding({ left: 12, right: 12 });
                            TextInput.onChange((v3: string) => {
                                this.optionTexts[m3] = v3;
                            });
                        }, TextInput);
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(p3, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(g3, this.optionTexts, i3, (j3: string, k3: number) => k3.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        List.pop();
        this.observeComponentCreation2((e3, f3) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.padding({ left: 16, right: 16 });
            Row.margin({ top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((c3, d3) => {
            Button.createWithLabel('取消');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(18);
            Button.backgroundColor('#CCCCCC');
            Button.fontColor('#333333');
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((a3, b3) => {
            Button.createWithLabel('保存');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(18);
            Button.backgroundColor({ "id": 16777262, "type": 10001, params: [], "bundleName": "com.example.animation", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.onClick(() => {
                AppStorage.setOrCreate('editedOptionTexts', ObservedObject.GetRawObject(this.optionTexts));
                router.back();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "OptionEditor";
    }
}
registerNamedRoute(() => new OptionEditor(undefined, {}), "", { bundleName: "com.example.animation", moduleName: "entry", pagePath: "pages/OptionEditor", pageFullPath: "entry/src/main/ets/pages/OptionEditor", integratedHsp: "false", moduleType: "followWithHap" });
