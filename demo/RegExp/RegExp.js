function RegExp() {}

/**
 * 注意：
 * . 和 * 避免使用
 */

RegExp.prototype.verifyEmail = function (email) {
    var strEmailRE = /^[a-z0-9]{8,16}@[a-z0-9]{2,6}\.[a-z]{1,4}$]/i;
    return strEmailRE.test(email);
}
