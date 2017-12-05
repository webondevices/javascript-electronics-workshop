var util = {
    map: function(input, in_min, in_max, out_min, out_max) {
        return (input - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },
    
    limit: function(input, min, max) {
        var output = input;
        if (input < min) output = min;
        if (input > max) output = max;
        return output;
    }
};

module.exports = util;