/**@description 管理器 */
import { Framewok } from "../../framework/Framework";
import { CocosExtentionInit } from "../../framework/extentions/CocosExtention";
/**@description 游戏所有运行单例的管理 */
class _Manager extends Framewok {

    init() {
    //引擎扩展初始化
    CocosExtentionInit();
    }
}

export function applicationInit() {
    let mgr = new _Manager();
    window["Manager"] = mgr;
    mgr.init();
}
