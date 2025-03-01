const items = [...document.querySelectorAll(".items")];
const iTags =[...document.querySelectorAll(".items > i")]
const score = document.querySelector("#score");
const attempt = document.querySelector("#attempt");
const root = document.getElementById("root");
const wins = document.getElementById("totalWin")
const lose = document.getElementById("totalLose")
const modal = document.getElementById("modal")
const modalText =document.getElementById("modalText")


let arr = []
let arrCorrect=[]
let count =0
let totalWin = JSON.parse(localStorage.getItem("wins")) || 0
let totalLose = JSON.parse(localStorage.getItem("lose")) || 0
wins.innerHTML= `total wins: ${totalWin}`
lose.innerHTML= `total loses: ${totalLose}`

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
    console.log("nigger",evt);
    console.log("nigglet",evt.target.querySelector("i"));
    evt.target.querySelector("i").classList.remove("scale-150")
    evt.target.classList.add("scale-125")
    setTimeout(()=> evt.target.classList.remove("scale-125"),40)
    
    
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
            evt.target.classList.remove("hide","bg-[#FFC3A0]")
            evt.target.classList.add("disabled","bg-[#00CED1]")
            arr[0].classList.remove("bg-[#FFC3A0]")
            arr[0].classList.add("bg-[#00CED1]")
            arr.push(evt.target);
            arrCorrect.push(arr[0],arr[1])
            arr.length=0
        }else {
            count++
            evt.target.classList.add("rotate-[360deg]")
            

            wrongFreeze()
            
            
            // debugger
            setTimeout(function(){
                evt.target.querySelector("i").classList.add("scale-150")
                arr[0].classList.add("hide");
                arr[1].classList.add("hide");
                
                arr.length=0

                wrongUnFreeze(evt.target)
                
                
                
            },1000)
            
                
            }

            
            
    }

    
    if(arrCorrect.length===16){
    // setTimeout(()=>alert("you win"),50)
    totalWin++
    wins.innerHTML= `total wins: ${totalWin}`
    localStorage.setItem("wins",JSON.stringify(totalWin))
    modal.classList.remove("hidden")
    setTimeout(()=> {
        modal.classList.add("z-10","blur-xs","bg-slate-100","opacity-30")
        modalText.classList.add("opacity-100","bg-blue-400")
        modalText.innerHTML="you win!"
        
    },300)

    for (const item of arrCorrect) {
        item.style="background-color:rgb(100, 255, 100);"      
    }
    }
     if(count===3){
        //  setTimeout(()=>alert("you lose. press F5"),50)
         totalLose++
         lose.innerHTML= `total loses: ${totalLose}`
         localStorage.setItem("lose",JSON.stringify(totalLose))
         modal.classList.remove("hidden")
         setTimeout(()=> {
            modal.classList.add("z-10","blur-xs","bg-slate-100","opacity-30")
            modalText.classList.add("opacity-100","bg-red-400")
            modalText.innerHTML="you lose!"
            
        },300)

        for (const item of items) {
            item.removeEventListener("click",itemClick)
            item.style="background-color:#E97451;"
            
            
            
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

function restart(){
    location.reload()
}
function modalHandle(){
    modal.classList.add("hidden")
    modalText.classList.add("hidden")
}
function resetStats(){
    totalLose=0
    totalWin=0
    wins.innerHTML= `total wins: ${totalWin}`
    lose.innerHTML= `total loses: ${totalLose}`
    localStorage.setItem("wins",JSON.stringify(totalWin))
    localStorage.setItem("lose",JSON.stringify(totalLose))

}
function wrongFreeze(){
    
    
    for (const item of items) {
        item.classList.add("disabled");
        
    }
}
function wrongUnFreeze(node){
    node.classList.remove("rotate-[360deg]")
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
    for (const iTag of iTags) {
        iTag.classList.add("scale-150")
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