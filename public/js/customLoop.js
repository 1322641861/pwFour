

/*获取元素*/
let imgBox = document.querySelector(".list");
let imgs = document.querySelectorAll(".list > .item img");
let left = document.querySelector(".left");
let play = document.querySelector(".play");
let right = document.querySelector(".right");

/*全局变量*/
let state = 0;//记录图片状态
let next = 0;

/*改变state的状态函数*/
function change(dir) {
    if (dir === "left") {
        if (next != (-1) && state >= 0) { //左边界判断
            if (state < 5) {
                state++;
                next = state;
            }
            if (state == 5) {
                next = -1;
            }
        } else {
            state = 0;
            next = state;
        }
    } else {
        if (next == 0 && state == 0) {
            state = 5;
            next = -1;
        } else {
            if (state > 0) {
                state--;
                next = state;
            }
        }
    }
}

/*图片切换*/
function move(dir) {
    if (dir === "left") {
        change(dir)
        imgBox.style.transition = "1s";
        imgBox.style.left = -440 + "px";
        setTimeout(function () {
            imgBox.style.transition = "0s";
            imgBox.style.left = 0;
            imgs[0].src = `/public/images/swiper/${state}.jpg`;
            imgs[1].src = `/public/images/swiper/${next + 1}.jpg`;
        }, 1000)
    } else {
        change(dir);
        imgBox.style.transition = "0s";
        imgBox.style.left = -440 + "px";
        imgs[0].src = `/public/images/swiper/${state}.jpg`;
        imgs[1].src = `/public/images/swiper/${next + 1}.jpg`;
        setTimeout(function () {
            imgBox.style.transition = "1s";
            imgBox.style.left = 0;
        }, 0)
    }
}


/*给幻灯片添加定时器*/
let timer = setInterval(function () {
    move("left")
}, 2000);

/*点击事件*/
let isClick = true;

left.onclick = function () {
    clearInterval(timer);
    if (isClick) {
        isClick = false;
        move("left");
        setTimeout(function () {
            isClick = true;
        }, 1000)
    }
}

right.onclick = function () {
    clearInterval(timer);//停止定时器
    if (isClick) {
        isClick = false;
        move("right");
        setTimeout(function () {
            isClick = true;
        }, 1000)
    }
}

play.onclick = function () {
    if (timer) {
        clearInterval(timer);
        timer = null;
    } else {
        timer = setInterval(function () {
            move("left")
        }, 2000);
        timer;
    }

}