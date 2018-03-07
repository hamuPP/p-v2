/*********************************************************************
 * Created by tr on 2017/8/11.                                       *
 *********************************************************************/
class common{
    recursion(data,obj){
         if(data) {
             let newData = [];
             if(data.length) {
                 data.map(da => {
                     let newDa = da;
                     newDa.isSelect = false;
                     if(obj) {
                        /*判断是不是选中的数据*/
                         if((da.customizationId && da.customizationId === obj.customizationId) ||
                             (da.oauthClientId && da.oauthClientId === obj.oauthClientId && da.resCode === obj.resCode)) {
                             newDa.isSelect = true;
                         }
                     }else {
                         newDa.checked = false;
                         if (da.appName) {
                             newDa.checked = true;
                         }
                     }
                     newData.push(newDa);
                     if (da.children && da.children.length) {
                         return this.recursion(da.children,obj);
                     }
                 });
             }
             return newData;
         }else {
             return data;
         }
    }

}
export default common;
