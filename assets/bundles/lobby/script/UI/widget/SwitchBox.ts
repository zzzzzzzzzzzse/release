const {ccclass, property} = cc._decorator;
 
@ccclass
export class SwitchBox extends cc.Component {
 
    @property(cc.Node)
    private indicator: cc.Node = null;
    @property
    private defaultIndex: number = 0;
    @property
    private interactable: boolean = true;
    @property(cc.Node)
    public menus: cc.Node[] = [];
    @property(cc.Color)
    private activeColor: cc.Color = cc.color(255, 255, 255, 255);
    @property(cc.Color)
    private inactiveColor: cc.Color = cc.color(255, 255, 255, 255);
    @property(cc.Color)
    private enabledColor: cc.Color = cc.color(255, 255, 255, 255);
    @property(cc.Color)
    private disabledColor: cc.Color = cc.color(255, 255, 255, 255);
 
    private _currentIndex: number = 0;
 
    protected onLoad() {
        for (let item of this.menus) {
            item.on("click", () => this.onMenuItemClick(item));
        }
        // this.updateCurrentIndex(this.defaultIndex);
    }
 
    public get currentIndex() {
        return this._currentIndex;
    }
 
    public get Interactable() {
        return this.interactable;
    }
 
    public set Interactable(value: boolean) {
        this.interactable = value;
        let color = this.interactable ? this.enabledColor : this.disabledColor;
        this.indicator.color = color;
        this.indicator.children.forEach(item => item.color = color);
    }
 
    public switch(index: number) {
        // this.updateCurrentIndex(index);
        this.node.emit("switch-change", index);
    }
 
    public updateCurrentIndex(index: number) {
        let item = this.menus[this._currentIndex];
        item.color = this.inactiveColor;
        item.children.forEach(item => item.color = this.inactiveColor);
        let menu = this.menus[index];
        menu.color = this.activeColor;
        menu.children.forEach(item => item.color = this.activeColor);
        this._currentIndex = index;
        //this.indicator.position = menu.position.clone();
        cc.tween(this.indicator)
            .to(0.12, { position: menu.position.clone() }, { easing: "expoOut" })
            .start();
    }
 
    private onMenuItemClick(menu: cc.Node) {
        if (!this.interactable) {
            return;
        }
        let foundIndex = this.menus.indexOf(menu);
        this.switch(foundIndex);
    }
}