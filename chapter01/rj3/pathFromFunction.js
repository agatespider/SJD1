/**
 * Created by Administrator on 2017-02-19.
 */

// svg namespace에 sample이라는 namespace를 만든다.
rj3.svg.samples = {};

// rj3.svg.line namespace안의 line()함수를 감싸서 사용하는 함수
rj3.svg.samples.functionBaseLine = function functionBaseLine() {
    var firstXCoord = 10,
        xDistanceBetweenPoints = 50,
        lineGenerator,
        svgHeight = 200;

    lineGenerator = rj3.svg.line()
        .x(function(d, i) { return firstXCoord + i * xDistanceBetweenPoints})
        .y(function(d) { return svgHeight});

    return lineGenerator;
};

(function() {
    var yearlyPriceGrapher = {
            lineGenerator: rj3.svg.samples.functionBaseLine(),
            getValue: function getValue(year) {
                return 10 * Math.pow(1.8, year-2010);
            }
        },
        years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
        path = yearlyPriceGrapher.lineGenerator(years);

    console.log(path);
}());