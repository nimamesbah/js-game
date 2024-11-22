const items = document.querySelectorAll(".items");
function itemClick(evt){
    evt.target.classList.remove("hide")
    evt.target.classList.add("disabled")
    console.log(evt);
    
    
}
function hideAll(){
    for (const item of items) {
        item.classList.add("hide")
    }
}

setTimeout(hideAll,3000)

for (const item of items) {
    item.addEventListener("click",itemClick)
    
}