/// <reference path="D:\Document\GitHub\CloudPlatformsforEnvironment\CloudPlatformsforEnvironment\services/DataService.asmx" />
/// <reference path="D:\Document\GitHub\CloudPlatformsforEnvironment\CloudPlatformsforEnvironment\services/DataService.asmx" />
/// <reference path="jquery-2.2.3.min.js" />

var DescartesFlag = false;
var myChart;

var currentState = 0;
var gpCurrent;

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

function controlDescartesCurrent() {
    var element = $(this);
    element.toggleClass('current');

    $('#popping-window > section section:nth-of-type(2) a').each(function (index) {
        if (index != $("#popping-window > section section:nth-of-type(2) a").index(element)) {
            $(this).removeClass('current');
        }
    });

    if ($("#popping-window > section").index($(this).parent().parent().parent()) == 0) {

        $("#popping-window > section:nth-of-type(1) > p").text($(this).attr("name"));

        $(" #popping-window > section:nth-child(1) > .loader").css('display', 'block');

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetPollutantDescartesData_01", "");
            }, 1000);
        })
    }
    else {
        $("#popping-window > section:nth-of-type(2) > p").text($(this).attr("name"));

        $(" #popping-window > section:nth-child(2) > .loader").css('display', 'block');

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetPollutantDescartesData_02", "");
            }, 1000);
        })
    }
}

function controlDescartesFieldCurrent() {

    if ($("#popping-window > section").index($(this).parent().parent().parent()) == 0) $("#popping-window > section:nth-of-type(1) > p").text($(this).attr("name"));
    else $("#popping-window > section:nth-of-type(2) > p").text($(this).attr("name"));
}

function controlGpFieldCurrent() {
    var element = $(this);
    element.toggleClass('current');

    $('#select-window > section > div:nth-of-type(1) ~ div > div').each(function (index) {
        if (index != $("#select-window > section > div:nth-of-type(1) ~ div > div").index(element.parent())) {
            $(this).children("a").removeClass('current');
        }
    });
}

function controlTopbar() {
    if ($(this).hasClass('current')) {

        $("#topbar-window > .loader").css('display', 'block');

        $('#topbar-window').css('top', '76px');

        if ($('#popping-window').css('bottom') == '72px') {
            $('#popping-window').css('bottom', '12px');
        }

        //myChart.clear();

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetProvinceDescartesData", "");
            }, 1000);
        })
    } else {

        myChart.clear();

        $('#topbar-window').css('top', '-80px');

        if ($('#popping-window').css('bottom') == '12px') {
            $('#popping-window').css('bottom', '72px');
        }

    }
}

function controlPopping() {
    if ($(this).hasClass('current')) {

        if ($('#topbar-window').css('top') == '-80px') {
            $('#popping-window').css('bottom', '72px');
        }
        else {
            $('#popping-window').css('bottom', '12px');
        }

        //$('#popping-window').css('opacity', '1');

        $(" #popping-window > section:nth-child(1) > .loader").css('display', 'block');

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetPollutantDescartesData_01", "");
            }, 1000);
        })

    } else {
        myChart.clear();

        $('#popping-window').css('bottom', '-540px');
        //$('#popping-window').css('opacity', '0');
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

function controlSearchingUl() {

    var element = $(this);
    element.toggleClass('current');

    $('#searching-window > section > section:last-child > ul li').each(function (index) {
        if (index != $("#searching-window > section > section:last-child > ul li").index(element)) {
            $(this).removeClass('current');
        }
    });
}

function controlDescartes() {
    if ($('.esri-view-width-xlarge .esri-popup .esri-popup-main > article > div > div > div > div:last-child div section > div').css("height") == "0px") {

        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article').css("border", "none");
        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article > div > div > div > div:last-child div section > div').css("border-top", "1px solid #85C79C")
        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article > div > div > div > div:last-child div section > div').css("height", "320px")
        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article').css("max-height", "720px");

        //myChart.clear();

        //$(function () {
        //    setTimeout(function () {
        //        $(".esri-popup-main section.descartesResult .loader").css('display', 'block');
        //    }, 1000);
        //});

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetEnterpriseDescartesData", $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article .EnterpriseId').text().toString());
            }, 1000);
        });

    }
    else {
        myChart.clear();

        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article').css("border-top", "1px dotted #85C79C");
        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article > div > div > div > div:last-child div section > div').css("border", "none")
        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article > div > div > div > div:last-child div section > div').css("height", "0px")
        $('.esri-view-width-xlarge .esri-popup .esri-popup-main > article').css("max-height", "120px");
    }
}

