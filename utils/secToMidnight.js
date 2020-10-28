module.exports = secToMidnight = () => {
    var d = new Date();
    return Math.floor((-d + d.setHours(24, 0, 0, 0)) / 1000);
};
