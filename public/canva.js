 //this lines gives us tool to draw on canvas
 let canvasboard = document.querySelector("canvas");
 //this gives us tool to draw on canvas
 let tool = canvasboard.getContext("2d");
 let body = document.querySelector("body");

 //default height width 
 canvasboard.height = window.innerHeight;
 canvasboard.width = window.innerWidth;

 //
 let options = document.querySelector(".pencil-width-cont");
 let pen = document.querySelector(".pencil");
 let pencilwidthelement = document.querySelector(".pencil-width");
 let penwidth = pencilwidthelement.value;
 let penColor = "black";
 let eraserwidthelement = document.querySelector(".eraser-width");
 let eraserwidth = eraserwidthelement;
 let erasercolor = "white";
 let download = document.querySelector(".download");

 let undoredoTracker = []; //data
 let track = 0; //represent which action from tracker 
 let undo = document.querySelector(".undo");
 let redo = document.querySelector(".redo");

 let ctool = pen;

 //
 let ix, iy, fx, fy;
 let drawingmode = false;
 //canvas top point kitna niche hai
 let boardTop = canvasboard.getBoundingClientRect().top;
 //canvas left pe kitna aage hai
 let boardLeft = canvasboard.getBoundingClientRect().left;

 /*canvasboard.addEventListener("mousedown", (e) => {
 mousedown = true;
 let data = {
         x: e.clientX,
         y: e.clientY
     }
     // Send data to server
     //socket.emit("beginPath", data);
 });*/



 canvasboard.addEventListener("mousedown", function(e) {
     drawingmode = true;
     ix = e.clientX + boardLeft;
     iy = e.clientY - boardTop;
     tool.beginPath();
     tool.moveTo(ix, iy);
 })

 canvasboard.addEventListener("mouseup", function(e) {
     drawingmode = false;
     fx = e.clientX + boardLeft;
     fy = e.clientY - boardTop;
     let height = fy - iy;
     let width = fx - ix;

     //undoRedo
     let url = canvasboard.toDataURL();
     undoredoTracker.push(url);
     track = undoredoTracker.length - 1;
 })
 undo.addEventListener("click", (e) => {
     if (track > 0) track--;
     // Track action
     let data = {
         trackValue: track,
         undoredoTracker
     }
     undoRedoCanvas(data);
     //socket.emit("redoUndo", data);
 });
 redo.addEventListener("click", (e) => {
     if (track < undoredoTracker.length - 1) track++;
     // Track action
     let data = {
         trackValue: track,
         undoredoTracker
     }
     undoRedoCanvas(data);
     //socket.emit("redoUndo", data);
 });

 function undoRedoCanvas(trackObj) {
     track = trackObj.trackValue;
     undoredoTracker = trackObj.undoredoTracker;

     let url = undoredoTracker[track];
     let img = new Image(); // New image referance element

     img.src = url;
     img.onload = (e) => {
         tool.clearRect(0, 0, canvasboard.width, canvasboard.height);
         tool.drawImage(img, 0, 0, canvasboard.width, canvasboard.height);
     }
 }

 canvasboard.addEventListener("mousemove", function(e) {
         if (drawingmode == false) {
             return;
         }
         fx = e.clientX - boardLeft;
         fy = e.clientY - boardTop;
         tool.beginPath();
         tool.moveTo(ix, iy);
         tool.lineTo(fx, fy);
         tool.stroke();
         ix = fx;
         iy = fy;
         color: eraserFlag ? erasercolor : pen;
         width: eraserFlag ? eraserwidth : pen;

     })
     //color change
 let redcolor = document.querySelector(".red");
 let bluecolor = document.querySelector(".blue");
 let greencolor = document.querySelector(".green");

 redcolor.addEventListener("click", function() {
     tool.strokeStyle = "red";
 })
 bluecolor.addEventListener("click", function() {
     tool.strokeStyle = "blue";
 })
 greencolor.addEventListener("click", function() {
     tool.strokeStyle = "green";
 })

 pen.addEventListener("click", function(e) {
     if (ctool == "pen") {
         options.style.display = "flex";

     } else {
         for (let i = 0; i < options.length; i++) {
             options[i].style.display = "none";
         }
         ctool = "pen";
         tool.strokeStyle = "black";

     }
 })
 let eraserFlag = true;
 eraser.addEventListener("click", function(e) {
     if (ctool == "eraser") {
         options.style.display = "flex";
     } else {
         for (let i = 0; i < options.length; i++) {
             options[i].style.display = "none";
         }
         ctool = "eraser";
         tool.strokeStyle = "white";
         tool.lineWidth = eraserwidth;
     }
 })

 //width-setting
 pencilwidthelement.addEventListener("change", function() {
     penwidth = pencilwidthelement.value;
     tool.lineWidth = penwidth;
 })
 eraserwidthelement.addEventListener("change", function() {
     eraserwidth = eraserwidthelement.value;
     tool.lineWidth = eraserwidth;
 })
 download.addEventListener("click", function(e) {
     let url = canvasboard.toDataURL();
     let a = document.createElement("a");
     a.href = url;
     a.download = "board.jpg";
     a.click();
 })



 /*function undoredoCanvas(canvas, ctx, pop, push) {
     if (pop.length) {
         this.saveState(canvas, push, true);
         var restore_state = pop.pop();
         var img = new Element('img', { 'src': restore_state });
         img.onload = function() {
             ctx.clearRect(0, 0, 600, 400);
             ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);
         }
     }
 }
 (function($) {
     var tool;
     var canvas = $('paint');
     var ctx = canvas.getContext('2d');

     var history = {
         redo_list: [],
         undo_list: [],
         saveState: function(canvas, list, keep_redo) {
             keep_redo = keep_redo || false;
             if (!keep_redo) {
                 this.redo_list = [];
             }

             (list || this.undo_list).push(canvas.toDataURL());
         },
         undo: function(canvas, ctx) {
             this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
         },
         redo: function(canvas, ctx) {
             this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
         },
         restoreState: function(canvas, ctx, pop, push) {
             if (pop.length) {
                 this.saveState(canvas, push, true);
                 var restore_state = pop.pop();
                 var img = new Element('img', { 'src': restore_state });
                 img.onload = function() {
                     ctx.clearRect(0, 0, 600, 400);
                     ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);
                 }
             }
         }
     }

     var pencil = {
         options: {
             stroke_color: ['00', '00', '00'],
             dim: 4
         },
         init: function(canvas, ctx) {
             this.canvas = canvas;
             this.canvas_coords = this.canvas.getCoordinates();
             this.ctx = ctx;
             this.ctx.strokeColor = this.options.stroke_color;
             this.drawing = false;
             this.addCanvasEvents();
         },
         addCanvasEvents: function() {
             this.canvas.addEvent('mousedown', this.start.bind(this));
             this.canvas.addEvent('mousemove', this.stroke.bind(this));
             this.canvas.addEvent('mouseup', this.stop.bind(this));
             this.canvas.addEvent('mouseout', this.stop.bind(this));
         },
         start: function(evt) {
             var x = evt.page.x - this.canvas_coords.left;
             var y = evt.page.y - this.canvas_coords.top;
             this.ctx.beginPath();
             this.ctx.moveTo(x, y);
             history.saveState(this.canvas);
             this.drawing = true;
         },
         stroke: function(evt) {
             if (this.drawing) {
                 var x = evt.page.x - this.canvas_coords.left;
                 var y = evt.page.y - this.canvas_coords.top;
                 this.ctx.lineTo(x, y);
                 this.ctx.stroke();

             }
         },
         stop: function(evt) {
             if (this.drawing) this.drawing = false;
         }
     };

     $('pencil').addEvent('click', function() {
         pencil.init(canvas, ctx);
     });

     $('undo').addEvent('click', function() {
         history.undo(canvas, ctx);
     });

     $('redo').addEvent('click', function() {
         history.redo(canvas, ctx);
     });


 })(document.id) */