

/**@description 获取根据类型获取单列 */
function getSingleton<T>( SingletonClass : Singleton<T>){
    return SingletonClass.Instance();
}
window.getSingleton = getSingleton;

export function extentionsInit(){

}