function contrlMouseDraw(element) {

    element.toggleClass('current');

    if (element.hasClass('current')) {
        $('#searching-window > section > section:last-child > a:nth-of-type(2)').css("background-color", "lightblue");
        $('#searching-window > section > section:last-child > a:nth-of-type(2)').css("border-left", "1px solid whitesmoke");
        $('#searching-window > section > section:last-child > a:nth-of-type(2)').css("color", "whitesmoke");

        return true;
    }
    else {
        $('#searching-window > section > section:last-child > a:nth-of-type(2)').css("background-color", "whitesmoke");
        $('#searching-window > section > section:last-child > a:nth-of-type(2)').css("color", "#85C79C");
        return false;
    }
}

function contrlRoute(element) {

    if (element[0].checked) {
        return true;
    }
    else {
        return false;
    }
}

function controlSelect(content) {

    //alert(content);

    if (content == "endGP") {
        $("#select-window").css("top", "-540px");
        $("#select-window").css("opacity", "0");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(2)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(3)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(4)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(5)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(6)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(7)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(8)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(9)").css("margin-top", "12px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(10)").css("margin-top", "12px");
    }
    else {
        $("#select-window").css("top", "120px");
        $("#select-window").css("opacity", "1");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(2)").css("margin-top", "60px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(3)").css("margin-top", "108px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(4)").css("margin-top", "156px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(5)").css("margin-top", "204px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(6)").css("margin-top", "252px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(7)").css("margin-top", "300px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(8)").css("margin-top", "348px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(9)").css("margin-top", "396px");
        $("#select-window > section > div:nth-of-type(1) ~ div > div:nth-of-type(10)").css("margin-top", "444px");
    }
}

function controlPoppingContent() {

    if (($(this).attr('ID') == "left")) {

        $("#popping-window article p").text("近五日-各污染物排放量-热力图");

        $("#popping-window > section:nth-child(2)").css("margin-left", "960px")
        $("#popping-window > section:nth-child(1").css("margin-left", "0px")

        $(" #popping-window > section:nth-child(1) > .loader").css('display', 'block');

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetPollutantDescartesData_01", "");
            }, 1000);
        })
    }
    else {

        $("#popping-window article p").text("近五日-污染物排放量总值-对比图");

        $("#popping-window > section:nth-child(1)").css("margin-left", "-960px")
        $("#popping-window > section:nth-child(2)").css("margin-left", "0px")

        $(" #popping-window > section:nth-child(2) > .loader").css('display', 'block');

        $(function () {
            setTimeout(function () {
                descartesRequire("../services/DataService.svc/GetPollutantDescartesData_02", "");
            }, 1000);
        })
    }
}

function startSearching() {

    var inputValue = $("#searching-window > section > section:first-child section:nth-of-type(1) > input").val();

    if (isNaN(inputValue)) {
        inputValue = "'" + inputValue + "'";
    }

    var queryField = $("#searching-window > section > section:first-child section:nth-of-type(1) > div:nth-of-type(1) > a").attr('name')
                    + $("#searching-window > section > section:first-child section:nth-of-type(1) > div:nth-of-type(2) > a").attr('name')
                    + inputValue;

    $("#searching-window > section > section:first-child section:nth-of-type(1) ~ section").each(function () {

        var inputValue = $(this).children("input").val();

        if (isNaN(inputValue)) {
            inputValue = "'" + inputValue + "'";
        }

        queryField += " " + $(this).children("a").attr('class') + " "
                     + $(this).find("div:nth-of-type(1) > a").attr('name')
                     + $(this).find("div:nth-of-type(2) > a").attr('name')
                     + inputValue;
    });

    return queryField;
}

