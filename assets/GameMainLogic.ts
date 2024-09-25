
import { UIManagernew } from "./UIManagernew"
const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu("manager/GameMainLogic")
export default class GameMainLogic extends cc.Component {


    onLoad() {
        UIManagernew.init();
    }

    update() {

    }

    onDestroy() {


    }
}