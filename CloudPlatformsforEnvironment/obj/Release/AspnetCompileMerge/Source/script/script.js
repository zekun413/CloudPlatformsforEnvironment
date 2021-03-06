/// <reference path="jquery-2.2.3.min.js" />

var DescartesFlag = false;
var myChart;
var descartesData;

(function ($) {
    var _sleeptimer;
    $.sleep = function (time2sleep, callback) {
        $.sleep._sleeptimer = time2sleep;
        $.sleep._cback = callback;
        $.sleep.timer = setInterval('$.sleep.count()', 1000);
    }
    $.extend($.sleep, {
        current_i: 1,
        _sleeptimer: 0,
        _cback: null,
        timer: null,
        count: function () {
            if ($.sleep.current_i === $.sleep._sleeptimer) {
                clearInterval($.sleep.timer);
                $.sleep._cback.call(this);
            }
            $.sleep.current_i++;
        }
    });
})(jQuery);

function controlSideToggle() {
    if ($(this)[0].checked) {
        $('#popping-window').css('right', '200px');
        $('#topbar-window').css('right', '200px');
    }
    else {
        $('#popping-window').css('right', '80px');
        $('#topbar-window').css('right', '80px');
    }
}

function controlTabCurrent() {

    // element = document.getElementsByClassName('tabControl')[0].getElementsByTagName('a');

    // //这里写了个超麻烦的方法处理，。。。。，看看以后能不能找到更好的办法

    // for (var i = 0; i < element.length; i++) {
    //     if (element[i].className != $(this).className) {
    //         var elementClassName = element[i].className.split(' ');
    //         for (j = 0; j < elementClassName.length; j++) {
    //             if (elementClassName[j] == "current") {
    //                 reg = new RegExp(' current');
    //                 element[i].className = element[i].className.replace(reg);
    //                 break;
    //             }
    //         }
    //     }
    // }

    // var flag = false;

    // var elementClassName = $(this).className.split(' ');
    // for (var i = 0; i < elementClassName.length; i++) {
    //     if (elementClassName[i] == "current") {
    //         reg = new RegExp(' current');
    //         $(this).className = $(this).className.replace(reg);
    //         flag = true;
    //     }
    // }

    // if (!flag) $(this).className += " current";

    // //想到了一个还算干净的办法， 代码量缩减的很多

    var element = $(this);
    element.toggleClass('current');

    $('ul.tabControl li').each(function (index) {
        if (index != $("ul.tabControl li").index(element.parent())) {
            $(this).children("a").removeClass('current');
        }
    });
}

function controlTopbarCurrent() {
    var element = $(this);
    element.toggleClass('current');

    $('header li').each(function (index) {
        if (index != $("header li").index(element.parent())) {
            $(this).children("a").removeClass('current');
        }
    });
}

function controlTopbar() {
    if ($(this).hasClass('current')) {
        $('#topbar-window').css('top', '76px');
    } else {
        $('#topbar-window').css('top', '-80px');
    }
}

function controlPopping() {
    if ($(this).hasClass('current')) {
        $('#popping-window').css('bottom', '12px');
    } else {
        $('#popping-window').css('bottom', '-540px');
    }
}

function controlSearching() {
    if ($('#searching-window > section').css("width") == "0px") {

        $('#searching-window').css("outline", "1px solid #85C79C");
        $('#searching-window > section').css("width", "360px");
        $('#searching-window > section').css("max-height", "640px");
        $('#searching-window > section').css("padding", "10px");
        $('#searching-window > a').css("background-color", "#85C79C");
        $('#searching-window > a').css("color", "whitesmoke");
        $('#searching-window > section > section:first-child > div:first-child').css("top", "-8px");
        $('#searching-window > section > section:last-child > ul').css("display", "block");

        //<a>信用等级</a><ul class=\"dropdown\"><li><a>信用等级</a></li><li><a>所在地</a></li><li><a>近五周排污总量</a></li></ul>

        var element_1 = "<section id=\"default\"><div class=\"wrapper-dropdown select fields\"><span class=\"ion-ios-arrow-down ionicons\"></span><ul class=\"dropdown\"></ul></div><div class=\"wrapper-dropdown select\"><a name = \" > \">大于</a><ul class=\"dropdown\"><li><a name = \" < \">小于</a></li><li><a name = \" > \">大于</a></li><li><a name = \" = \">等于</a></li><li><a name = \" != \">异于</a></li><li><a  name = \" like \">相似</a></li></ul><span class=\"ion-ios-arrow-down ionicons\"></span></div><input type=\"text\" name=\"queryField\" /></section>";

        var element_2 = "<section><div class=\"wrapper-dropdown select fields\"><span class=\"ion-ios-arrow-down ionicons\"></span><ul class=\"dropdown\"></ul></div><div class=\"wrapper-dropdown select\"><a name = \" > \">大于</a><ul class=\"dropdown\"><li><a name = \" < \">小于</a></li><li><a name = \" > \">大于</a></li><li><a name = \" = \">等于</a></li><li><a name = \" != \">异于</a></li><li><a  name = \" like \">相似</a></li></ul><span class=\"ion-ios-arrow-down ionicons\"></span></div><input type=\"text\" name=\"queryField\" /><a class=\"and\"></a></section>";

        $("#searching-window > section > section:first-child").append(element_1, element_2);

        enterpriseFieldsRequire(intSearching);

    } else {

        $('#searching-window').css("outline", "none");
        $('#searching-window > section').css("width", "0px");
        $('#searching-window > section').css("max-height", "0px");
        $('#searching-window > section').css("padding", "0px");
        $('#searching-window > a').css("background-color", "whitesmoke");
        $('#searching-window > a').css("color", "#85C79C");
        $('#searching-window > section > section:first-child > div:first-child').css("top", "-64px");
        $('#searching-window > section > section:last-child > ul').css("display", "none");

        $("#searching-window > section > section:first-child section").remove();
    }
}

