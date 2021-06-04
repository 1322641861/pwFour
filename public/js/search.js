
let showSearch = $('.search-ul')[0];
let searchHeight = $('.search-input .search-area')[0]; // input 外层
let searchFlag = true; // 防抖
const inputInput = $('.search-area input[type="input"]');

async function searchData() {
    let text = $('.search-area input[type="input"]');
    if (text.length > 0 && text[0].value !== '') {
        await ajaxTools.get(searchApi + `?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=34099,33971,31254,34004,33607,26350&wd=${text[0].value}&req=2&csor=3&pwd=12&cb=jQuery11020547018334115025_1622710888342&_=1622710888345`,
            '',
            (value) => {
                const list = JSON.parse(value).data;
                if (list) {
                    let listStr = '';
                    showSearch.style.display = 'block';
                    searchHeight.style.height = 'auto';
                    for (const item of list) {
                        listStr += `<li class='search-click'>${item.q}</li>`;
                    }
                    showSearch.innerHTML = listStr;
                } else {
                    clearSearchResult();
                }
            }
        )
    }
}

/**
 * Internet Explorer: propertychange
 * Firefox, Google Chrome, Opera, Safari, Internet Explorer from version 9: input
 */
inputInput.on("input propertychange click", (e) => {
    /// 无内容时
    if (!inputInput[0].value) clearSearchResult();
    /// 防抖
    if (searchFlag) {
        searchData();
    } else {
        return;
    }
    searchFlag = false;
    setTimeout(() => {
        searchFlag = true;
    }, 500);
})

/// 监听 点击输入框以外的元素时
document.addEventListener('mousedown', (e) => {
    let ulWrap = $('.search-area')[0];
    /// e.path 包含该页面所有的元素(包括window)
    if (!e.path.includes(ulWrap)) {
        clearSearchResult();
    } else {
        $('.search-ul li').on('click', (e) => {
            inputInput[0].value = e.target.innerHTML;
            clearSearchResult();
        });
        return;
    }
})

/// 清除搜索框的结果
function clearSearchResult() {
    searchHeight.style.height = '30px';
    showSearch.style.display = 'none';
    showSearch.innerHTML = '';
}