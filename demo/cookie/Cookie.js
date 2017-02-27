function Cookie() {}

/**
 * 设置cookie
 * @author Super
 * @param name
 * @param value
 * @param day 以‘天’为单位
 */
Cookie.prototype.setCookie = function(name, value, day) {
    var objDate = new Date();
    objDate.setDate(objDate.getDate() + day);
    document.cookie = name + '=' + value + '; expires=' + objDate;
};

/**
 * 获取cookie
 * @author Super
 * @param name
 */
Cookie.prototype.getCookie = function(name) {
    var arrCookies = document.cookie.split('; ');
    for (var ac in arrCookies) {
        if (arrCookies[ac].split('=')[0] === name) {
            return arrCookies[ac].split('=')[1];
        }
    }
    return '';
};

/**
 * 删除cookie
 * @author Super
 * @param name
 */
Cookie.prototype.removeCookie = function(name) {
    this.setCookie(name, 0, -1);
};