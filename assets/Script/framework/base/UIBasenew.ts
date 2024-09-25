
import { UIManagernew } from "../../../UIManagernew";

export class UIBasenew extends cc.Component {

    protected childrenList : any;

    init(data? : any) {
        this.childrenList = {};
        // this.getNodeAllChildren(this.node)
    }

    // getNodeAllChildren(node : cc.Node) {
    //     if (node) {
    //         let children = node.children || []
    //         let lastChar = node.name.charAt(node.name.length - 1)
    //         if (lastChar == "_") {
    //             let nameArr = node.name.split("_")
    //             let key = nameArr[0]
    //             for (let index = 1; index < nameArr.length - 1; index++) {
    //                 const element = nameArr[index];
    //                 if(element){
    //                     key = key + element.trim().replace(element[0], element[0].toUpperCase())
    //                 }
    //             }
    //             this.childrenList[key] = node
    //         }
    //         if (children.length <= 0) {
    //             return
    //         } else {
    //             for (let index = 0; index < children.length; index++) {
    //                 const element = children[index];
    //                 this.getNodeAllChildren(element)
    //             }
    //         }
    //     }
    // }

    onDestroy() {
        cc.log("<<<<<<<<<< onDestroy  >>>>>>>>>", this.node.name)
        if (this.name && this.name != "") {
            UIManagernew.removeUIName(this.node.name)
        }
    }
}