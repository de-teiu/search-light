import 'sanitize.css';
import './index.scss';
import $ from "jquery";

let isTurnOn = false;
$(()=> {
    $("body").on("mousedown",(event)=>{
        turnOn();
        updateLightPosition(event);
    })

    $("body").on("mouseup",() =>{
        turnOff();
    })

    $("body").on("mouseleave",() =>{
        turnOff();
    })

    $("body").on("mousemove",(event) =>{
        updateLightPosition(event);
    })

    
})

const turnOn = () => {
    $("#light").addClass("on");
    isTurnOn = true;
}

const turnOff = () => {
    $("#light").removeClass("on");
    isTurnOn = false;
}

const updateLightPosition = (event) => {
    if(!isTurnOn){
        return;
    }

    const cursor = {
        x: event.clientX,
        y: event.clientY
    }
    const light = {
        width: $("#light").width(),
        height: $("#light").height()
    }

    light.x = cursor.x - light.width/2
    light.y = cursor.y - light.height/2

    console.log(light);

    $("#wrapper-base-height-box").css("height",light.y);
    $("#wrapper-base-width-box").css("width",light.x);
}