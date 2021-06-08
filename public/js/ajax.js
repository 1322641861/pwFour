let loginedToken = localStorage.getItem('logined_token');
const ajaxTools = {
    get: (url, body, callback) => {
        let bodyStr = typeof body === String 
            ? ajaxTools.formatGetStrParams(body)
            : ajaxTools.formatGetParams(body)
        
        // 1.创建对象, 浏览器是否支持 XMLHttpRequest
        let xhr
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }

        // 2. 建立连接, 通过open方法跟后台交互
        // 三个参数: 1. 发送方式 2.地址 3.是否异步
        xhr.open('GET', url + bodyStr, true)
        xhr.setRequestHeader('token', `${loginedToken}`)

        // 3. 请求需求正式发送
        xhr.send(null)

        // 4. 监听, 结束行为
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) {
                    callback(xhr.responseText)
                }
            }
        }
    },
    post: (url, data, callback, setHeader) => {
        const formData = JSON.stringify(data)

        let xhr
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 接受后端send回来的数据
                    let resText = xhr.responseText;
                    if (typeof resText === 'string' && resText.indexOf('{') >= 0 && resText.indexOf('<html>')<0) {
                        resText = JSON.parse(xhr.responseText);
                    }
                    callback(resText);
                }
            }
        }

        xhr.open("POST", url, true)
        // 设置请求头
        if (setHeader) {
            for (let key in setHeader) {
                xhr.setRequestHeader(key, setHeader[key])
                xhr.setRequestHeader('token', `${loginedToken}`)
            }
        } else {
            // xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded")
            xhr.setRequestHeader('Content-type', 'multipart/form-data')
            // xhr.setRequestHeader('Content-type', 'image/*')
            xhr.setRequestHeader('token', `${loginedToken}`)
        }
        xhr.send(formData)
    },
    formatGetParams: (body) => { // return String
        let bodyStr = ''
        for (let i in body) {
            bodyStr += '&' + i + '=' + body[i]
        }
        if (bodyStr !== '') {
            bodyStr = "?" + bodyStr.substr(1)
        }
        return bodyStr
    },
    formatGetStrParams: (value) => { // return string
        let paramStr = value;
        if (paramStr.indexOf('?') < 0) {
            paramStr = "?" + paramStr;
        }
        return paramStr;
    },
    formatPostStrParams: (value) => { // return object
        let paramsStr = value;
        let paramsStrList = [];
        let paramsMap = {};
        if (paramsStr.indexOf('?') >= 0) {
            paramsStr = paramsStr.split('?')[1];
        }
        paramsStrList = paramsStr.split('&');
        paramsStrList.forEach((item, index) => {
            let param = item.split('=');
            paramsMap[param[0]] = param[1];
        });
        return paramsMap;
    }
}
