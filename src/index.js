import 'sanitize.css';
import './index.scss';
import $ from "jquery";

let isTurnOn = false;
$(()=> {
    $("body").on("mousedown",(event)=>{
        turnOn();
        updateLightPosition(event);
    })
    $("body").on("touchstart",(event)=>{
        turnOn();
        updateLightPosition(event);
    })

    $("body").on("mouseup",() =>{
        turnOff();
    })
    $("body").on("touchend",()=>{
        turnOff();
    })

    $("body").on("mouseleave",() =>{
        turnOff();
    })

    $("body").on("mousemove",(event) =>{
        updateLightPosition(event);
    })
    $("body").on("touchmove",(event) =>{
        updateLightPosition(event);
    })

    
})

const turnOn = () => {
    $("#light").addClass("on");
    $("#light-space").addClass("on");
    isTurnOn = true;
}

const turnOff = () => {
    $("#light").removeClass("on");
    $("#light-space").removeClass("on");
    isTurnOn = false;
}

const updateLightPosition = (event) => {
    if(!event.touches && !isPCMode()){
        return;
    }
    
    if(!isTurnOn){
        return;
    }

    const light = {
        width: $("#light-space").width(),
        height: $("#light-space").height()
    }

    const position = isPCMode() ? event : event.touches[0];
    const cursor = {
        x:position.clientX
        ,y: position.clientY
    }
    
    light.x = Math.round(cursor.x - $(".light-wrapper").width()/2);
    light.y = Math.round(cursor.y - $(".light-wrapper").height()/2);

    $(".light-wrapper").css("left",light.x);
    $(".light-wrapper").css("top",light.y);
    
    $("#light").css("width",light.width);
    $("#light").css("height",light.height);
    $("#light").css("top",cursor.y - light.height/2);
    $("#light").css("left",cursor.x - light.width/2);
}
const isPCMode = () => {
    const ua = navigator.userAgent
    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
        return false;
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        return false;
    }

    return true;
}