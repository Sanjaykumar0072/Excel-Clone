let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;
let leftcolcells = document.querySelectorAll(".left-col-cell");
let toprowcells = document.querySelectorAll(".top-row-cell");
let lasttopcell;
let lastleftcell;
//Excel-Clone is created
cellsContentDiv.addEventListener("scroll",function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    topRow.style.top = top+"px";
    topLeftCell.style.top = top+"px";
    topLeftCell.style.left = left+"px";
    leftCol.style.left = left+"px";
})

let rowId;
let colId;
//creating the address value like------B1,C2,A5...
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(e){
        //console.log(e.target);
        if(lastSelectedCell){
            lastSelectedCell.classList.remove("active-cell");
            document.querySelector(`div[trid="${colId}"]`).classList.remove("cell-selected");
            document.querySelector(`div[lcid="${rowId}"]`).classList.remove("cell-selected");
        }
        rowId = Number(e.target.getAttribute("rowid"));
        colId = Number(e.target.getAttribute("colid"));
        // console.log(rowId+" "+colId);

        e.target.classList.add("active-cell");
        document.querySelector(`div[trid="${colId}"]`).classList.add("cell-selected");
        document.querySelector(`div[lcid="${rowId}"]`).classList.add("cell-selected");
        
        let cellObject = db[rowId][colId];
        let address = String.fromCharCode(65+colId)+(rowId+1)+"";
        // console.log(address);
        //after creating it, send to the address input 
        addressInput.value = address;
        //update ui
        formulaInput.value = cellObject.formula;
        
        if(rowId == 0 && colId == 0){
            allCells[i].style.borderLeft = "none";
            allCells[i].style.borderTop = "none";
        }
        else if(rowId == 0){
            allCells[i].style.borderTop = "none";
        }
        else if(colId == 0){
            allCells[i].style.borderLeft = "none";
        }
        else{
            //normal
        }
        
        ////////font style /// ///////////
        cellObject.fontStyle.bold?
        document.querySelector(".bold").classList.add("active-font-style"):
        document.querySelector(".bold").classList.remove("active-font-style");

        cellObject.fontStyle.italic?
        document.querySelector(".italic").classList.add("active-font-style"):
        document.querySelector(".italic").classList.remove("active-font-style");

        cellObject.fontStyle.underline?
        document.querySelector(".underline").classList.add("active-font-style"):
        document.querySelector(".underline").classList.remove("active-font-style");

        ///Align Items////////////////
        cellObject.alignStyle.leftAlign?
        document.querySelector(".align-left").classList.add("active-align-style"):
        document.querySelector(".align-left").classList.remove("active-align-style");

        cellObject.alignStyle.centerAlign?
        document.querySelector(".align-center").classList.add("active-align-style"):
        document.querySelector(".align-center").classList.remove("active-align-style");

        cellObject.alignStyle.rightAlign?
        document.querySelector(".align-right").classList.add("active-align-style"):
        document.querySelector(".align-right").classList.remove("active-align-style");

        ////////font family//////////////////////////
    //     function start(){
    //         document.getElementById("font-family").addEventListener("change", addActivityItem, false);
    //         }
      
    //   function addActivityItem(){
    //         //option is selected
    //         alert("yeah");
    //   }
      
    //   window.addEventListener("load", start, false);

    })

    allCells[i].addEventListener("blur",function(e){
        lastSelectedCell=e.target;
        //console.log(lastSelectedCell);
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        lastleftcell=rowId;
        lasttopcell=colId;
        let cellObject = db[rowId][colId];
        if(cellObject.value == cellValue){
            return;
        }
        cellObject.value = cellValue;
        cellObject.formula = formulaInput.value;
        // console.log("After update",cellObject);
        updateChildren(cellObject);
        if(cellObject.visited){
            return;
        }
        cellObject.visited = true;
        visitedCells.push({"rowId":rowId,"colId":colId});
    })

    allCells[i].addEventListener('keydown',function(e){
        if(e.key == 'Backspace'){
            let cell = e.target;
            let {rowId,colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula){
                //db
                cellObject.formula = "";
                //ui
                formulaInput.value = "";
                removeFormula(cellObject);
                cell.textContent = "";
            }
        }
    })
}

formulaInput.addEventListener("blur",function(e){
    let formula = e.target.value;
    if(formula){
        let {rowId,colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];
        //Intially checking that the cellobj contains formula previosly or not
        //If it contains previosly we r updating it with nwew one so we are first deleting the parent and child 
        //of the specifc cell object
        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let computedValue = solveFormula(formula,cellObject);
        //update db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        //update ui
        lastSelectedCell.textContent = computedValue;
        updateChildren(cellObject);
    }
})
