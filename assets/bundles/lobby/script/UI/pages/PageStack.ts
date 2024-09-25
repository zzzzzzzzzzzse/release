import AnalyticsTool, { AnalyticsEventEnmu } from "../../../../../Script/tools/log/AnalyticsTool";

export class PageStack {
 
    public node: cc.Node = null;
 
    private block: cc.Node = null;
    private pagesMap: Map<string, PageBase> = new Map();
    private pagesList: PageBase[] = [];
 
    private stack: PageBase[] = [];
 
    public constructor(node: cc.Node) {
        this.node = node;
        this.block = node.getChildByName("block");
        if (this.block) this.block.on("click", () => this.onBlockNodeClick());
    }
 
    public addPage(name: string, page: PageBase) {
        this.pagesMap.set(name, page);
        this.pagesList.push(page);
        page.node.on("page-open-cb", () => this.onPageOpen(page));
        page.node.on("page-close-cb", () => this.onPageClose(page));
    }
 
    public getPage(name: string) {
        return this.pagesMap.get(name);
    }
 
    public openPage(name: string, data?: any) {
        let page = this.pagesMap.get(name);
        page.open();
    }
 
    public closeTopPage() {
        let page = this.stack[this.stack.length - 1];
        page.close();
    }
 
    public closeAllExcept(name: string) {
        let page = this.pagesMap.get(name);
        this.pagesList.forEach(item => {
            if (item !== page) item.close();
        });
    }
 
    public update(dt: number) {
        if (!this.block) return;
        let showing = false;
        for (let item of this.pagesList) {
            if (item.isOpen) {
                showing = true;
                break;
            }
        }
        if (showing) {
            if (!this.block.active) this.block.active = true;
            if (this.block.opacity < 180) {
                this.block.opacity = Math.min(180, this.block.opacity + 720 * dt);
            }
        } else {
            if (this.block.active) {
                this.block.opacity = Math.max(0, this.block.opacity - 720 * dt);
                if (this.block.opacity <= 0) this.block.active = false;
            }
        }
    }
 
    private onPageOpen(page: PageBase) {
        this.stack.push(page);
    }
 
    private onPageClose(page: PageBase) {
        if (this.stack.length <= 1) {
            this.node.emit("stack-out");
        }
        let foundIndex = this.stack.indexOf(page);
        if (foundIndex >= 0) {
            this.stack.splice(this.stack.indexOf(page), 1);
        }
    }
 
    private onBlockNodeClick() {
        let openPages: PageBase[] = this.pagesList.filter(item => item.isOpen);
        openPages.forEach(item => item.node.emit("page-close-active"));
    }
 
    public closeAll() {
        this.pagesList.forEach(item => {
            item.close();
        });
    }
 
    public isHavePageOpen(): boolean {
        for (let index = 0; index < this.pagesList.length; index++) {
            if (this.pagesList[index].isOpen) {
                return true;
            }
        }
        return false;
    }
}
 
export class PageBase extends cc.Component {
 
    public node: cc.Node = null;
 
    private _isOpen: boolean = false;
 
    public constructor(node: cc.Node) {
        super();
        this.node = node;
        // let menuTop = node.getChildByName("menu_top");
        let closeBtn = this.node.getChildByName("btn_close");
        if (closeBtn) {
            closeBtn.on("click", () => this.close());
        }
        node.on("page-close-active", this.onClosePageActive.bind(this));
    }
 
    public get isOpen() {
        return this._isOpen;
    }
 
    public open() {
        this._isOpen = true;
        this.node.emit("page-open-cb");
    }
 
    public close() {
        this._isOpen = false;

        let nodename:string = this.node.name
        if(nodename == "page_profile"){ //头像界面
            AnalyticsTool.logEvent(AnalyticsEventEnmu.user_close)
        }else if(nodename == "page_shop"){ //商城界面
            AnalyticsTool.logEvent(AnalyticsEventEnmu.store_close)
        }else if(nodename == "page_settings"){ //设置界面
            AnalyticsTool.logEvent(AnalyticsEventEnmu.lobby_close)
        }

        this.node.emit("page-close-cb");
    }
 
    protected onClosePageActive() {
        this.close();
    }
}
 
export class NormalPage extends PageBase {
 
    public open() {
        super.open();
        this.node.scale = 1;
        this.node.active = true;
    }
 
    public openDialog() {
        super.open();
        this.node.scale = 0.3;
        this.node.active = true;
        cc.tween(this.node).to(0.1, {scale: 1}).start();
    }
 
    public close() {
        super.close();
        this.node.active = false;
    }
 
    public closeDialog() {
        super.close();
        cc.tween(this.node).to(0.1, {scale: 0.3}).call(() => {
            this.node.active = false;
        }).start();
    }
 
}
 
export class SlidePage extends PageBase {
 
    public open() {
        super.open();
        this.node.active = true;
        let endPos = cc.v3(this.node.parent.width / 2 - this.node.width / 2, 0);
        cc.tween(this.node).to(0.2, {position: endPos}).start();
    }
 
    public close() {
        super.close();
        let endPos = cc.v3(this.node.parent.width / 2 + this.node.width / 2, 0);
        cc.tween(this.node).to(0.2, {position: endPos}).start();
        setTimeout(() => this.node.active = false, 200);
    }
 
}