function controlSearchingPlus() {
    switch ($(this).index() + 1) {
        case 1:
            var element = "<section><div class=\"wrapper-dropdown select fields\"><span class=\"ion-ios-arrow-down ionicons\"></span><ul class=\"dropdown\"></ul></div><div class=\"wrapper-dropdown select\"><a name = \" > \">大于</a><ul class=\"dropdown\"><li><a name = \" < \">小于</a></li><li><a name = \" > \">大于</a></li><li><a name = \" = \">等于</a></li><li><a name = \" != \">异于</a></li><li><a  name = \" like \">相似</a></li></ul><span class=\"ion-ios-arrow-down ionicons\"></span></div><input type=\"text\" name=\"queryField\" /><a class=\"and\"></a></section>";

            if ($("#searching-window > section > section:first-child").css("height") < "180px") {
                $("#searching-window > section > section:first-child").append(element);
                enterpriseFieldsRequire(intSearching);
            }
            break;
        case 2:
            if ($("#searching-window > section > section:first-child section").length > 2) {
                $("#searching-window > section > section:first-child section:last-child").remove();
            }
            break;
    }
}

function controlSearchingSql() {
    $(this).toggleClass('or');
    $(this).toggleClass('and');
}

function controlSearchingDropdown() {

    $(this).toggleClass('active');
}

function controlSearchingUl() {

    var element = $(this);
    element.toggleClass('current');

    $('#searching-window > section > section:last-child > ul li').each(function (index) {
        if (index != $("#searching-window > section > section:last-child > ul li").index(element)) {
            $(this).removeClass('current');
        }
    });
}

function enterpriseFieldsRequire(callback) {

    var fieldsDictionary = "[";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost:6443/arcgis/rest/services/CloudPlatformsforEnvironment/CloudPlatformsforEnvironment/FeatureServer/0?f=pjson");
    xhr.send();
    xhr.onload = function () {
        var result = JSON.parse(xhr.responseText);
        var fields = result.fields;
        for (var i = 0; i < fields.length; i++) {
            fieldsDictionary += "{" + "\"name\": " + "\"" + fields[i].name + "\"" + "," + "\"alias\": " + "\"" + fields[i].alias + "\"" + "}";
            if (i < fields.length - 1) {
                fieldsDictionary += ",";
            }
        }
        fieldsDictionary += "]";

        fieldsDictionary = JSON.parse(fieldsDictionary);

        if ($('#searching-window > section > section:first-child section').length == 2) {
            $('#searching-window > section > section:first-child section div:first-child > span').after("<a " + "name = \"" + fieldsDictionary[0].name + "\">" + fieldsDictionary[0].alias + "</a>");

            for (i = 0; i < fieldsDictionary.length; i++) {
                $('#searching-window > section > section:first-child section div:first-child > ul').append("<li><a " + "name = \"" + fieldsDictionary[i].name + "\">" + fieldsDictionary[i].alias + "</a></li>")
            }
        }
        else {
            $('#searching-window > section > section:first-child section:last-child div:first-child > span').after("<a " + "name = \"" + fieldsDictionary[0].name + "\">" + fieldsDictionary[0].alias + "</a>");

            for (i = 0; i < fieldsDictionary.length; i++) {
                $('#searching-window > section > section:first-child section:last-child div:first-child > ul').append("<li><a " + "name = \"" + fieldsDictionary[i].name + "\">" + fieldsDictionary[i].alias + "</a></li>")
            }
        }

        callback();
    };
}

function descartesRequire() {
    var options = {
        type: "POST",
        cache: false,
        //url: "Default.aspx/GetDescartesData",
        url: "../services/DataService.svc/GetDescartesData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            alert(response.d);

            descartesData = JSON.parse(response.d);

            //loadDescartes(function () {
            //    if (DescartesFlag) {
            //        $("#descartesResult > .loader").css('display', 'none');
            //    }
            //});
        },
        error: function (jqXHR, textStatus, errorThrown) {

            alert("网络不通畅，请稍后再试");

            //alert(jqXHR.responseText);
            //alert(jqXHR.status);
            //alert(jqXHR.readyState);
            //alert(jqXHR.statusText);
            //alert(textStatus);
            //alert(errorThrown);
        }
    };
    $.ajax(options);
}

function loadDescartes(callback) {
    $.sleep(1, null);
    //alert("传输时间： +1s");

    myChart = echarts.init($("#heatmap")[0], 'roma');
    var app = {};
    option = null;

    app.title = '笛卡尔坐标系上的热力图';

    //拿到Json对象中的数据
    var CreditRank = descartesData.CreditRank.concat();
    var Location = descartesData.Location.concat();
    var data = descartesData.data.concat();

    data = data.map(function (item) {
        return [item[1], item[0], item[2] || '-'];
    });

    option = {
        tooltip: {
            position: 'top',
        },
        animation: true,
        grid: {
            height: '100%',
            y: '3%'
        },
        xAxis: {
            type: 'category',
            data: CreditRank,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: Location,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
        },
        series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

    DescartesFlag = true;

    callback();
}

function intSearching() {
    $('.dropdown a').unbind();
    $(".dropdown a").click(function () {
        $(this).parent().parent().parent().find($(".wrapper-dropdown > a")).text($(this).text());
    });

    $('.wrapper-dropdown').unbind();
    $(".wrapper-dropdown").click(controlSearchingDropdown);

    $('#searching-window > section > section:first-child section > a').unbind();
    $('#searching-window > section > section:first-child section > a').click(controlSearchingSql);
}