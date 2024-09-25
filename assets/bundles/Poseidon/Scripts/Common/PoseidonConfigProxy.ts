/**
 * 配置表数据代理
 */
export default class PoseidonConfigProxy {
    private static _instance: PoseidonConfigProxy = null;
    private configMap: any = {};

    /**
     * 获取单例
     */
    public static get instance(): PoseidonConfigProxy {
        if (!this._instance) {
            this._instance = new PoseidonConfigProxy();
        }
        return this._instance;
    }

    /**
     * 
     * @param configName 配置表名
     * @param configData 配置表数据
     * 添加配置表数据
     */
    public addConfigData(configName: string, configData: any): void {
        this.configMap[configName] = configData;
    }

    /**
     * 
     * @param configName 配置表名
     * @returns 获取配置表数据
     */
    public getConfigData(configName: string): any {
        return this.configMap[configName];
    }
}