function gpNameRequire(element) {
    //if (element[0].checked) {
    if (1 == 1) {
        $('#group-1 ~ section > div').each(function (index) {
            if (index != $("#group-1 ~ section > div").index(element.parent().parent().parent())) {
                $(this).children().find("input").each(function (index) {
                    $(this)[0].checked = false;
                });
            }
            else {
                $(this).find("div").each(function (index) {
                    if (index != $(this).parent().find("div").index(element.parent())) {
                        $(this).find("input").each(function (index) {
                            $(this)[0].checked = false;
                        });
                    }
                });
            }
        });

        //currentState = 111;
        if (element.attr('id') == "group-1-1-1") {
            if (currentState == 0) {
                currentState = 111;

                removeAllClass("");
                $('#timeline-window').css("bottom", "-36px");
                $('#timelineless-window').css("bottom", "-36px");

                //gpStart();

                //return 'IDWService';

                gpCurrent = 'IDWService';

                controlSelect(gpCurrent);
            }
            else if (currentState == 111) {
                currentState = 0;

                //return 'endGP';

                //gpStart();

                gpCurrent = 'endGP';

                controlSelect(gpCurrent);
            }
            else {
                currentState = 111;

                removeAllClass("");
                $('#timeline-window').css("bottom", "-36px");
                $('#timelineless-window').css("bottom", "-36px");

                //gpStart();

                //return 'IDWService';

                gpCurrent = 'IDWService';

                controlSelect(gpCurrent);
            }
        }

        else if (element.attr('id') == "group-1-1-2") {
            if (currentState == 0) {
                currentState = 112;

                removeAllClass("");
                $('#timeline-window').css("bottom", "-36px");
                $('#timelineless-window').css("bottom", "-36px");

                //return 'PointDensityService';

                gpCurrent = 'PointDensityService';

                controlSelect(gpCurrent);
            }
            else if (currentState == 112) {
                currentState = 0;

                //return 'endGP';

                gpCurrent = 'endGP';

                controlSelect(gpCurrent);
            }
            else {
                currentState = 112;

                removeAllClass("");
                $('#timeline-window').css("bottom", "-36px");
                $('#timelineless-window').css("bottom", "-36px");

                //return 'PointDensityService';

                gpCurrent = 'PointDensityService';

                controlSelect(gpCurrent);
            }
        }

        else if (element.attr('id') == "group-1-3-1") {
            if (currentState == 0) {

                removeAllClass("");
                $('#timeline-window').css("bottom", "36px");
                $('#timeline-window').addClass('historyDetection_IDW');

                currentState = 131;
            }
            else if (currentState == 131) {

                removeAllClass("");
                $('#timeline-window').css("bottom", "-36px");

                currentState = 0;
            }
            else {

                $('#timeline-window').css("bottom", "36px");
                $('#timelineless-window').css("bottom", "-36px");
                removeAllClass("");
                $('#timeline-window').addClass('historyDetection_IDW');
                currentState = 131;
            }
            //alert($('#timeline-window').prop('className'));
            return 'HistoryDetectionService';
        }

        else if (element.attr('id') == "group-1-3-2") {
            if (currentState == 0) {

                removeAllClass("");
                $('#timeline-window').css("bottom", "36px");
                $('#timeline-window').addClass('historyDetection_PD');
                currentState = 132;
            }
            else if (currentState == 132) {

                removeAllClass("");
                $('#timeline-window').css("bottom", "-36px");
                currentState = 0;
            }
            else {
                $('#timeline-window').css("bottom", "36px");
                $('#timelineless-window').css("bottom", "-36px");
                removeAllClass("");
                $('#timeline-window').addClass('historyDetection_PD');
                currentState = 132;
            }
            //alert($('#timeline-window').prop('className'));
            return 'HistoryDetectionService';
        }

        else if (element.attr('id') == "group-1-4-1") {

            if (currentState == 0) {

                removeAllClass("");
                $('#timelineless-window').css("bottom", "36px");
                $('#timelineless-window').addClass('changeDetection_IDW');
                currentState = 141;
            }
            else if (currentState == 141) {

                removeAllClass("");
                $('#timelineless-window').css("bottom", "-36px");
                currentState = 0;
            }
            else {

                $('#timelineless-window').css("bottom", "36px");
                $('#timeline-window').css("bottom", "-36px");
                removeAllClass("");

                $('#timelineless-window').addClass('changeDetection_IDW');
                currentState = 141;
            }

            //alert($('#timelineless-window').prop("className"));

            return 'ChangeDetectionService';
        }

        else if (element.attr('id') == "group-1-4-2") {

            if (currentState == 0) {

                removeAllClass("");
                $('#timelineless-window').css("bottom", "36px");
                $('#timelineless-window').addClass('changeDetection_PD');
                currentState = 142;
            }
            else if (currentState == 142) {

                removeAllClass("");
                $('#timelineless-window').css("bottom", "-36px");
                currentState = 0;
            }
            else {
                $('#timelineless-window').css("bottom", "36px");
                $('#timeline-window').css("bottom", "-36px");
                removeAllClass("");
                $('#timelineless-window').addClass('changeDetection_PD');
                currentState = 142;
            }
            //alert($('#timeline-window').prop('className'));
            return 'ChangeDetectionService';
        }

        ////else if (element.attr('id') == "group-2-2-1") {
        ////    $('#timeline-window').css("bottom", "-36px")
        ////    $('#timelineless-window').css("bottom", "-36px")
        ////    return 'NavigationService';
        ////}
    }
    else {
        $('#timeline-window').css("bottom", "-36px")
        $('#timelineless-window').css("bottom", "-36px")
        removeAllClass("");

        return 'ServiceRemove';
    }
}

