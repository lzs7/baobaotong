//将获取cookie封装、
function getCookie() {

    if (document.cookie.length > 0) {
        //判断有cookie执行下面操作
        var arr = document.cookie.split(";"); //这里显示的格式需要切割一下自己可输出看下
        // console.log("第一次分割:" + arr);
        // console.log("长度" + arr.length);
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split("="); //再次切割
            // console.log("第二次分割:" + arr2);

            // console.log(arr2[0]);
            // console.log("这是第:" + i); //判断查找相对应的值
            if (arr2[0].trim() == "userName") {
                //判断指定的cookie在不在
                return (arr2[1]);
            }
        }
    } else {
        return 0
    }
}

function clearCookie() {
    this.setCookie("", "", 0);
}
export default {
    clearCookie,
    getCookie,

}