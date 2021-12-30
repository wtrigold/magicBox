$(document).ready(() => {
    let enterPageX, enterPageY, dragType, isMouseleave = false;
    $('.react-drag').mouseenter((e) => {
        console.log("mouseEnter" + e.pageX + "," + e.pageY);
        enterPageX = e.pageX;
        enterPageY = e.pageY;
    });

    $('.react-drag').mousedown((e) => {
        let event = e;
        let downPageX, downPageY, preX, preY, left, top, width, height;
        left = (parseInt($(event.currentTarget).css('left')));
        top = (parseInt($(event.currentTarget).css('top')));
        width = (parseInt($(event.currentTarget).css('width')));
        height = (parseInt($(event.currentTarget).css('height')));


        const DRAG_MARGIN = 4;
        console.log(e.offsetX + "," + e.offsetY + "width:" + parseInt(event.currentTarget.style.width) + "height:" + parseInt(event.currentTarget.style.height));
        if (e.offsetX < DRAG_MARGIN) {
            dragType = 0;
            console.log('左边');
        }
        if (e.offsetY < DRAG_MARGIN) {

            dragType = 1;
            console.log('上边');
        }
        if (e.offsetX > (parseInt(event.currentTarget.style.width) - DRAG_MARGIN)) {

            dragType = 2;
            console.log('右边');
        }
        if (e.offsetY > (parseInt(event.currentTarget.style.height) - DRAG_MARGIN)) {

            dragType = 3;
            console.log('下边');
        }

        if (e.offsetX < DRAG_MARGIN * 3 && e.offsetY < DRAG_MARGIN * 3) {

            dragType = 4;
            console.log('左上角');
        }
        if (e.offsetY < DRAG_MARGIN * 3 && e.offsetX > (parseInt(event.currentTarget.style.width) - DRAG_MARGIN * 3)) {

            dragType = 5;
            console.log('右上角');
        }
        if (e.offsetX > (parseInt(event.currentTarget.style.width) - DRAG_MARGIN * 3) && e.offsetY > (parseInt(event.currentTarget.style.height) - DRAG_MARGIN * 3)) {

            dragType = 6;
            console.log('右下角');
        }
        if (e.offsetX < DRAG_MARGIN * 3 && e.offsetY > (parseInt(event.currentTarget.style.height) - DRAG_MARGIN * 3)) {

            dragType = 7;
            console.log('左下角');
        }

        if (e.offsetX > DRAG_MARGIN * 3 && e.offsetX < (parseInt(event.currentTarget.style.width) - DRAG_MARGIN * 3) && e.offsetY > DRAG_MARGIN * 3 && e.offsetY < (parseInt(event.currentTarget.style.height) - DRAG_MARGIN * 3)) {

            dragType = 8;
            console.log('中间');
        }


        $('.drawHotAreaContent').mousedown((e) => {
            console.log(event.offsetX + "," + (parseInt(event.currentTarget.style.width) - e.offsetX) + "," + event.offsetY + "," + (parseInt(event.currentTarget.style.height) - event.offsetY));
            console.log("down" + e.pageX + "," + e.pageY);
            downPageX = e.pageX;
            downPageY = e.pageY;
            var transform = event.currentTarget.style.transform;
            preX = parseFloat(transform.split("translateX(")[1].split("px)")[0]);
            preY = parseFloat(transform.split("translateY(")[1].split("px)")[0]);

        })
        $('.drawHotAreaContent').mousemove((e) => {

            let distanceX = e.pageX - downPageX + preX;
            let distanceY = e.pageY - downPageY + preY;
            let X = e.pageX - downPageX;
            let Y = e.pageY - downPageY;
            document.getElementsByClassName('react-drag')[0].style.transform = "translate3d(10,10,0)";
            if (distanceX < -left) distanceX = -left;
            if (distanceX > ((parseInt($(e.currentTarget).css('width'))) - (parseInt($(event.currentTarget).css('width'))) - left)) distanceX = (parseInt($(e.currentTarget).css('width'))) - (parseInt($(event.currentTarget).css('width'))) - left;
            if (distanceY < -top) distanceY = -top;
            if (distanceY > ((parseInt($(e.currentTarget).css('height'))) - (parseInt($(event.currentTarget).css('height'))) - top)) distanceY = (parseInt($(e.currentTarget).css('height'))) - (parseInt($(event.currentTarget).css('height'))) - top - 4;
            switch (dragType) {
                case 0:
                    //左
                    if (distanceX > (width + preX)) distanceX = width + preX;
                    event.currentTarget.style.transform = "translateX(" + distanceX + "px) translateY(" + preY + "px)";
                    event.currentTarget.style.width = (width + (-X)) + "px";
                    console.log("distanceX:" + distanceX + "    ,offsetX:" + event.offsetX);
                    break;
                case 1:
                    //上
                    if (distanceY > (height + preY)) distanceY = height + preY;
                    event.currentTarget.style.transform = "translateX(" + preX + "px) translateY(" + distanceY + "px)";
                    event.currentTarget.style.height = (height + (-Y)) + "px";
                    break;
                case 2:
                    //右
                    event.currentTarget.style.width = (width + X) + "px";
                    break;
                case 3:
                    //下
                    event.currentTarget.style.height = (height + Y) + "px";
                    break;
                case 4:
                    //左上
                    event.currentTarget.style.transform = "translateX(" + distanceX + "px) translateY(" + distanceY + "px)";
                    event.currentTarget.style.width = (width + (-X)) + "px";
                    event.currentTarget.style.height = (height + (-Y)) + "px";
                    break;
                case 5:
                    //右上
                    event.currentTarget.style.transform = "translateX(" + preX + "px) translateY(" + distanceY + "px)";
                    event.currentTarget.style.width = (width + X) + "px";
                    event.currentTarget.style.height = (height + (-Y)) + "px";
                    break;
                case 6:
                    //右下
                    event.currentTarget.style.width = (width + X) + "px";
                    event.currentTarget.style.height = (height + Y) + "px";
                    break;
                case 7:
                    //左下
                    event.currentTarget.style.transform = "translateX(" + distanceX + "px) translateY(" + preY + "px)";
                    event.currentTarget.style.width = (width + (-X)) + "px";
                    event.currentTarget.style.height = (height + Y) + "px";
                    break;
                case 8:
                    //中
                    event.currentTarget.style.transform = "translateX(" + distanceX + "px) translateY(" + distanceY + "px)";
                    break;
            }
            //console.log("DISTANCE" + distanceX + "," + distanceY + "," + X + "," + Y);
            // requestAnimationFrame(animationDrag);

        })
        $('.drawHotAreaContent').mouseup((e) => {
            console.log("up" + e.pageX + "," + e.pageY);
        })

        // $('.drawHotAreaContent').mouseleave((e)=>{
        //
        //     $('.drawHotAreaContent').unbind('mousemove');
        //
        // })
    });

    $('.react-drag').mousemove((e) => {
        const DRAG_MARGIN = 4;
        //console.log(e.offsetX + "," + e.offsetY + "width:" + parseInt(event.currentTarget.style.width) + "height:" + parseInt(event.currentTarget.style.height));
        if (e.offsetX < DRAG_MARGIN) {
            e.currentTarget.style.cursor = "col-resize";

            console.log('左边');
        }
        if (e.offsetY < DRAG_MARGIN) {
            e.currentTarget.style.cursor = "row-resize";

            console.log('上边');
        }
        if (e.offsetX > (parseInt(event.currentTarget.style.width) - DRAG_MARGIN)) {
            e.currentTarget.style.cursor = "col-resize";

            console.log('右边');
        }
        if (e.offsetY > (parseInt(event.currentTarget.style.height) - DRAG_MARGIN)) {
            e.currentTarget.style.cursor = "row-resize";

            console.log('下边');
        }

        if (e.offsetX < DRAG_MARGIN * 3 && e.offsetY < DRAG_MARGIN * 3) {
            e.currentTarget.style.cursor = "nwse-resize";

            console.log('左上角');
        }
        if (e.offsetY < DRAG_MARGIN * 3 && e.offsetX > (parseInt(event.currentTarget.style.width) - DRAG_MARGIN * 3)) {
            e.currentTarget.style.cursor = "nesw-resize";

            console.log('右上角');
        }
        if (e.offsetX > (parseInt(event.currentTarget.style.width) - DRAG_MARGIN * 3) && e.offsetY > (parseInt(event.currentTarget.style.height) - DRAG_MARGIN * 3)) {
            e.currentTarget.style.cursor = "nwse-resize";

            console.log('右下角');
        }
        if (e.offsetX < DRAG_MARGIN * 3 && e.offsetY > (parseInt(event.currentTarget.style.height) - DRAG_MARGIN * 3)) {
            e.currentTarget.style.cursor = "nesw-resize";

            console.log('左下角');
        }

        if (e.offsetX > DRAG_MARGIN * 3 && e.offsetX < (parseInt(event.currentTarget.style.width) - DRAG_MARGIN * 3) && e.offsetY > DRAG_MARGIN * 3 && e.offsetY < (parseInt(event.currentTarget.style.height) - DRAG_MARGIN * 3)) {
            e.currentTarget.style.cursor = "move";

            console.log('中间');
        }

    });

    $('.react-drag').mouseup((e) => {
        console.log('up');
        $('.drawHotAreaContent').unbind('mousedown');
        $('.drawHotAreaContent').unbind('mousemove');
        $('.drawHotAreaContent').unbind('moveup');
    });
    $('.react-drag').mouseleave((e) => {

        //console.log('up');

    });
    $('.react-drag').hover(()=>{
        $('.drag-close').css('display','block');
    },()=>{
        $('.drag-close').css('display','none');
    });



})
