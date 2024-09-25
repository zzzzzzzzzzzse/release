export class BaseUI {
    
    static addNetLoading(){
        cc.find("LoadingNode").getComponent("LoadingAniView").show(10)
    }

    static removeNetLoading(){
        cc.find("LoadingNode").getComponent("LoadingAniView").hideNode()
    }
 
}
