/** 事件总线，跨模块传递事件 */
export class EventBus {

    /** 已注册的事件监听者 */
    private events: Map<string, Function[]> = new Map();

    /** 注册事件监听者 */
    public register(name: string, event: Function) {
        let _events = this.events.get(name);
        if (!_events) {
            _events = [];
            this.events.set(name, _events);
        }
        _events.push(event);
    }

    /** 注销事件监听者 */
    public deregister(name: string, event: Function) {
        this.events.forEach((value, key) => {
            if (name === key) {
                this.events.delete(key);
            }
        });
    }

    /** 发送事件 */
    public post(name: string, ...args: any[]) {
        let _events = this.events.get(name);
        if (!_events) {
            cc.warn("error", name);
            return;
        }
        _events.forEach(event => {
            if (args) return event(...args);
            else return event();
        });
    }


    // /** 注册事件监听者 */
    // public register(name: string, event: Function) {
    //         let _events = this.events.get(name);
    //         if (!_events) {
    //             _events = [];
    //             this.events.set(name, _events);
    //         }
    //         _events.push(event);
    // }
    
    // /** 注销事件监听者 */
    // public deregister(name: string, event: Function) {
    //     let _events = this.events.get(name);
    //     if (!_events) {
    //         console.warn("注销事件失败:", name);
    //         return;
    //     }
    //     let foundIndex = _events.indexOf(event);
    //     if (foundIndex >= 0) {
    //         _events.splice(foundIndex, 1);
    //     } else {
    //         console.warn("注销事件失败:" + name, _events.length);
    //     }
    // }
    
    // /** 发送事件 */
    // public post(name: string, ...args: any[]) {
    //     let _events = this.events.get(name);
    //     if (!_events) {
    //         cc.warn("事件已发送，但是没有任何接收者", name);
    //         return;
    //     }
    //     _events.forEach(event => {
    //         if (args) {
    //             return event(...args);
    //         } else {
    //             return event();
    //         }
    //     });
    // }
}

/**
 * eventbus枚举
 */
export enum EventBusEnum {
    // 返回键
    app_back_btn_pressed = "Event_APP_back_pressed",
    // 退出app
    app_exit = "Event_APP_exit",
    //用户登录成功
    user_cocos_login_succes = "user_cocos_login_succes",
    ios_user_login_succes = "ios_user_login_succes",
    app_user_login_succes = "app_user_login_succes",
    app_user_login_err = "app_user_login_err",
    //奖励
    app_give_result = "app_give_result",
    //充值成功
    app_deposit_success = "app_deposit_success",
}