module.exports = {
    get
};

/**
 * Simulate http.get
 * @param {string} url
 * @param {function} callback
 * @param {*} err Set to make error
 */
function get(url, callback, err) {
    var result = 'result'; // dummy result
    setTimeout(() => {
        console.log(url);
        if (callback) {
            callback(err, result);
        }
    }, Math.floor(Math.random() * 10) * 500);
}