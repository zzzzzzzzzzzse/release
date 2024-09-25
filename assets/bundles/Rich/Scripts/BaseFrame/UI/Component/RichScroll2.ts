import RichSlotWheelBase from "./RichSlotWheelBase";

enum Direction {
    leftToRight = 1,
    rightToLeft,
    topToBottom,
    bottomToTop
}
cc.Enum(Direction);

const { ccclass, property } = cc._decorator;
@ccclass
export default class RichScroll2 extends RichSlotWheelBase {

    @property({ readonly: false, type: [cc.Node] })
    scrollNodeList: cc.Node[] = [];
    @property({ readonly: false })
    direction: Direction = Direction.topToBottom;
    @property({ readonly: true })
    delta: number = 0;

    start() {
    }

    public calcDistance(): void {
        super.calcDistance();
        let offset = this.curDistance %= this.perDistance * 2;
        let count = Math.floor(this.curDistance / this.perDistance);
        let offsetTwo = this.curDistance %= this.perDistance;
        for (let i = 0; i < this.scrollNodeList.length; i++) {
            const scrollNode = this.scrollNodeList[i];
            if (this.direction == Direction.topToBottom) {
                if (i % 2 == 0) {
                    if (count % 2 == 0 || count % 2 == -1) {
                        scrollNode.y = this.delta - offsetTwo;
                    }
                    else {
                        scrollNode.y = this.delta + this.perDistance - offsetTwo;
                    }
                }
                else {
                    scrollNode.y = this.delta + this.perDistance - offset;
                }
            }
            else if (this.direction == Direction.rightToLeft) {
                scrollNode.x = this.delta + i * this.perDistance - this.curDistance;
            }
        }
    }

    public getScrollNode(): cc.Node {
        return this.scrollNodeList[0];
    }

}