function removeAllClass(idName) {
    if (idName == '') {
        $('#timeline-window').removeClass('historyDetection_PD');
        $('#timeline-window').removeClass('historyDetection_IDW');
        $('#timelineless-window').removeClass('changeDetection_PD');
        $('#timelineless-window').removeClass('changeDetection_IDW');
    }
    else if (idName == '#timeline-window') {
        $(idName).removeClass('historyDetection_PD');
        $(idName).removeClass('historyDetection_IDW');
    }
    else if (idName == '#timelineless-window') {
        $(idName).removeClass('changeDetection_PD');
        $(idName).removeClass('changeDetection_IDW');
    }
}

function gpFieldRequire() {

    var gpField;

    $("#select-window > section > div:nth-of-type(1) ~ div > div").each(function (index) {
        if ($(this).children("a").prop('className') == "current") {
            gpField = $(this).children("a").attr("name");
        }
    });

    return gpField;
}

function gpStart() {

    //$("#select-window").css("display", "block");

    //var groupCurrent;

    //$("#group-1-1 ~ section > div").each(function (index) {
    //    if ($(this).find("input").prop('className') == "current") {
    //        groupCurrent = $(this).find("input").attr('id');
    //    }
    //});

    return gpCurrent;
}

function removeClass(idName, className) {
    $(idName).removeClass(className);
}

function timeIndexRequire(elementOriginal) {
    var element = elementOriginal;

    if (!element.hasClass('current')) element.toggleClass('current');
    //alert($("#timeline-window div a").index($(this)));

    if (element.parent().parent().attr('id') == 'timeline-window') {
        $('#timeline-window div a').each(function (index) {
            if (index != $("#timeline-window div a").index(element)) {
                $(this).removeClass('current');
            }
        });

        //alert($("#timeline-window div a").index(element));

        return $("#timeline-window div a").index(element);
    }

    else if (element.parent().parent().attr('id') == 'timelineless-window') {
        $('#timelineless-window div a').each(function (index) {
            if (index != $("#timelineless-window div a").index(element)) {
                $(this).removeClass('current');
            }
        });

        //alert($("#timeline-window div a").index(element));

        return $("#timelineless-window div a").index(element);
    }
}

