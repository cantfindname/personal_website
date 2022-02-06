const time_el = document.querySelector('.watch .time');
const start_btn = document.getElementById('start');
const stop_btn = document.getElementById('stop');
const reset_btn = document.getElementById('reset');

let seconds = 0;
let interval = null;


const colorSwitch = document.getElementById('input-color-switch');


window.addEventListener('load', ()=>{
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    // const timeInput = document.querySelector('#new-time-input');
    const descInput = document.querySelector('#new-task-desc');
    const list_el = document.querySelector('#tasks');

    // timer
    start_btn.addEventListener('click', start);
    stop_btn.addEventListener('click', _stop);
    reset_btn.addEventListener('click', reset);


    // dark mode toggle
    colorSwitch.addEventListener('click', checkMode);

    // taskLists
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const task = input.value;
        // const time = timeInput.value;
        const desc = descInput.value;

        if (!task){
            alert("Please fill out the task");
            return;
        }
        // if (!time) {
        //     alert("Please fill in the time");
        //     return;
        // }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value= task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("button");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        const task_desc_el = document.createElement("div");
        task_desc_el.classList.add("content");
        task_el.appendChild(task_desc_el);

        const task_desc_text = document.createElement("input");
        task_desc_text.classList.add("text");
        task_desc_text.type = "text";
        task_desc_text.value = desc;
        task_input_el.setAttribute("readonly", "readonly");
        task_desc_el.appendChild(task_desc_text);

        list_el.appendChild(task_el);
        
        input.value = "";

        task_edit_el.addEventListener('click', ()=>{
            if (task_edit_el.innerText.toLowerCase() == "edit"){
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            }
            else{
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', ()=>{
            list_el.removeChild(task_el);
        });
    })
})


function timer(){
    seconds++;

    let hrs = Math.floor(seconds /3600);
    let mins = Math.floor((seconds - (hrs*3600))/ 60);
    let secs = seconds % 60;

    if (secs < 10){
        secs = '0' + secs;
    }

    if (mins < 10){
        mins = '0' + mins;
    }
    if (hrs < 10){
        hrs = '0' + hrs;
    }

    time_el.innerText = `${hrs}:${mins}:${secs}`;
}

function start() {
    if (interval){
        return
    }
    interval = setInterval(timer, 1000);

}

function reset(){
    _stop();
    seconds = 0;
    time_el.innerText = '00:00:00';
}

function _stop(){
    clearInterval(interval);
    interval= null;
}

function checkMode(){
    if (colorSwitch.checked){
        lightModeOn();

    }
    else{
        lightModeOff();

    }
}

function lightModeOn(){
    document.body.classList.add("light-mode");
}

function lightModeOff(){
    document.body.classList.remove("light-mode");
}
