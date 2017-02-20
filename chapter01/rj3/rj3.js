/**
 * Created by Administrator on 2017-02-19.
 */

// 다른 전역 변수와 충돌을 피하기 위해서 namespace를 생성한다.
var rj3 = {};

// svg라는 하위 namespace를 생성한다.
rj3.svg ={};

// svg namespace에 line이라는 함수를 넣는다.
rj3.svg.line = function() {

    var getX = function(point) {
            return point[0];
        },
        getY = function(point) {
            return point[1];
        },
        interpolate = function(points) {
            return points.join("L");
        };

    function line(data) {
        var segments = [],
            points = [],
            i = -1,
            n = data.length,
            d;

        function segment() {
            segments.push("M", interpolate(points));
        }

        // 실제 기능을 담당하는 로직, 이 로직은 최대한 변경이 이루어지면 안된다.
        // 몇몇의 데이터를 구하는 로직은 현재 getX, getY
        while(++i < n) {
            d = data[i];
            points.push([getX.call(this, d, i), getY.call(this, d, i)]);
        }

        if(points.length) {
            segment();
        }

        return segments.length ? segments.join("") : null;
    }

    line.x = function(getXImpl) {
        if(!arguments.length) return getX;
        getX = getXImpl;
        // return line;
        return this;
    }

    line.y = function(getYImpl) {
        if(!arguments.length) return getY;
        getY = getYImpl;
        //return line;
        return this;
    }

    return line;
};
/*
var arrData = [
    [10, 130],
    [100, 60],
    [190, 160],
    [280, 10]
];



//var lineGenerator = rj3.svg.line();
//console.log(lineGenerator(arrData));

var grapher = {
    lineGenerator : rj3.svg.line()
}

grapher.lineGenerator(arrData);
*/

var objData = [
    {x:10, y:130},
    {x:100, y:60},
    {x:190, y:160},
    {x:280, y:10}
];

var lineGenerator = rj3.svg.line();

lineGenerator
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

console.log(lineGenerator(objData));
