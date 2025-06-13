const canvas = document.querySelector("#whiteboard");
const ctx = canvas.getContext("2d");

const penSlide = document.querySelector("#pen-width");
const inkColor = document.querySelectorAll(".color-swatch");
const penButton = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const pointerBtn = document.getElementById("pointer");
const highlighterBtn = document.getElementById("highlighter");
const trashBtn = document.getElementById("trash");


let isDrawing = false;
let penWidth = 3;
let selectedColor = "#000000";
let selectedTool = "pen";

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = penWidth;
    ctx.strokeStyle = selectedColor;
});

const startDraw = (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.lineWidth = penWidth;
    ctx.moveTo(e.offsetX, e.offsetY);
}

const drawing = (e) => {
    if (!isDrawing) return;

    if(selectedTool === "pen"){
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }else if(selectedTool === "eraser"){
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.stroke();
    }else if(selectedTool === "pointer"){
        isDrawing = false;
    }else if(selectedTool === "highlighter"){
         ctx.globalCompositeOperation = "multiply";
         ctx.lineTo(e.offsetX, e.offsetY);
         ctx.globalAlpha =0.13;
         ctx.strokeStyle = selectedColor;
         ctx.lineWidth = 25;
         ctx.stroke();
    }
}

trashBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

highlighterBtn.addEventListener("click", () => {
    isDrawing = false;
    selectedTool = "highlighter";
     ctx.globalCompositeOperation = "multiply";
     ctx.lineTo(e.offsetX, e.offsetY);
     ctx.globalAlpha =0.13;
     ctx.strokeStyle = selectedColor;
     ctx.lineWidth = 25;
});

pointerBtn.addEventListener("click", () => {
    isDrawing = false;
    selectedTool = "pointer";
})
eraserBtn.addEventListener("click", () => {
    isDrawing = false;
    selectedTool = "eraser";
    ctx.globalCompositeOperation = "destination-out";
});

penSlide.addEventListener("input", () => {
    penWidth = penSlide.value;
    ctx.lineWidth = penWidth;
});

inkColor.forEach((swatch) => {
    swatch.addEventListener("click", () => {
        inkColor.forEach((btn) => btn.classList.remove("selected-color"));
        swatch.classList.add("selected-color");
        selectedColor = swatch.dataset.color;
        ctx.strokeStyle = selectedColor;
    });
})

penButton.addEventListener("click", () =>{
    isDrawing = false;
    selectedTool = "pen";
    ctx.globalCompositeOperation = "source-over";
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () =>{
    isDrawing = false;
    ctx.closePath();
});