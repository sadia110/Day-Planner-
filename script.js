
var hourlyArray;
var currentTime = moment();
var currentDate = moment().format("dddd, MMMM Do");
var currentHour;
var textBlock = $(".col-8");
var plannerTask = $("textarea");
$.each(plannerTask, function () {
    this.value = "";
});


// SETTING UP LOCAL STORAGE 

if (localStorage.getItem("localHourlyTasks")) {
    hourlyArray = JSON.parse(localStorage.getItem("localHourlyTasks"));
} else {
    hourlyArray = [];
};

// CURRENT SCHEDULE 
function updateCurrentScheduleTime() {
    textBlock.removeClass('past present future');
    $.each(textBlock, function (scheduleBlockHour) {
        if (scheduleBlockHour < (currentTime.hour() - 8)) {
            $(this).addClass('past');
        } else if (scheduleBlockHour == (currentTime.hour() - 8)) {
            $(this).addClass('present');
        } else {
            $(this).addClass('future');
        }
    });
    currentHour = currentTime.hour()
}; 




// WRITE CURRENT TASK
function writeCurrentTasks() {
    $.each(hourlyArray, function (i) {
        if (hourlyArray[i]) {
            plannerTask[i].value = hourlyArray[i].task;
        };
    });
};


// UPDATE TIME 
setInterval(function () {
    currentTime = moment();
    if (currentHour < currentTime.hour()) {
        updateCurrentScheduleTime();
    } else if (currentHour > currentTime.hour()) {
        updateCurrentScheduleTime();
        $("#currentDay").text(`${currentTime.format('dddd, MMMM Do')}`);
    }
}, 1000);

// EVENT LISTENER  
updateCurrentScheduleTime();
writeCurrentTasks();
$("button").click(localStorage); 
 