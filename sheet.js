let addSheetBtn = document.querySelector('.add-sheet');
let sheetList = document.querySelector('.sheets-list');
let sheetId = 0;

addSheetBtn.addEventListener("click",function(){
    sheetId ++;
    let activeSheet = document.querySelector('.active-sheet');
    activeSheet.classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("shetid",sheetId);
    sheetDiv.innerText = `sheet ${sheetId+1}`;
    sheetList.append(sheetDiv);
})
sheetList.addEventListener("click",function(e){
    let sheetClicked = e.target;
    if(sheetClicked.classList.contains("active-sheet")){
        return;
    }
    let activeSheet = document.querySelector(".active-sheet");
    activeSheet.classList.remove("active-sheet");
    sheetClicked.classList.add("active-sheet");
})