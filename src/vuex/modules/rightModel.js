/*********************************************************************
 * 右边的所有数据方法                                                *
 * Created by tr on 2017/7/9.                                        *
 *********************************************************************/
import * as types from '../mutation-types'
import sync from '../syncData'

/**
 * @type {{rightModelVisible: boolean, showEditMask: boolean, rightModelPadding: string, componentListData: Array, addComponentVisible: boolean, isAssemblyVisible: boolean}}
 */
const state = {
    /*是否隐藏或显示右边数据*/
    rightModelVisible: true,
    /*点击编辑组件显示覆盖层 值定义*/
    showEditMask:false,
    /*右边模块的数据*/
    rightModelPadding:'',
    /*获取初始化的数据*/
    componentListData: [],
    /*是否显示新增组件的按钮*/
    addComponentVisible:false,
    /*判断是定制组件中*/
    isAssemblyVisible:false
};
/**
 * @type {{rightModelVisible: ((p1:*)=>boolean), showEditMask: ((p1:*)=>boolean), rightModelPadding: ((p1:*)=>string), componentListData: ((p1:*)=>Array), addComponentVisible: ((p1:*)=>boolean), isAssemblyVisible: ((p1:*)=>boolean)}}
 */
const getters = {
    rightModelVisible: state => state.rightModelVisible,
    showEditMask:state => state.showEditMask,
    rightModelPadding:state => state.rightModelPadding,
    componentListData:state => state.componentListData,
    addComponentVisible:state => state.addComponentVisible,
    isAssemblyVisible:state => state.isAssemblyVisible
};
/**
 * @type {{rightModelShow: (({commit}:{commit: *})), rightModelHide: (({commit}:{commit: *}))}}
 */
const actions = {
    /**
     * 允许拖动
     * @param commit
     */
    allowAssembly({commit}){
        commit(types.ALLOW_ASSEMBLY);
    },
    /**
     * 不允许拖动
     * @param commit
     */
    notAllowAssembly({commit}){
        commit(types.NOT_ALLOW_ASSEMBLY);
    },
    /**
     * 右边数据显示
     * @param commit
     */
    rightModelShow({commit}) {
        commit(types.RIGHT_MODEL_SHOW);
    },
    /**
     * 右边的数据隐藏
     * @param commit
     */
    rightModelHide({commit}) {
        commit(types.RIGHT_MODEL_HIDE);
    },
    /**
     * 显示编辑组件
     * @param commit
     */
    showEditMaskFun({commit}){
        commit(types.SHOW_EDIT_MASK);
    },
    /**
     * 隐藏编辑组件
     * @param commit
     */
    hideEditMaskFun({commit}){
        commit(types.HIDE_EDIT_MASK);
    },
    /**
     * 显示右边数据
     * @param commit
     */
    rightModelPaddingFun({commit}){
        commit(types.RIGHT_MODEL_PADDING);
    },
    /**
     * 隐藏右边
     * @param commit
     */
    hideRightModelPaddingFun({commit}){
        commit(types.HIDE_RIGHT_MODEL_PADDING);
    },
    /**
     * 获取组件列表getComponentList
     * @param commit
     * @param reqData
     */
    getComponentListFun({commit},{reqData}){
        sync.getComponentList(reqData,data =>{
            let newData = [];
            if(data.length > 0){
                data.map(item=>{
                    let newItem = item;
                    newItem.data = '';
                    newData.push(newItem);
                    sync.getEchartsData({id:item.id,url:item.dataUrl},da=>{
                        newData.map(it=>{
                            if(it.id === da.id){
                                it.data = da.data;
                            }
                        }) ;
                    });
                });
                commit(types.COMPONENT_LIST_MUN,{newData});
            }

        })
    },
    /**
     * 拖动后，设置组件排序
     * @param commit
     * @param reqOderData
     */
    setComponentOderFun({commit},{reqOderData}){
        sync.setComponentOder(reqOderData,data =>{

        })
    },
    /**
     * 显示增加组件按钮
     * @param commit
     */
    showAddComponentFun({commit}){
        commit(types.SHOW_ADD_COMPONENT)
    },
    /**
     * 隐藏增加组件按钮
     * @param commit
     */
    hideAddComponentFun({commit}){
        commit(types.HIDE_ADD_COMPONENT)
    }
};
/**
 * @type {{[[types.ALLOW_ASSEMBLY]]: ((state)), [[types.NOT_ALLOW_ASSEMBLY]]: ((state)), [[types.RIGHT_MODEL_SHOW]]: ((state)), [[types.RIGHT_MODEL_HIDE]]: ((state)), [[types.SHOW_EDIT_MASK]]: ((state)), [[types.HIDE_EDIT_MASK]]: ((state)), [[types.RIGHT_MODEL_PADDING]]: ((state)), [[types.HIDE_RIGHT_MODEL_PADDING]]: ((state)), [[types.COMPONENT_LIST_MUN]]: ((state, {newData}:{newData: *})), [[types.SHOW_ADD_COMPONENT]]: ((state)), [[types.HIDE_ADD_COMPONENT]]: ((state))}}
 */
const mutations = {
    [types.ALLOW_ASSEMBLY] (state) {
        state.isAssemblyVisible = true;
    },
    [types.NOT_ALLOW_ASSEMBLY] (state) {
        state.isAssemblyVisible = false;
    },
    [types.RIGHT_MODEL_SHOW] (state) {
        state.rightModelVisible = true;
    },
    [types.RIGHT_MODEL_HIDE] (state) {
        state.rightModelVisible = false;
    },
    [types.SHOW_EDIT_MASK] (state) {
        state.showEditMask = true;
    },
    [types.HIDE_EDIT_MASK] (state) {
        state.showEditMask = false;
    },
    [types.RIGHT_MODEL_PADDING] (state) {
        state.rightModelPadding = 'rightModelPadding';
    },
    [types.HIDE_RIGHT_MODEL_PADDING] (state) {
        state.rightModelPadding = '';
    },
    [types.COMPONENT_LIST_MUN](state, {newData}){
        state.componentListData = newData;
    },
    [types.SHOW_ADD_COMPONENT](state){
        state.addComponentVisible = true;
    },
    [types.HIDE_ADD_COMPONENT](state){
        state.addComponentVisible = false;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};