const items = [...document.querySelectorAll(".items")];
const score = document.querySelector(".top-11");
const attempt = document.querySelector(".top-20");
const root = document.getElementById("root");


let arr = []
let arrCorrect=[]
let count =0

console.log(arr)
for(let i = 0; i < items.length ; i++){
    const rnd = Math.floor(Math.random() * items.length)
    const temp = items[rnd]
    items [rnd] = items[i];
    items[i] = temp

}
root.innerHTML = "" ;
for (const item of items) {
    root.appendChild(item)
    
}
function itemClick(evt){
    console.log(evt);
    // debugger
    if(arr.length===0){
        evt.target.classList.add("disabled")
        evt.target.classList.remove("hide")
        arr.push(evt.target);
    }else{
        evt.target.classList.add("disabled")
        evt.target.classList.remove("hide")
        arr.push(evt.target);
        if(arr[0].innerHTML===arr[1].innerHTML){
            evt.target.classList.remove("hide")
            evt.target.classList.add("disabled")
            arr.push(evt.target);
            arrCorrect.push(arr[0],arr[1])
            arr.length=0
        }else {
            count++

            wrongFreeze()
            
            
            // debugger
            setTimeout(function(){
                arr[0].classList.add("hide");
                arr[1].classList.add("hide");
                
                arr.length=0

                wrongUnFreeze()
                
                
                
            },1000)
            
                
            }

            
            
    }

    
    if(arrCorrect.length===16){
        alert("you win")
    }
     if(count===3){
        alert("you lose. press F5")
        for (const item of items) {
            item.removeEventListener("click",itemClick)
            
            
            
        }
        
        
     }
     attempt.textContent=`attempt:${count}`
    score.textContent=`your score: ${arrCorrect.length/2}`
    if(arrCorrect.length===16){
        score.textContent=`you win:*${arrCorrect.length/2}*`
    }
    if(count===3){
        score.textContent=`your final:${arrCorrect.length/2}`
    }
}
function wrongFreeze(){
    for (const item of items) {
        item.classList.add("disabled");
        
    }
}
function wrongUnFreeze(){
    for (const item of items) {
        item.classList.remove("disabled");
        for (const inn of arrCorrect) {
            inn.classList.add("disabled")}
        
    }
}

function startFreeze(){
    for (const item of items) {
        item.classList.add("disabled")
        
    }
}
startFreeze()
function endStartFreeze(){
    for (const item of items) {
        item.classList.remove("disabled")
        
    }
}
setTimeout(endStartFreeze,3000)

function hideAll(){
    for (const item of items) {
        item.classList.add("hide")
    }
}


setTimeout(hideAll,3000)

for (const item of items) {
    item.addEventListener("click",itemClick)
    
}