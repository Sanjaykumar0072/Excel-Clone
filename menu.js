let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let leftAlign = document.querySelector(".align-left");
let centerAlign = document.querySelector(".align-center");
let rightAlign = document.querySelector(".align-right");
let family = document.querySelector(".fontFamily");
let size = document.querySelector(".fontSize");

bold.addEventListener("click",function(){
    setFontStyle("bold",bold);
})

italic.addEventListener("click",function(){
    setFontStyle("italic",italic);
})

underline.addEventListener("click",function(){
    setFontStyle("underline",underline);
})

function setFontStyle(styleName,element){
    if(lastSelectedCell){
        let {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        if(cellObject.fontStyle[styleName]){
            if(styleName == "bold"){
                lastSelectedCell.style.fontWeight = "normal";
            }else if(styleName == "italic"){
                lastSelectedCell.style.fontStyle = "normal";
            }else{
                lastSelectedCell.style.textDecoration = "none";
            }
            element.classList.remove("active-font-style");
        }else{
            if(styleName == "bold"){
                lastSelectedCell.style.fontWeight = "bold";
            }else if(styleName == "italic"){
                lastSelectedCell.style.fontStyle = "italic";
            }else{
                lastSelectedCell.style.textDecoration = "underline";
            }
            element.classList.add("active-font-style");
        }
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName]
    }
}

//////////Align Items//////////////////////////////////

leftAlign.addEventListener("click",function(){
    setAlignStyle("leftAlign",leftAlign);
})

rightAlign.addEventListener("click",function(){
    setAlignStyle("rightAlign",rightAlign);
})

centerAlign.addEventListener("click",function(){
    setAlignStyle("centerAlign",centerAlign);
})

function setAlignStyle(alignName,element){
    if(lastSelectedCell){
        let {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId]
        if(cellObject.alignStyle[alignName]){
            if(alignName == "leftAlign"){
                lastSelectedCell.style.textAlign = "normal";
            }else if(alignName == "centerAlign"){
                lastSelectedCell.style.textAlign = "noraml";
            }else{
                lastSelectedCell.style.textAlign = "normal";
            }
            element.classList.remove("active-align-style");
        }else{
            if(alignName == "leftAlign"){
                lastSelectedCell.style.textAlign = "left";
            }else if(alignName == "centerAlign"){
                lastSelectedCell.style.textAlign = "center";
            }else{
                lastSelectedCell.style.textAlign = "right";
            }
            element.classList.add("active-align-style");
        }
        cellObject.alignStyle[alignName] = !cellObject.alignStyle[alignName]
    }
}

//////////////font family//////////////////////

family.addEventListener('change', function() {
    let io = family.value;
    if(lastSelectedCell){
        lastSelectedCell.style.fontFamily = io;
    }
});

////////////////////font size//////////////////////
size.addEventListener("change",function(){
    let sz=size.value;
    if(lastSelectedCell){
        lastSelectedCell.style.fontSize=sz+"px";
    }
})
