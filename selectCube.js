'use strict';
let cubePosition = {first: 4, last: 14};// 默认魔方可选范围
const layoutWidth = 350; // 默认总宽度350
let curDiv, curUrl;
let rowStart, columnStart, rowEnd, columnEnd;
$(document).ready(() => {
    $('.popup-select-transparent').hide();
    let cubeList = [];
    drawCube(cubePosition.first);
    let cubeContentDiv = document.getElementsByClassName('select-cube-content')[0];
    for (let i = cubePosition.first; i <= cubePosition.last; i++) {
        cubeList.push(i);
        let cubeItemDiv = document.createElement('div');
        let cubeItemText;
        cubeItemDiv.setAttribute('class', 'select-cube-item');
        cubeItemText = i + 'x' + i;
        cubeItemDiv.innerText = cubeItemText;
        cubeContentDiv.appendChild(cubeItemDiv);
    }
    $('.select-cube-size').click((e) => {
        $('.select-cube-content').css('display') == 'none' ? $('.select-cube-content').css('display', 'block') : $('.select-cube-content').css('display', 'none');
    });
    $('.select-cube-item').click((e) => {
        $('.current-cube-text').text(e.currentTarget.innerText);
        let curSize = Number(e.currentTarget.innerText.split('x')[0]);
        drawCube(curSize);
    });

    function drawCube(cubeSize) {
        //动态创建魔方
        $('.cube-wrap').empty();
        $('.selected-rubik-cube').remove();
        let cubeWrapDiv = document.getElementsByClassName('cube-wrap')[0];
        let layoutDiv = document.getElementsByClassName('layout')[0];
        layoutDiv.style.width = layoutWidth + 'px';
        for (let i = 0; i < cubeSize; i++) {
            let ul = document.createElement('ul');
            for (let j = 0; j < cubeSize; j++) {
                let li = document.createElement('li');
                let liDiv = document.createElement('div');
                liDiv.innerText = '+';
                li.setAttribute('class', 'custom-rubik-cube');
                li.style.width = (layoutWidth / cubeSize) + 'px';
                li.style.height = (layoutWidth / cubeSize) + 'px';
                li.style.borderLeft = j === 0 ? '1px solid #e5e5e5' : '0';
                li.setAttribute('data-coordinates', (i + 1) + ':' + (j + 1));
                li.appendChild(liDiv);
                ul.appendChild(li);
            }
            cubeWrapDiv.appendChild(ul);
        }


        $(".layout li.custom-rubik-cube").click(function (e) {
            if ($("li.selected[data-start]").attr("data-start") && !$(this).hasClass("selected")) {
                // console.log("上次操作异常未结束");
                return;
            }
            if ($(this).hasClass("selected")) {
                //再次点击确定
                let width = $(".layout div:first").width() / cubeSize;
                let height = $(".layout div:first").height() / cubeSize;
                let position = $(".layout li.custom-rubik-cube.selected:not([data-finish]):first").position();
                //行列数量
                let ranksNumber = $(".layout li.custom-rubik-cube.selected[data-start]").attr("data-ranks-number");
                let rowCount = ranksNumber.split(":")[0];
                let columnCount = ranksNumber.split(":")[1];

                let divWidth = width * columnCount - 1; //宽度计算方式：单个方块的宽度*列数减去一边框
                let divHeight = height * rowCount - 1; //高度计算方式：单个方块的高度*行数减去一边框
                let paddingTop = (divHeight - 24) / 2; //文字居中计算方式
                divHeight -= paddingTop;

                let coverDiv = document.createElement('div');
                let coverDivAddIcon = document.createElement('div');
                coverDivAddIcon.setAttribute('class', 'selected-rubik-cube-content');
                coverDivAddIcon.innerText = 'ｘ';
                coverDiv.setAttribute('class', 'selected-rubik-cube');
                coverDiv.style.top = position.top + 'px';
                coverDiv.style.left = position.left + 'px';
                coverDiv.style.width = divWidth + 'px';
                coverDiv.style.height = (divHeight + paddingTop) + 'px';
                //coverDiv.style.paddingTop = paddingTop + 'px';
                //coverDiv.innerHTML = '<div>' + divWidth + 'x' + (divHeight + paddingTop) + '像素<br/>或同等比例</div>';
                coverDiv.innerHTML = '<div>' + Math.round(divWidth) + 'x' + Math.round(divHeight + paddingTop) + '</div>';
                coverDiv.appendChild(coverDivAddIcon);
                $(".layout").append(coverDiv);
                $(".layout li.custom-rubik-cube.selected").attr("data-finish", 1);
                $(".layout li.custom-rubik-cube.selected[data-start]").removeAttr("data-start");
                coverDiv.setAttribute('data-rowStart', rowStart);
                coverDiv.setAttribute('data-columnStart', columnStart);
                coverDiv.setAttribute('data-rowEnd', rowEnd);
                coverDiv.setAttribute('data-columnEnd', columnEnd);
                curDiv = coverDiv;
                console.log("删除选框开始位置：" + rowStart + ":" + columnStart + ",删除选框结束位置：" + rowEnd + "：" + columnEnd);
                $('.layout .selected-rubik-cube').hover((e) => {
                    if (e.currentTarget.children[1]) e.currentTarget.children[1].style.display = 'block';
                    let curIndex = Array.from($(e.currentTarget.parentNode).children(".selected-rubik-cube")).indexOf(e.currentTarget);
                    for (let i = 0; i < $('.selected-rubik-cube').length; i++) {
                        $('.selected-rubik-cube')[i].style.zIndex = curIndex === i ? '9' : '1';
                    }
                }, (e) => {
                    //e.target.children[1] ? e.target.children[1].style.display = 'none' : e.target.style.display = 'none';
                    // for (let i = 0; i < $('.selected-rubik-cube').length; i++) {
                    //     $('.selected-rubik-cube')[i].style.zIndex = '1';
                    // }
                    //
                    if (e.currentTarget.children[1]) e.currentTarget.children[1].style.display = 'none';
                });


                $('.selected-rubik-cube-content').click((e) => {
                    // document.getElementsByClassName('layout')[0].removeChild(e.target.parentNode);
                    let rowStarts = Number(e.target.parentNode.getAttribute('data-rowStart'));
                    let rowEnds = Number(e.target.parentNode.getAttribute('data-rowEnd'));
                    let columnStarts = Number(e.target.parentNode.getAttribute('data-columnStart'));
                    let columnEnds = Number(e.target.parentNode.getAttribute('data-columnEnd'));
                    rowStarts > rowEnds ? [rowStarts, rowEnds] = [rowEnds, rowStarts] : [rowStarts, rowEnds] = [rowStarts, rowEnds];
                    columnStarts > columnEnds ? [columnStarts, columnEnds] = [columnEnds, columnStarts] : [columnStarts, columnEnds] = [columnStarts, columnEnds];
                    $(e.target.parentNode).remove();
                    //遍历行
                    for (let for2RowStarts = rowStarts; for2RowStarts <= rowEnds; for2RowStarts++) {
                        //rowCount++;
                        //遍历列
                        for (let i = columnStarts; i <= columnEnds; i++) {
                            //当前行列坐标
                            let currentCoordinatess = for2RowStarts + ":" + i;
                            $(".layout li.custom-rubik-cube[data-coordinates='" + currentCoordinatess + "']").removeClass("selected").children("div").show();
                            $(".layout li.custom-rubik-cube[data-coordinates='" + currentCoordinatess + "']").removeAttr("data-finish");
                        }
                    }
                });

                $('.selected-rubik-cube').click((e) => {
                    let curIndex = Array.from($(e.currentTarget.parentNode).children(".selected-rubik-cube")).indexOf(e.currentTarget);
                    for (let i = 0; i < $('.selected-rubik-cube').length; i++) {
                        //red
                        $('.selected-rubik-cube')[i].style.border = curIndex === i ? '1px solid #0f36ff' : '1px solid #9aa4a8';
                        $('.selected-rubik-cube')[i].style.zIndex = curIndex === i ? '10' : '1';
                        if (curIndex === i) curDiv = $('.selected-rubik-cube')[i];
                    }
                });

            } else {
                //设置当前自定义模块的开始位置，并且设定好它可以如何选中
                $(this).addClass("selected").attr("data-start", $(this).index()).children("div").hide();
            }
        });


        $(".layout li.custom-rubik-cube").mousemove(function (e) {
            let coordinates = $(".layout li.custom-rubik-cube.selected[data-start]").attr("data-coordinates");
            $(".layout li.custom-rubik-cube[data-coordinates!='" + coordinates + "']:not([data-finish])").removeClass("selected").children("div").show();
            if (coordinates != undefined) {

                //开始行列
                rowStart = coordinates.split(":")[0];
                columnStart = coordinates.split(":")[1];
                //结束行列
                rowEnd = parseInt($(this).attr("data-coordinates").split(":")[0]);
                columnEnd = parseInt($(this).attr("data-coordinates").split(":")[1]);
                //如果开始行大于结束行，则开始行用结束行，结束行用开始行
                rowStart > rowEnd ? [rowStart, rowEnd] = [rowEnd, rowStart] : [rowStart, rowEnd] = [rowStart, rowEnd];
                //如果开始列大于结束列，则开始列用结束列，结束列用开始列
                columnStart > columnEnd ? [columnStart, columnEnd] = [columnEnd, columnStart] : [columnStart, columnEnd] = [columnStart, columnEnd];
                console.log("开始位置：" + rowStart + ":" + columnStart + ",结束位置：" + rowEnd + "：" + columnEnd);
                let rowCount = 0; //总行数
                let columnCount = []; //总列数
                let isAdd = true;
                //遍历行
                for (let forRowStart = rowStart; forRowStart <= rowEnd; forRowStart++) {
                    rowCount++;
                    //遍历列
                    for (let i = columnStart; i <= columnEnd; i++) {
                        //当前行列坐标
                        let currentCoordinates = forRowStart + ":" + i;
                        //检测当前的模块是否被占用，如果被占用，那么整个都不能选择
                        if ($(".layout li.custom-rubik-cube[data-coordinates='" + currentCoordinates + "']").attr("data-finish")) {
                            isAdd = false;
                            break;
                        }
                        if ($.inArray(i, columnCount) == -1) columnCount.push(i);
                        $(".layout li.custom-rubik-cube[data-coordinates='" + currentCoordinates + "']").addClass("selected").children("div").hide();
                    }
                }
                if (!isAdd) {
                    $(".layout li.custom-rubik-cube.selected:not([data-finish])").removeClass("selected").children("div").show();
                    $(".layout li.custom-rubik-cube[data-start]").addClass("selected").children("div").hide();
                }

                $(".layout li.custom-rubik-cube.selected[data-start]").attr("data-ranks-number", rowCount + ":" + columnCount.length);
            }
        });
    }

    // 选择图片暂不需要
    $('.select-pic-jump').click((e) => {
        showPopup();
    });
    $('.select-head-close').click((e) => {
        hidePopup();
    });
    $('.popup-select-content .ok').click((e) => {
        hidePopup();
        curDiv.style.background = "url(" + "'" + curUrl + "'" + ")"
    });
    $('.select-body .icon').click((e) => {
        let curIndex = Number(e.currentTarget.getAttribute('data-index'));
        let iconArr = $('.select-body .icon');
        for (let i = 0; i < iconArr.length; i++) {
            if (i === curIndex) {
                $($('.select-body .icon')[i]).css('border', '1px dashed red');
                curUrl = $($('.select-body .icon')[i]).css('background').split('url("')[1].split('")')[0];
            } else {
                $($('.select-body .icon')[i]).css('border', '1px dashed white');
            }
        }
    });

    function showPopup() {
        $('.popup-select-transparent').show();
        $('.popup-select-content').width('80%');
        $('.popup-select-content').height('70%');
        $('.select-body .icon').css('border', '1px solid white');
        $('.popup-select-content .ok').show();
    }

    function hidePopup() {
        $('.popup-select-content').width(0);
        $('.popup-select-content').height(0);
        $('.select-body .icon').height(0);
        $('.select-body .icon').width(0);
        $('.select-body .icon').css('border', 'none');
        setTimeout(() => {
            $('.popup-select-transparent').hide();
            $('.select-body .icon').height(80);
            $('.select-body .icon').width(80);
            $('.popup-select-content .ok').hide();s
        }, 150);
    }


});





