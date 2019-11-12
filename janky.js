window.addEventListener("load", function() {
    var elems = document.querySelectorAll(".janky_countdown");
    for(var i = 0; i < elems.length; i++) {
        elems[i].innerHTML = "";
        color = elems[i].getAttribute("bgcolor");
        var thehtml = "";
        thehtml += janky_createElement("days","Days",color);
        thehtml += janky_createElement("hours","Hours",color);
        thehtml += janky_createElement("minutes","Minutes",color);
        thehtml += janky_createElement("seconds","Seconds",color);
        elems[i].innerHTML = thehtml;
    }
    janky_startCounter();
});

function janky_createElement(cls, label, color) {
    return "<div class='janky_wrapper'><h2 style='background-color:"+color+"' class='janky_number "+cls+"'>xx</h2><p class='janky_label'>"+label+"</p></div>";
}

function janky_getRemainingTime(now,then) {
    var delta = then - now;
    if(delta < 0)
        delta = 0;
    var elements = {
        "days":0,
        "hours":0,
        "minutes":0,
        "seconds":0
    }

    elements.days = Math.floor(delta/(60*60*24));
    delta -= elements.days*60*60*24;
    elements.hours = Math.floor(delta/(60*60));
    delta -= elements.hours*60*60;
    elements.minutes = Math.floor(delta/(60));
    delta -= elements.minutes * 60;
    elements.seconds = Math.floor(delta);
    return elements;
}

function janky_update() {
    var elems = document.querySelectorAll(".janky_countdown");
    for(var i = 0; i < elems.length; i++) {
        var time = parseInt(elems[i].getAttribute("endtime"));
        var now = (new Date()).getTime()/1000;
        var remaining = janky_getRemainingTime(now,time);
        var keys = Object.keys(remaining);
        for(var k = 0; k < keys.length; k++) {
            elems[i].querySelector("."+keys[k]).innerHTML = remaining[keys[k]];
        }
    }
}

function janky_startCounter() {
    janky_update();
    setInterval(janky_update,1000);
}