function enterpriseFieldsRequire(callback) {

    var fieldsDictionary = "[";
    var fieldsDictionaryOriginal = "[";
    var fieldsCount = 0;
    var currentCount = 0;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://localhost:6443/arcgis/rest/services/CloudPlatformsforEnvironment/CloudPlatformsforEnvironment/FeatureServer/0?f=pjson");
    xhr.send();
    xhr.onload = function () {
        var result = JSON.parse(xhr.responseText);
        var fields = result.fields;
        for (var i = 0; i < fields.length; i++) {
            fieldsDictionaryOriginal += "{" + "\"name\": " + "\"" + fields[i].name + "\"" + "," + "\"alias\": " + "\"" + fields[i].alias + "\"" + "}";
            if (i < fields.length - 1) {
                fieldsDictionaryOriginal += ",";
            }
        }
        fieldsDictionaryOriginal += "]";

        fieldsDictionaryOriginal = JSON.parse(fieldsDictionaryOriginal);

        for (i = 0; i < fieldsDictionaryOriginal.length; i++) {
            if (fieldsDictionaryOriginal[i].alias == "对象ID"
                || fieldsDictionaryOriginal[i].alias == "企业编号") {
                continue;
            }
            fieldsCount++;
        }

        for (i = 0; i < fieldsDictionaryOriginal.length; i++) {
            if (fieldsDictionaryOriginal[i].alias == "对象ID"
                || fieldsDictionaryOriginal[i].alias == "企业编号") {
                continue;
            }
            fieldsDictionary += "{" + "\"name\": " + "\"" + fieldsDictionaryOriginal[i].name + "\"" + "," + "\"alias\": " + "\"" + fieldsDictionaryOriginal[i].alias + "\"" + "}";

            currentCount++;

            if (currentCount < fieldsCount) {
                fieldsDictionary += ",";
            }
        }

        fieldsDictionary += "]";

        fieldsDictionary = JSON.parse(fieldsDictionary);

        if ($('#searching-window > section > section:first-child section').length == 2) {

            var random = parseInt(Math.random() * ((fieldsDictionary.length - 1) - 0 + 1) + 0);

            $('#searching-window > section > section:first-child section div:first-child > span').after("<a " + "name = \"" + fieldsDictionary[random].name + "\">" + fieldsDictionary[random].alias + "</a>");

            for (i = 0; i < fieldsDictionary.length; i++) {
                $('#searching-window > section > section:first-child section div:first-child > ul').append("<li><a " + "name = \"" + fieldsDictionary[i].name + "\">" + fieldsDictionary[i].alias + "</a></li>")
            }
        }
        else {

            var random = parseInt(Math.random() * ((fieldsDictionary.length - 1) - 0 + 1) + 0);

            $('#searching-window > section > section:first-child section:last-child div:first-child > span').after("<a " + "name = \"" + fieldsDictionary[random].name + "\">" + fieldsDictionary[random].alias + "</a>");

            for (i = 0; i < fieldsDictionary.length; i++) {
                $('#searching-window > section > section:first-child section:last-child div:first-child > ul').append("<li><a " + "name = \"" + fieldsDictionary[i].name + "\">" + fieldsDictionary[i].alias + "</a></li>")
            }
        }

        callback();
    };
}

function intSearching() {
    $('.dropdown a').unbind();
    $(".dropdown a").click(function () {
        $(this).parent().parent().parent().find($(".wrapper-dropdown > a")).remove();
        $(this).parent().parent().parent().find($(".wrapper-dropdown > span")).after("<a " + "name = \"" + $(this).attr('name') + "\">" + $(this).text() + "</a>");
    });

    $('.wrapper-dropdown').unbind();
    //$(".wrapper-dropdown").click(controlSearchingDropdown);
    $(".wrapper-dropdown").mouseenter(function () {
        $(this).toggleClass('active');
    });
    $(".wrapper-dropdown").mouseleave(function () {
        $(this).toggleClass('active');
    });

    $('#searching-window > section > section:first-child section > a').unbind();
    //$('#searching-window > section > section:first-child section > a').click(controlSearchingSql);
    $('#searching-window > section > section:first-child section > a').click(function () {
        $(this).toggleClass('or');
        $(this).toggleClass('and');
    });
}

function descartesRequire(url, data) {

    var options = {
        type: "POST",
        cache: false,
        //url: "Default.aspx/GetDescartesData",
        url: url,
        data: "{'content':'" + data + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            //alert(response.d);

            var descartesData = JSON.parse(response.d);

            loadDescartes(descartesData);
        },
        error: function (jqXHR, textStatus, errorThrown) {

            alert("网络不通畅，请稍后再试");
        }
    };
    $.ajax(options);
}

