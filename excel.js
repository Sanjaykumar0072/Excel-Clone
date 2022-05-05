let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;
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

        cellObject.fontStyle.bold?
        document.querySelector(".bold").classList.add("active-font-style"):
        document.querySelector(".bold").classList.remove("active-font-style");

        cellObject.fontStyle.italic?
        document.querySelector(".italic").classList.add("active-font-style"):
        document.querySelector(".italic").classList.remove("active-font-style");

        cellObject.fontStyle.underline?
        document.querySelector(".underline").classList.add("active-font-style"):
        document.querySelector(".underline").classList.remove("active-font-style");
    })

    allCells[i].addEventListener("blur",function(e){
        lastSelectedCell=e.target;
        //console.log(lastSelectedCell);
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");
        let cellObject = db[rowId][colId];
        if(cellObject.value == cellValue){
            return;
        }
        cellObject.value = cellValue;
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
        let computedValue = solveFormula(formula,cellObject);
        //update db
        cellObject.value = computedValue;
        cellObject.formula = formula;
        //update ui
        lastSelectedCell.textContent = computedValue;
        updateChildren(cellObject);
    }
})


