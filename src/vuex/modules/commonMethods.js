/****************************************************************************
 * Created by huanghuaqiao on 2017/10/16.                                   *
 * 表单操作相关方法                                                            *
 * 调用方式：在组件中引入该文件后在使用的地方调用相应的方法，如下                      *
 * import commonMethods from '../../vuex/modules/template/commonMethods'     *
 * new commonMethods().showToastMsg({text: '操作成功！',priority: 'success'}); *
 *****************************************************************************/
class commonMethods {
    /**
     * 解析url查询参数函数
     * @param u string 待解析的url
     * @returns {{source: string, protocol, host: string, port: (string|Function|*), query: (Symbol|*|string), params, file: *, hash, path: string, relative: *, segments: Array}}
     */
    parseURL(u) {
            let url = u ? u : location.href;
            let a = document.createElement('a');
            a.href = url;
            return {
                source: url,
                protocol: a.protocol.replace(':', ''),
                host: a.hostname,
                port: a.port,
                query: a.search,
                params: (function() {
                    let searchIndex = location.href.indexOf('?') > 0 && location.href.indexOf('?');
                    let locationSearch = searchIndex ? location.href.substr(searchIndex + 1) : '';
                    let url = u ? u.split('?')[1] : locationSearch;
                    let parameters = {};
                    let splitParameters = url.split("&");
                    for (let i = 0, length = splitParameters.length; i < length; i++) {
                        let keyValue = splitParameters[i].split("=");
                        parameters[keyValue[0]] = keyValue[1];
                    }
                    return parameters;
                })(),
                file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                hash: a.hash.replace('#', ''),
                path: a.pathname.replace(/^([^\/])/, '/$1'),
                relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                segments: a.pathname.replace(/^\//, '').split('/')
            };
        }
        /**
         * {{formSerialize: Function,formClear: Function}}
         * formSerialize 表单序列化方法
         */
        /**
         * 表单序列化方法
         * @param formObj 表单项的父级div
         * eg: <div class="table-header clearfix" ref="queryForm"><label>表单字段：</label><input type="text"></div>
         *  调用方法： formSerialize(this.$refs.queryForm);
         * @returns {{formResult:{name: value}}}
         */
    formSerialize(formObj) {
            let formResult = {};
            const regData = {
                int: { reg: /^[1-9]+[0-9]*$/, text: '请输入正整数' },
                positiveNumber: { reg: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/, text: '请输入正数' },
                maxLength: function(length) {
                    function returnReg(length) {
                        return { reg: new RegExp('^.{0,' + length + '}$'), text: '最大长度不超过' + length + '位' };
                    }
                    return returnReg;
                },
                ip: { reg: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/, text: '请输入正确的ip地址' },
                port: { reg: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, text: '请输入1-65535之间的数字' },
                tel: { reg: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, text: '请输入正确的电话号码' },
                email: { reg: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, text: '请输入正确的邮箱' }
            };
            if (formObj) {
                /* 获取formObj下的带name属性的字段数组 */
                let queryItems = formObj.querySelectorAll('[name]');
                /* 遍历表单字段，获取表单数据 */
                if (queryItems.length) {
                    for (let i = 0, len = queryItems.length; i < len; i++) {
                        let item = queryItems[i];
                        let validType = item.getAttribute('validType');
                        /* 复选框 */
                        if (item.outerHTML.includes('type="checkbox"')) {
                            formResult[item.name] = item.checked ? '1' : '0';
                        } else {
                            let nodeName = (item.nodeName).toLowerCase();
                            item.value &&
                                (formResult[item.name] =
                                    (nodeName === 'input' || nodeName === 'select' || nodeName === 'textarea') ? item.value : item.innerHTML);
                        }
                        if (validType) {
                            let valid;
                            if (validType.includes('[')) {
                                /* 获取验证名称，即maxLength */
                                let validName = validType.split('[')[0];
                                /* 获取验证参数，即最大长度 */
                                let validParams = validType.split('[')[1].replace(']', '');
                                /* 获取最大长度函数 */
                                let maxLengthFunction = regData[validName];
                                /* 获取最大长度闭包函数 */
                                let regComputed = maxLengthFunction(validParams);
                                /* 得到对应的正则参数 */
                                valid = regComputed(validParams);
                            } else {
                                valid = regData[validType];
                            }
                            if (valid) {
                                validType = valid.reg;
                                let value = formResult[item.name] || '';
                                const warnText = valid.text;
                                let existValid = document.querySelector('.valid-ele');
                                existValid && existValid.parentNode.removeChild(existValid);
                                if (!validType.test(value) && value) {
                                    formResult = null;
                                    item.focus();
                                    let warnEle = document.createElement('i');
                                    warnEle.style.cssText = 'position:absolute;display:block;font-size:12px;color:red;text-align:right;';
                                    warnEle.style.cssText += item.parentNode.nodeName === 'LABEL' ? 'top:20px;left:0;' : 'top:34px;left:135px;';
                                    warnEle.innerHTML = warnText;
                                    warnEle.className = 'valid-ele';
                                    item.parentNode.appendChild(warnEle);
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                new commonMethods().showToastMsg({ text: '请传入正确的ref元素', priority: 'danger' });
            }
            return formResult;
        }
        /**
         * 表单值清空方法
         * @param formObj 表单项的父级div
         * eg: <div class="table-header clearfix" ref="queryForm"><label>表单字段：</label><input type="text"></div>
         *      formClear(this.$refs.queryForm);
         */
    formClear(formObj) {
            if (formObj) {
                /* 获取formObj下的带name属性的字段数组 */
                let queryItems = formObj.querySelectorAll('[name]');
                /* 遍历表单字段，获取表单数据 */
                if (queryItems.length) {
                    for (let i = 0, len = queryItems.length; i < len; i++) {
                        let item = queryItems[i];
                        item.value = '';
                    }
                }
            } else {
                new commonMethods().showToastMsg({ text: '请传入正确的ref元素', priority: 'danger' });
            }
        }
        /**
         * 表单值清空方法
         * @param formObj 表单项的父级div
         * eg: <div class="table-header clearfix" ref="queryForm"><label>表单字段：</label><input type="text"></div>
         *      formClear(this.$refs.queryForm);
         */
    disableItems(formObj) {
        if (formObj) {
            /* 获取formObj下的带name属性的字段数组 */
            let queryItems = formObj.querySelectorAll('[name]');
            /* 遍历表单字段，获取表单数据 */
            if (queryItems.length) {
                for (let i = 0, len = queryItems.length; i < len; i++) {
                    let className = queryItems[i].className;
                    queryItems[i].setAttribute('disabled', true);
                    className.includes('datebox') && (queryItems[i].className += ' disabled');
                }
            }
        }
    }

    /**
     * 提示消息函数，默认3秒后消失
     * @param opt: {text: 'string' 提示文本,priority:'string' 提示样式（success:成功，danger失败）}(选择传入)
     * @param callback 文本消失后的回调操作(选择传入)
     */
    showToastMsg() {
        let positionArray = ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'],
            DEFAULT_TIME = 3000,
            nExistTime = DEFAULT_TIME,
            opt = {
                priority: 'success',
                closable: false
            },
            callback,
            flag = false;

        for (let i = 0, length = arguments.length; i < length; i++) {
            let argument = arguments[i],
                type = typeof argument;
            if (type === 'number') {
                nExistTime = argument;
            } else if (type === 'object') {
                opt = Object.assign(opt, argument);
            } else if (type === 'function') {
                callback = argument;
            }
        }
        /* 遍历位置数组，与传入的位置做比较，如果没有找到对应的值则设置默认值 */
        positionArray.map(it => {
            it === opt.position && (flag = true);
        });
        !flag && (opt.position = 'center-center');

        /* 如果页面上存在*/
        let sText = opt.text,
            sHeight = (sText && String(sText).length > 20) ? (Math.ceil(String(sText).length / 22)) * 20 + 12 : 34,
            priority = opt.priority,
            sClassName = 'comm_toast_' + priority,
            parentDiv = document.createElement("div"),
            childDiv = document.createElement("div"),
            toastEle = document.body.querySelectorAll('.comm_toast_body'),
            toastEleDirection = {},
            errorImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAh5JREFUOBGtlb1rFEEYxp93sntphBRKMCEI5+mhIVFQG8FWbE/FP0CFlELEE8GIAVFCAsbaQv8AidkufrSCjVYGFfFMI4l4aeQuCHdmx/eZyy43u4rRc5rZfZ95fzvvx8wKfjHsxNFw5c2XioWtQHBM52EuE8gqLF7pHBXHd0dy/3U76y5Zw8cTQ6cRyxysLWU1712kBmOr+16sLXbbTfJip6fNp+PDs9jE4z/C6MQP6lr60DfhpDukEMNWE+FvZgOZ2/ty9Sp9HNCFyZ31MvpwhuEbFsDlrAsmfQH6DxyChIUu69ajMaodVi30Nc07WYbVzOYs3FPCyIMnGJy650MVtmvylmpL6B894gM1p2QZ1xq+hPbnFXxbeIgdJysYvD6f7oawgbPn0XweofVhOeOlddI2C9hn+uQN225hff6GsxFgN38g3mh2YM8W8fX2JLgmN5QVJE2bE+MY63enAJ0Hzl10cuPpAup3Liss189OJyvtnxzwHw0Bj5OSyzn/rQIw5MbSI8TNhu70AkTMb0MmK+DZVJgHZLvsvHQzzVl95konTCPOplTUZ6qIv2/4+1CWLpHItwLhSDGtZqcAnZyxUEn1C+WxrBsvj0jYjLXltXfdvcjGLuwfRav2Pl9NNnZ5XLW3fnH0siiNDR38/0eP+3ZnUA94LoZtGng5JNdY2jbFUxPXKGyTkS6jD30TQ3p9JYZeL9gckOBefgE/AWdx9phuOa94AAAAAElFTkSuQmCC',
            warningImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAYlJREFUOBGtVbFKA0EQfXNc0CZlMJdOBEFEG9Om8geipR+gjZUQERWx0MZ8gZ9gE2NtZx07QUHELjHaK5jkxpm93KnRzBniwHLszpu3sztv5wi/GJ8uZfDyVAZxWdxFMBccjKgp3waY6sjl67Rx3RkMp8EFPgpWAKoCPDPo+z6nB8FUaL91/nXdiyfMhx4fF05kXksn0yi3YU1jNDbmSTJ0ZMyV2DHSl6hKe81tjXGE0TE1s7FsVY9PUQFat+YxS1vA1DxwsQl03obsKneaC+Y8V820AuQXgOkS4GWGkOmy3Kkow+tLwwCKq/MaZRZ2bZzITKtTtFHi7b3LEDLupUGLXiJaC9oVwlA0HIYWSjbkQqIfExlnFn8NsA99TsyzBgZ4vgP8SckgJUPh8oWoIcMmfLwC2jcCU9myjKHWkDuUh55mywfA2hkwkbWRwvU3YQeLQDYA7i+NY0fC/ven56rsWpA8cPs8hlebQ7+Nfcpmd31HKj46qcZobN+S9hUvjNtgfxAq8Ti/gA9hT5/p2R0XpQAAAABJRU5ErkJggg==',
            successImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAftJREFUOBGtlcsrRFEcx7/nuh55Rom8wtQYoiZmgbJnh6UFkoWFx0JkaWNDin8AOztmZ2tlY5Qk8lqpiaQ8QsPMPX6/c50xM3eKG3dz5vx+39/n3Ht+jxFI87SFQpln73e9sGSvAAKAqLBlMiyBEAwRbMgqDR4EAh+p4aRPfgr2dvogsSSl9CR7kndCiCsIzDx39mwnegy9mZfSINiitOTWTzCOYQ1rOYZjNSf+hl+wGe1wswpDLNGbznKMAvJn8mluIKlagvbz5wtOwHnk7vQ3n5kKSdzznXqzSxsNzqZb2Eh5NdoLixN56k6ZZXBpJHl+2AyWVWHV0wx/XqFTSSzDrjOnL52lq6gEKwQL3t9g/fbaIWEWpVsXre03hcCmrxULtT4Yds6Uoz4nF+teP05enzF+eYyIZTmAzIrXj/ZSJ+BDSkxW1mHZ06SQ+RkmNhr81CACw2eHeIw6GkSHw6QSDdPOqy0xgo1dHCFK62h5DTIJkkfAFrqzvpN9XL69aGmaVYZN1ZsJQFa9WjEFjcgYhsqqVeDU1TF2H+7TQL5NzDK50SnTA99m+9e7tDBBd/UUjeKFDli7cSYhNYZZ/1/YagTR1HCc5tZADGapLKsepAZ3y9D6r+Ggxli8bKY7uufYoUW/XTmGY7U+Pr60gSfPXwasA8jgv/wFfAL85t+sOQKQNAAAAABJRU5ErkJggg==',
            closeEle,
            timer = null;
        /* 为div设置样式 */
        parentDiv.className = 'comm_toast_body ' + opt.position;
        parentDiv.style.cssText = 'position: fixed;width: 350px;min-height:32px;height:auto;text-align: left;z-index: 9999;padding: 6px 8px;line-height: 20px;font-size: 14px;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;background:#fff;color:#333;-webkit-box-shadow: 0 1px 6px rgba(0,0,0,.2);-moz-box-shadow: 0 1px 6px rgba(0,0,0,.2);-mz-box-shadow: 0 1px 6px rgba(0,0,0,.2);box-shadow: 0 1px 6px rgba(0,0,0,.2);-webkit-transition(all .3s linear);-moz-transition(all .3s linear);-mz-transition(all .3s linear);transition(all .3s linear);';

        /* 如果页面上存在消息提示框，判断其位置 */
        if (toastEle.length) {
            for (let i = 0, len = toastEle.length; i < len; i++) {
                let curEle = toastEle[i];
                if (curEle.className.includes('top-') || curEle.className.includes('center-')) {
                    toastEleDirection.top = curEle.offsetTop + curEle.offsetHeight;
                } else {
                    toastEleDirection.bottom = curEle.offsetTop;
                }
            }
        }
        /* 根据传入的位置信息设置位置值 */
        if (String(opt.position).startsWith('top-')) {
            /* 10为两个提示框之间的上下间距，55为顶部导航栏的高度 */
            let topPOs = (toastEleDirection.top && toastEleDirection.top <= screen.height - sHeight + 10) ? toastEleDirection.top + 10 : 55;
            parentDiv.style.cssText += 'top:' + topPOs + 'px;';
        } else if (String(opt.position).startsWith('bottom-')) {
            /* toastEleDirection.bottom实为元素的top位置，55为顶部导航栏的高度,10为两个提示框之间的上下距离 */
            let bottomPOs = (toastEleDirection.bottom && toastEleDirection.bottom <= 55) ? toastEleDirection.bottom + 10 : 20;

            parentDiv.style.cssText += 'bottom:' + bottomPOs + 'px;';
        } else {
            let topPOs = (toastEleDirection.top && toastEleDirection.top <= screen.height - sHeight) ? (toastEleDirection.top + sHeight) : ('50%;margin-top: -' + (sHeight / 2));
            parentDiv.style.cssText += 'top:' + topPOs + 'px;';
        }
        if (String(opt.position).endsWith('left')) {
            parentDiv.style.cssText += 'left:25px;';
        } else if (String(opt.position).endsWith('right')) {
            parentDiv.style.cssText += 'right:25px;';
        } else {
            parentDiv.style.cssText += 'left:50%;margin-left: -175px;';
        }
        /* 判断页面上有没有正在显示的提示消息，若有，则在当前消息下方新增一条 */
        toastEle && (parentDiv.style.cssText = parentDiv.style.cssText.replace('/top.+px;/', 'top:' + (toastEle.offsetTop + 60) + 'px;'));

        childDiv.className = sClassName;

        childDiv.style.cssText = 'padding-left:20px;width:' + (opt.closable ? '310px;' : '338px;');
        /* 如果传入了关闭属性，创建关闭按钮 */
        if (opt.closable) {
            closeEle = document.createElement('span');
            closeEle.style.cssText += 'position:absolute;top:15px;right:8px;font-size:26px;color:#333;cursor:pointer;';
            closeEle.innerHTML = '×';
            parentDiv.appendChild(closeEle);
        }
        /* 创建图标元素 */
        let imgEle = document.createElement('img');
        imgEle.style.cssText = 'position:absolute;left:8px;display:block;width:14px;' + (sHeight === 34 ? 'top:8px;' : 'top:18px;');
        imgEle.src = priority === 'success' ? successImg : priority === 'danger' ? errorImg : warningImg;
        /*childDiv.style.cssText += priority === 'success' ?
        	'border: 1px solid #b1f0a3;color: #468847;background-color: #c7f0bf;' :
        	priority === 'danger' ? 'border: 1px solid #ebccd1;color: #b94a48;background-color: #f2dede;' :
        		'border: 1px solid #ff7d00;color: #b94a48;background-color: #ff7d00;';*/

        parentDiv.appendChild(imgEle);
        /* 设置显示内容 */
        childDiv.innerHTML = priority === 'success' ? sText || '操作成功！' : sText || '操作失败！';
        parentDiv.appendChild(childDiv);
        /* 将元素添加到body中去 */
        document.body.appendChild(parentDiv);
        /* 为关闭按钮绑定点击事件 */
        closeEle && (closeEle.onclick = function(evt) {
            let target = evt.target;
            let container = target.parentNode;
            container && (container.parentNode.removeChild(container));
        });
        /* 移除提示消息框 */
        timer = setTimeout(function() {
            callback && callback();
            parentDiv.style.opacity = 0;
            document.body.removeChild(parentDiv);
            clearTimeout(timer);
            timer = null;
        }, nExistTime);
        /* 为提示框添加鼠标移入移出事件 */
        parentDiv.addEventListener('mouseover', function() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        });
        parentDiv.addEventListener('mouseout', function() {
            timer = setTimeout(function() {
                callback && callback();
                parentDiv.style.opacity = 0;
                document.body.removeChild(parentDiv);
                clearTimeout(timer);
                timer = null;
            }, nExistTime);
        });
    }

    /**
     * 加载蒙层函数
     */
    loadingOn() {
        /* 创建加载框元素 */
        let body = document.body;
        let parentDiv = document.createElement("div");
        let childModal = document.createElement("div");
        let childBox = document.createElement("div");
        let image = document.createElement("img");
        /* 为加载狂元素添加class */
        parentDiv.className = 'loading-layer';
        parentDiv.style.cssText = 'position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 9999;';
        //childModal.className = 'modal-cls';
        childModal.style.cssText = 'position: relative;width: 100%;height: 100%;background: rgba(255,255,255,.2);';
        //childBox.className = 'box-cls';
        childBox.style.cssText = 'position: absolute;top: 50%;left: 50%;margin-top: -32px;margin-left: -32px;width: 64px;height: 64px;';
        image.src = '../../../static/images/loading.gif';
        image.style.cssText = 'display: block;';
        /* 将元素依次append到对应父元素上 */
        childBox.appendChild(image);
        childModal.appendChild(childBox);
        parentDiv.appendChild(childModal);
        body.appendChild(parentDiv);
    }

    /**
     * 关闭蒙层函数
     */
    loadingOff() {
        let body = document.body;
        /* 移除蒙层元素 */
        let modalEle = document.querySelector('.loading-layer');
        modalEle && body.removeChild(modalEle);
    }
    clearConsole() {
        console.clear();
    }
}
export default commonMethods;