function loadDescartes(descartesData) {

    switch (descartesData.content.concat()[0]) {

        case "EnterpriseDescartes":

            myChart = echarts.init($(".esri-view-width-xlarge .esri-popup .esri-popup-main .descartes")[0], 'intMinor');
            var app = {};
            option = null;

            app.title = '五日污染物历史监测图表';

            //拿到Json对象中的数据
            var timeData = descartesData.timeData.reverse();
            var pollutionProp = descartesData.pollutionProp;
            var pollutionValue = [];

            for (var i = 0; i < descartesData.pollutionValue[0].length; i++) {
                pollutionValue[i] = [];
            }

            for (var i = 0; i < descartesData.pollutionValue.length; i++) {
                for (var j = 0; j < descartesData.pollutionValue[i].length; j++) {
                    pollutionValue[j][i] = descartesData.pollutionValue[i][j];
                }
            }

            var dataMax = 0;

            for (var i = 0; i < pollutionValue.length; i++) {
                for (var j = 0; j < pollutionValue[0].length; j++) {
                    if (dataMax < pollutionValue[i][j]) {
                        dataMax = pollutionValue[i][j];
                    }
                }
            }

            dataMax = 1.2 * dataMax;

            option = {
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    feature: {
                        dataView: { show: false, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: false },
                        saveAsImage: { show: false }
                    }
                },
                color: [
                    "#ffeead",
                    "#56ae8b",
                    "#85c79c",
                    "#91c9e8",
                    "#92cdcf",
                    "#ff6138",
                ],
                grid: {
                    //show: false,
                    left: '2%',
                    right: '2%',
                    top: '10%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: timeData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '24小时排放量 (kg/24h)',
                        min: 0,
                        max: dataMax,
                        interval: dataMax / 5.0,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                    //{
                    //    type: 'value',
                    //    name: '实时排放浓度',
                    //    min: 0,
                    //    max: 10,
                    //    interval: 1,
                    //    axisLabel: {
                    //        formatter: '{value} kg/h'
                    //    }
                    //}
                ],
                series: [
                    {
                        name: pollutionProp[0],
                        type: 'bar',
                        data: pollutionValue[0]
                    },
                    {
                        name: pollutionProp[1],
                        type: 'bar',
                        data: pollutionValue[1]
                    },
                    {
                        name: pollutionProp[2],
                        type: 'bar',
                        data: pollutionValue[2]
                    },
                    {
                        name: pollutionProp[3],
                        type: 'bar',
                        data: pollutionValue[3]
                    },
                    {
                        name: pollutionProp[4],
                        type: 'bar',
                        data: pollutionValue[4]
                    },
                    {
                        name: pollutionProp[5],
                        type: 'bar',
                        data: pollutionValue[5]
                    }
                ]
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            //$(".esri-popup-main section.descartesResult .loader").css('display', 'none');

            break;

        case "ProvinceDescartes":

            myChart = echarts.init($("#topbar-window .descartes")[0], 'intMinor');
            var app = {};
            option = null;

            app.title = '全省今日主要污染物一览';

            //拿到Json对象中的数据
            var pollutionProp = descartesData.pollutionProp;
            var pollutionValue = descartesData.pollutionValue;

            option = {
                //title: {
                //    text: '全省今日主要污染物一览',
                //},
                tooltip: {
                    //backgroundColor: 'rgba(245,245,245,1)',
                    //borderWidth: 2,
                    //borderColor: '#85C79C',
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    textStyle: {
                        color: 'whitesmoke',
                        fontFamily: 'PingFang SC'
                    }
                    //position: ['80%', '20%']
                },
                color: [
                    "#92cdcf"
                ],
                grid: {
                    //show: false,
                    left: '2%',
                    right: '2%',
                    top: '20%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: pollutionProp
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 12000,
                    interval: 4000,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name: '排放量 (kg/24h)',
                        type: 'bar',
                        barWidth: 24,
                        data: pollutionValue
                    }
                ]
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            $("#topbar-window > .loader").css('display', 'none');

            break;

        case "PollutantDescartes_01":

            myChart = echarts.init($("#popping-window > section:nth-child(1) .descartes")[0], 'intMinor');
            var app = {};
            option = null;

            app.title = '污染物排放量详细';

            //拿到Json对象中的数据
            var days = descartesData.timeData.reverse();
            var city = descartesData.cityData;
            var data = descartesData.pollutionValue;

            var dataMax = 0;

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[0].length; j++) {
                    if (dataMax < data[i][j]) {
                        dataMax = data[i][j];
                    }
                }
            }

            dataMax = 1.2 * dataMax;

            data = data.map(function (item) {
                return [item[1], item[0], item[2] || '-'];
            });

            option = {
                toolbox: {
                    feature: {
                        dataView: { show: false, readOnly: false },
                        magicType: { show: false, type: ['line', 'bar'] },
                        restore: { show: false },
                        saveAsImage: { show: false }
                    }
                },
                tooltip: {
                    position: 'top'
                },
                animation: false,
                grid: {
                    height: '50%',
                    y: '10%'
                },
                xAxis: {
                    type: 'category',
                    data: city,
                    splitArea: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: days,
                    splitArea: {
                        show: true
                    }
                },
                visualMap: {
                    min: 0,
                    max: dataMax,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '5%',
                    inRange: {
                        color: ["#91AA9D", "#193441", ]
                    }
                },
                series: [{
                    //name: 'Punch Card',
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

            $(" #popping-window > section:nth-child(1) > .loader").css('display', 'none');

            break;

        case "PollutantDescartes_02":

            myChart = echarts.init($("#popping-window > section:nth-child(2) .descartes")[0], 'intMinor');
            var app = {};
            option = null;

            app.title = '污染物排放量详细';

            //拿到Json对象中的数据
            var timeData = descartesData.timeData.reverse();
            var pollutionProp = descartesData.pollutionProp;

            var pollutionValue = [];

            for (var i = 0; i < descartesData.pollutionValue[0].length; i++) {
                pollutionValue[i] = [];
            }

            for (var i = 0; i < descartesData.pollutionValue.length; i++) {
                for (var j = 0; j < descartesData.pollutionValue[i].length; j++) {
                    pollutionValue[j][i] = descartesData.pollutionValue[i][j];
                }
            }

            var dataMax = 0;

            function sumArray(i) {
                var sum = 0;
                for (var j = 0; j < descartesData.pollutionValue[i].length; j++) {
                    sum += descartesData.pollutionValue[i][j];
                }
                return sum;
            }

            for (var i = 0; i < descartesData.pollutionValue.length; i++) {
                if (dataMax < sumArray(i)) {
                    dataMax = sumArray(i);
                }
            }

            dataMax = 1.2 * dataMax;

            //alert(dataMax);

            option = {
                toolbox: {
                    feature: {
                        dataView: { show: false, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: false },
                        saveAsImage: { show: false }
                    }
                },
                color: [
                    "#00968b",
                    "#56ae8b",
                    "#85c79c",
                    "#92cdcf",
                    "#91c9e8",
                    "#ffeead",
                    "#ff6f96",
                    "#ff6138"
                ],
                title: {
                    //text: '堆叠区域图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: timeData
                    }
                ],
                yAxis: [
                    {
                        name: '24小时排放量 (kg/24h)',
                        min: 0,
                        max: dataMax,
                        interval: dataMax / 5.0,
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: pollutionProp[0],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[0]
                    },
                    {
                        name: pollutionProp[1],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[1]
                    },
                    {
                        name: pollutionProp[2],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[2]
                    },
                    {
                        name: pollutionProp[3],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[3]
                    },
                    {
                        name: pollutionProp[4],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[4]
                    },
                    {
                        name: pollutionProp[5],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[5]
                    },
                    {
                        name: pollutionProp[6],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[6]
                    },
                    {
                        name: pollutionProp[7],
                        type: 'line',
                        stack: '总量（kg/24h）',
                        areaStyle: { normal: {} },
                        data: pollutionValue[7]
                    }
                ]
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            $(" #popping-window > section:nth-child(2) > .loader").css('display', 'none');

            break;

        default:
    }
}