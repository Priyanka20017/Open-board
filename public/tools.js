let optioncont = document.querySelector(".options-cont");
let optionsflag = true;
let penciltoolcont = document.querySelector(".pencil-tool");
let erasertoolcont = document.querySelector(".eraser-tool-cont");
let toolscont = document.querySelector(".tools-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let stickynotes = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

let pencilflag = true;
let eraserflag = true;

optioncont.addEventListener("click", function(e) {
    optionsflag = !optionsflag;
    if (optionsflag) {
        closeTool();
    } else openTool();
})

function openTool() {
    let iconElem = optioncont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolscont.style.display = "flex";
}

function closeTool() {
    let iconElem = optioncont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolscont.style.display = "none";

    penciltoolcont.style.display = "none";
    erasertoolcont.style.display = "none";
}
pencil.addEventListener("click", function(e) {
    pencilflag = !pencilflag;
    if (pencilflag)
        penciltoolcont.style.display = "flex";
    else penciltoolcont.style.display = "none";
})
eraser.addEventListener("click", function(e) {
    eraserflag = !eraserflag;
    if (eraserflag)
        erasertoolcont.style.display = "flex";
    else erasertoolcont.style.display = "none";
})
upload.addEventListener("click", function(e) {
    //open fileexplorer
    let input = document.createElement("input");

    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", function(e) {
        let files = input.files[0];
        let url = URL.createObjectURL(files);
        let stickyTemplateHTML = `<div class="header-cont">
        <div class="minimize"> </div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <img src="${url}"/>
        </div>`;
        createsticky(stickyTemplateHTML);
    })
})

function createsticky(stickyTemplateHTML) {
    let stickycont = document.createElement("div");
    stickycont.setAttribute("class", "sticky-cont");
    stickycont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickycont);
    let minimize = stickycont.querySelector(".minimize");
    let remove = stickycont.querySelector(".remove");
    stickynotesaction(minimize, remove, stickycont);
    //drag
    stickycont.onmousedown = function(event) {
        dragNdrop(stickycont, event);
    };
    stickycont.ondragstart = function() {
        return false;
    };
}

stickynotes.addEventListener("click", function(e) {
    let stickyTemplateHTML =
        `<div class="header-cont">
        <div class="minimize"> </div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <textarea spellcheck="false"></textarea>
        </div>`;
    createsticky(stickyTemplateHTML);
})

function stickynotesaction(minimize, remove, stickycont) {
    //console.log(minimize, remove, stickycont);

    remove.addEventListener("click", () => {
        console.log("remove");
        stickycont.remove();
    });

    minimize.addEventListener("click", function(e) {
        console.log("hi");
        let notecont = stickycont.querySelector(".note-cont");
        let display = getComputedStyle(notecont).getPropertyValue("display");
        if (display == "none")
            notecont.style.display = "block";

        else
            notecont.style.display = "none";
        console.log("hi")

    })
}

function dragNdrop(element, event) {
    //console.log("move");
    // (1) prepare to moving: make absolute and on top by z-index
    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    //document.body.append(ball);
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // (2) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}