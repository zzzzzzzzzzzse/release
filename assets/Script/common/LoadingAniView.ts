
const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingAniView extends cc.Component {

    @property(cc.Node)
    ani: cc.Node = null;

    onLoad () {


    }
    
    show(sec:number) {
       if(this.node.active) return
        this.node.active = true
        this.node.zIndex = Number.MAX_VALUE+1

        let frameSize = cc.view.getFrameSize();
        let width = frameSize.width;
        let height = frameSize.height;
        if(width>height){
            this.node.x = 640
            this.node.y = 320
        }else{
            this.node.x = 360
            this.node.y = 780
        }
        // cc.tween(this.ani).by(2, {angle: 360}).repeatForever().start();
    }

    hideNode(){
        this.node.active = false  
        this.node.stopAllActions()
    }
    start () {
    }
    onDestroy(){
       // console.log("onDestroyonDestroy")
    }

    // update (dt) {}
}
