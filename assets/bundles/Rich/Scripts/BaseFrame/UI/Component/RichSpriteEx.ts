import RichLogManager from "../../Manager/RichLogManager";
import RichSlotResManager from "../../Manager/RichSlotResManager";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('自定义组件/RichSpriteEx')
export default class RichSpriteEx extends cc.Component {

    private _sprite: cc.Sprite = null;
    private bundleName: string = '';
    private path: string = '';
    private isRemote: boolean = false;

    /**
     * 设置图片
     * @param bundleName bundle名
     * @param path 相对bundle的路径
     */
    public async setImage(bundleName: string, path: string) {
        if (!this.sprite) {
            RichLogManager.instance.log('请将此节点挂在sprite组件下面');
            return;
        }
        if (this.bundleName == bundleName && this.path == path) {
            return;
        }
        this.sprite.node.opacity = 0;
        this.isRemote = false;
        this.bundleName = bundleName;
        this.path = path;
        let res: cc.SpriteFrame = await RichSlotResManager.instance.loadByBundle(bundleName, path, cc.SpriteFrame);
        if (this.isRemote || !this.sprite || !this.sprite.node || !this.sprite.node.isValid || this.path != path) {
            return;
        }
        this.sprite.spriteFrame = res;
        this.sprite.node.opacity = 255;
    }

    /**
     * 加载远程图片
     */
    public async loadRemoteImage(url: string, wdith: number = 0, height: number = 0) {
        this.sprite.node.opacity = 0;
        this.path = url;
        this.isRemote = true;
        let spriteFrame = await RichSlotResManager.instance.loadRemote(url, { ext: '.png' });
        const node = this.sprite.node;
        if (!node || !node.isValid || this.path != url) {
            return;
        }
        this.sprite.node.opacity = 255;
        const custom = wdith > 0 && height > 0;
        this.sprite.sizeMode = custom ? cc.Sprite.SizeMode.CUSTOM : cc.Sprite.SizeMode.TRIMMED;
        if (custom) {
            this.sprite.node.width = wdith;
            this.sprite.node.height = height;
        }
        this.isRemote && (this.sprite.spriteFrame = new cc.SpriteFrame(spriteFrame));
    }

    /**
     * 获取sprite
     */
    public get sprite(): cc.Sprite {
        if (!this.node || !this.node.isValid) {
            return null;
        }
        if (!this._sprite) {
            this._sprite = this.node.getComponent(cc.Sprite);
        }
        return this._sprite;
    }

    /**
     * 清理精灵图片
     */
    public setNull() {
        this.sprite.spriteFrame = null;
        this.bundleName = null;
        this.path = null;
    }
}
