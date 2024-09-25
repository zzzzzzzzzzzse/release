import ButtonEx from "./StoneAgeButtonEx";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/Tab/StoneAgeTabItem')
export default class StoneAgeTabItem extends ButtonEx {
    @property([cc.Node])
    private normalNodeList: cc.Node[] = [];
    @property([cc.Node])
    private selectNodeList: cc.Node[] = [];
    @property({ type: cc.Integer })
    private index: number = -1;

    private _data: any = null;

    private _select: boolean = false;

    private aniTime: number = 0.2;


    public set data(data: any) {
        this._data = data;
        this.dataChanged();
    }

    public get data(): any {
        return this._data;
    }

    public set select(value: boolean) {
        if (this._select == value) {
            return;
        }
        this._select = value;
        this.updateUI();
    }

    public get select(): boolean {
        return this._select;
    }

    public setIndex(value: number) {
        this.index = value;
    }

    public getIndex(): number {
        return this.index;
    }

    protected dataChanged(): void {

    }

    protected updateUI(): void {
        for (let i = 0; i < this.normalNodeList.length; i++) {
            const normalNode = this.normalNodeList[i];
            normalNode.stopAllActions();
            normalNode.opacity = 255;
            normalNode.active = !this._select;
        }
        for (let i = 0; i < this.selectNodeList.length; i++) {
            const selectNode = this.selectNodeList[i];
            selectNode.active = this._select;
            selectNode.opacity = 255;
            selectNode.stopAllActions();
        }
    }

    public playHideAni(): void {
        this._select = false;
        for (let i = 0; i < this.selectNodeList.length; i++) {
            const selectNode = this.selectNodeList[i];
            selectNode.active = true;
            selectNode.opacity = 255;
            selectNode.stopAllActions();
            cc.tween(selectNode).to(this.aniTime, { opacity: 0 }, { easing: 'sineIn' }).call(() => {
                selectNode.active = false;
            }).start();
        }
        for (let i = 0; i < this.normalNodeList.length; i++) {
            const normalNode = this.normalNodeList[i];
            normalNode.active = true;
            normalNode.opacity = 0;
            normalNode.stopAllActions();
            cc.tween(normalNode).to(this.aniTime, { opacity: 255 }, { easing: 'sineOut' }).start();
        }
    }

    public playShowAni(): void {
        this._select = true;
        for (let i = 0; i < this.selectNodeList.length; i++) {
            const selectNode = this.selectNodeList[i];
            selectNode.active = true;
            selectNode.opacity = 0;
            selectNode.stopAllActions();
            cc.tween(selectNode).to(this.aniTime, { opacity: 255 }, { easing: 'sineOut' }).start();
        }
        for (let i = 0; i < this.normalNodeList.length; i++) {
            const normalNode = this.normalNodeList[i];
            normalNode.active = true;
            normalNode.opacity = 255;
            normalNode.stopAllActions();
            cc.tween(normalNode).to(this.aniTime, { opacity: 0 }, { easing: 'sineIn' }).call(() => {
                normalNode.active = false;
            }).start();
        }
    }
}
