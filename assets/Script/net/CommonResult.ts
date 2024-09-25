/**
 * 接口层回调
 */
export class CommonResult<T> {
    public succ: boolean = false;
    public code: number = 0;
    public status: number = 0;
    public data: any = null;
    public data2: any = null;
    public msg: string = null;
}