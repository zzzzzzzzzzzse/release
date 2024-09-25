export interface IInsertAnimationArgs {
    time: number;
    cb: () => void;
}

export interface IAnimationEventArgs {
    node: cc.Node;
    type: EAnimationType;
    animationName?: string;
    loop?: boolean;
    cb?: () => void;
    insert?: Array<IInsertAnimationArgs | Function>;

}

export const enum EAnimationType {
    TWEEN,
    SPINE,
    ANIMATION,
}