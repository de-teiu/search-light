import 'sanitize.css';
import './index.scss';
import $ from "jquery";

let isTurnOn = false;
/**
 * 初期化処理
 */
$(() => {
    //PCからのアクセスかどうか判定
    const isPC = isPCMode();
    //画面長押し開始でライト点灯
    $("body").on("mousedown touchstart", (event) => {
        turnOn();
        updateLightPosition(event, isPC);
    });
    //ドラッグしたらライトの位置を更新
    $("body").on("mousemove touchmove", (event) => {
        updateLightPosition(event, isPC);
    });
    //画面長押し終了でライト消灯
    $("body").on("mouseup touchend mouseleave", () => {
        turnOff();
    });

    //スクロール禁止
    document.addEventListener('touchmove', function(event){
        event.preventDefault();
    }, { passive: false });
})

/**
 * ライト点灯
 */
const turnOn = () => {
    $("#light, #light-space, #light-wrapper").addClass("on");
    isTurnOn = true;
}

/**
 * ライト消灯
 */
const turnOff = () => {
    $("#light, #light-space, #light-wrapper").removeClass("on");
    $("#light-wrapper").removeAttr("style");
    isTurnOn = false;
}

/**
 * ライトの位置更新
 * @param {}} event ユーザー操作イベントオブジェクト
 * @param {*} isPC PCからのアクセスかどうか
 */
const updateLightPosition = (event, isPC) => {
    if (!event.touches && !isPC) {
        return;
    }

    if (!isTurnOn) {
        return;
    }

    const light = {
        width: $("#light-space").width(),
        height: $("#light-space").height()
    }
    //ドラッグ中のカーソルの位置を取得
    const position = isPC ? event : event.touches[0];
    const cursor = {
        x: position.clientX,
        y: position.clientY
    }
    //ライトの大きさを決定
    light.x = Math.round(cursor.x - $("#light-wrapper").width() / 2);
    light.y = Math.round(cursor.y - $("#light-wrapper").height() / 2);
    $("#light").css("width", light.width + 10);
    $("#light").css("height", light.height + 10);

    //暗闇とライトの位置を更新
    $("#light-wrapper").css("left", light.x);
    $("#light-wrapper").css("top", light.y);
    $("#light").css("top", cursor.y - light.height / 2 - 5);
    $("#light").css("left", cursor.x - light.width / 2 - 5);
}

/**
 * PCからのアクセスかどうかを判断
 */
const isPCMode = () => {
    const ua = navigator.userAgent
    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
        return false;
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        return false;
    }

    return true;
}