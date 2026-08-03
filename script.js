// =========================
// HTMLを取得
// =========================
const drawButton = document.getElementById("drawButton");

const draw10Button = document.getElementById("draw10Button");

const box = document.getElementById("box");

const result = document.getElementById("result");

const remaining = document.getElementById("remaining");

const prizeCount = document.getElementById("prizeCount");

const history = document.getElementById("history");

const modal = document.getElementById("modal");

const modalResult = document.getElementById("modalResult");

const specialEffect=document.getElementById("specialEffect");

const specialMessage=document.getElementById("specialMessage");

const resetButton = document.getElementById("resetButton");

// =========================
// 効果音
// =========================

const clickSound = new Audio("sounds/click.mp3");

const shakeSound = new Audio("sounds/shake.mp3");

const openSound = new Audio("sounds/open.mp3");

const rareSound = new Audio("sounds/rare.mp3");

const lastoneSound = new Audio("sounds/lastone.mp3");

function updatePrizeCount(){

    const total = 60;

    prizeCount.innerHTML=`

🏆 A賞　残り ${tickets.filter(ticket=>ticket==="A賞").length}個
(${((tickets.filter(ticket=>ticket==="A賞").length / total) * 100).toFixed(1)}%)

<br>

🟦 B賞　残り ${tickets.filter(ticket=>ticket==="B賞").length}個
(${((tickets.filter(ticket=>ticket==="B賞").length / tickets.length) * 100).toFixed(1)}%)

<br>

🟩 C賞　残り ${tickets.filter(ticket=>ticket==="C賞").length}個
(${((tickets.filter(ticket=>ticket==="C賞").length / tickets.length) * 100).toFixed(1)}%)

<br>

🟪 D賞　残り ${tickets.filter(ticket=>ticket==="D賞").length}個
(${((tickets.filter(ticket=>ticket==="D賞").length / tickets.length) * 100).toFixed(1)}%)

<br>

🟧 E賞　残り ${tickets.filter(ticket=>ticket==="E賞").length}個
(${((tickets.filter(ticket=>ticket==="E賞").length / tickets.length) * 100).toFixed(1)}%)

<br>

⬜ F賞　残り ${tickets.filter(ticket=>ticket==="F賞").length}個
(${((tickets.filter(ticket=>ticket==="F賞").length / tickets.length) * 100).toFixed(1)}%)

`;

}

function createConfetti(){

    const colors=[
        "#FFD700",
        "#FF4D4D",
        "#4DA6FF",
        "#4DFF88",
        "#FF66CC"
    ];

    for(let i=0;i<80;i++){

        const confetti=document.createElement("div");

        confetti.className="confetti";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.background=colors[Math.floor(Math.random()*colors.length)];

        confetti.style.animationDelay=Math.random()+"s";

        confetti.style.transform=`rotate(${Math.random()*360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(function(){

            confetti.remove();

        },3000);

    }

}

// =========================
// 60枚のくじを作る
// =========================
const prizeData = {

    "A賞": {
        image: "images/A.png",
        name: "特大ぬいぐるみ"
    },

    "B賞": {
        image: "images/B.png",
        name: "クッション"
    },

    "C賞": {
        image: "images/C.png",
        name: "マグカップ"
    },

    "D賞": {
        image: "images/D.png",
        name: "アクリルスタンド"
    },

    "E賞": {
        image: "images/E.png",
        name: "缶バッジ"
    },

"F賞": {
    image: "images/F.png",
    name: "ステッカー"
},

"LAST ONE賞": {

    image: "images/lastone.png",

    name: "ラストワン賞"

}

};

let tickets = [];
let lastOneAvailable = true;

let drawHistory = [];

let drawCount = 0;

// A賞 2枚
for (let i = 0; i < 2; i++) {
    tickets.push("A賞");
}

// B賞 4枚
for (let i = 0; i < 4; i++) {
    tickets.push("B賞");
}

// C賞 8枚
for (let i = 0; i < 8; i++) {
    tickets.push("C賞");
}

// D賞 12枚
for (let i = 0; i < 12; i++) {
    tickets.push("D賞");
}

// E賞 14枚
for (let i = 0; i < 14; i++) {
    tickets.push("E賞");
}

// F賞 20枚
for (let i = 0; i < 20; i++) {
    tickets.push("F賞");
}

remaining.textContent = `残り ${tickets.length} / 60`;

updatePrizeCount();

// =========================
// ボタンを押した時
// =========================

drawButton.addEventListener("click", function () {


    if (tickets.length === 0) {

    result.textContent = "くじは終了しました！";

    return;
}


clickSound.currentTime = 0;
clickSound.play();

drawCount++;

box.classList.add("shake");

shakeSound.currentTime = 0;
shakeSound.play();

    result.textContent = "抽選中...";

    box.classList.add("zoom");

    setTimeout(function () {
box.classList.remove("shake");

box.classList.add("flash");

box.src="images/box-open.png";

shakeSound.pause();

openSound.currentTime = 0;
openSound.play();

        box.classList.remove("zoom");
let prize;

if(tickets.length===1){

    tickets.splice(0,1);

    prize="LAST ONE賞";

}else{

    const randomIndex=Math.floor(Math.random()*tickets.length);

    prize=tickets[randomIndex];

    tickets.splice(randomIndex,1);

}

const data=prizeData[prize];
let cardClass = "";

switch(prize){

    case "A賞":
        cardClass = "gold";
        break;

    case "B賞":
        cardClass = "blue";
        break;

    case "C賞":
        cardClass = "green";
        break;

    case "D賞":
        cardClass = "purple";
        break;

    case "E賞":
        cardClass = "orange";
        break;

    case "F賞":
        cardClass = "gray";
        break;

    case "LAST ONE賞":

    cardClass="last";

    break;

}

modalResult.innerHTML = `

<div class="resultCard ${cardClass}">

    <img src="${data.image}" class="prizeImage">

    <h2>${prize}</h2>

    <p>${data.name}</p>

    ${prize === "LAST ONE賞"
        ? "<h3>最後の1枚です！おめでとうございます！</h3>"
        : ""}

</div>


<div class="resultButtons">

    <button id="drawAgainButton">

        🎁 もう一回引く

    </button>


    <button id="copyButton">

        📋 結果をコピー

    </button>


    <button id="closeButton2">

        ❌ 閉じる

    </button>

</div>

`;
if(prize==="A賞"){

    rareSound.currentTime=0;
    rareSound.play();

    createConfetti();

    document.body.classList.add("flashBackground");

    specialMessage.innerHTML=`

        <h1>🏆</h1>

        <h2>A賞獲得！！</h2>

        <p>CONGRATULATIONS!</p>

    `;

    specialEffect.classList.remove("hidden");

    setTimeout(function(){

        specialEffect.classList.add("hidden");
        document.body.classList.remove("flashBackground");

    },2500);

}

if(prize==="LAST ONE賞"){

    lastoneSound.currentTime=0;
    lastoneSound.play();

    createConfetti();

    document.body.classList.add("flashBackground");

specialMessage.innerHTML=`

    <img src="images/lastone.png" class="lastImage">

    <h1>👑</h1>

    <h2>ラストワン賞！！</h2>

    <p>CONGRATULATIONS!</p>

`;

    specialEffect.classList.remove("hidden");

    setTimeout(function(){

        specialEffect.classList.add("hidden");
        document.body.classList.remove("flashBackground");

    },4000);

}

drawHistory.unshift(`${drawCount}回目　${prize}　${data.name}`);

history.innerHTML="";

drawHistory.forEach(function(item,index){

    history.innerHTML+=`

<div class="historyItem">

${index+1}. ${item}

</div>

`;

});

modal.classList.remove("hidden");

// もう一回引く
document.getElementById("drawAgainButton")
.addEventListener("click",function(){

    modal.classList.add("hidden");

    drawButton.click();

});


// 結果コピー
document.getElementById("copyButton")
.addEventListener("click",function(){

    const text =
`🎉 ムロ番くじ結果 🎉

${drawHistory[0]}
`;

    navigator.clipboard.writeText(text);

    alert("結果をコピーしました！");

});


// 閉じる
document.getElementById("closeButton2")
.addEventListener("click",function(){

    modal.classList.add("hidden");

});

result.textContent = "";

        remaining.textContent = `残り ${tickets.length} / 60`;

updatePrizeCount();

// 1.5秒後に箱を閉じる
setTimeout(function () {

    box.src = "images/box.png";

    box.classList.remove("flash");

}, 1500);

    }, 2000);

});

resetButton.addEventListener("click", function(){

    if(confirm("くじを最初からやり直しますか？")){

        location.reload();

    }

});

// =========================
// ダークモード切替
// =========================

const darkButton = document.getElementById("darkButton");


darkButton.addEventListener("click",function(){

    document.body.classList.toggle("dark");


    if(document.body.classList.contains("dark")){

        darkButton.textContent="☀️ ライトモード";

    }else{

        darkButton.textContent="🌙 ダークモード";

    }

});

// =========================
// 結果コピー
// =========================



draw10Button.addEventListener("click", drawTenTimes);

function drawTenTimes(){

    if(tickets.length===0){
        alert("くじは終了しました！");
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play();

    shakeSound.currentTime = 0;
    shakeSound.play();

    result.textContent = "10回抽選中...";

    box.classList.add("shake");
    box.classList.add("zoom");

    // ここで2秒待つ
    setTimeout(function(){

        box.classList.remove("shake");
        box.classList.remove("zoom");

        box.classList.add("flash");
        box.src="images/box-open.png";

        shakeSound.pause();

        openSound.currentTime = 0;
        openSound.play();

        let results=[];
        let summary={
            "A賞":0,
            "B賞":0,
            "C賞":0,
            "D賞":0,
            "E賞":0,
            "F賞":0,
            "LAST ONE賞":0
        };

        let count=Math.min(10,tickets.length);

        for(let i=0;i<count;i++){

            drawCount++;

let prize;

const randomIndex = Math.floor(Math.random() * tickets.length);

prize = tickets[randomIndex];

tickets.splice(randomIndex,1);


// 最後の1枚を引いた場合だけラストワン

            results.push(prize);

if(summary[prize] !== undefined){

    summary[prize]++;

}

// 最後の1枚を引いた後にラストワンを追加
if(tickets.length === 0 && lastOneAvailable){

    results.push("LAST ONE賞");

    summary["LAST ONE賞"]++;

    lastOneAvailable = false;

}

drawHistory.unshift(
`${drawCount}回目　${prize}　${prizeData[prize].name}`
);

        }

        history.innerHTML = "";

drawHistory.forEach(function(item, index){

    history.innerHTML += `

<div class="historyItem">

${index + 1}. ${item}

</div>

`;

});

        remaining.textContent=`残り ${tickets.length} / 60`;

        updatePrizeCount();

        showTenResult(results,summary);

        // ラストワン演出
if(results.includes("LAST ONE賞")){

    lastoneSound.currentTime=0;
    lastoneSound.play();

    createConfetti();

    document.body.classList.add("flashBackground");

    specialMessage.innerHTML=`

    <img src="images/lastone.png" class="lastImage">

    <h1>👑</h1>

    <h2>ラストワン賞！！</h2>

    <p>CONGRATULATIONS!</p>

    `;

    specialEffect.classList.remove("hidden");


    setTimeout(function(){

        specialEffect.classList.add("hidden");

        document.body.classList.remove("flashBackground");

    },4000);

}

        setTimeout(function(){

            box.src="images/box.png";
            box.classList.remove("flash");
            result.textContent="";

        },1500);

    },2000);

}

function showTenResult(results,summary){

    let html="<h2>🎁 10回引き結果</h2>";

    html+='<div class="tenGrid">';

    results.forEach(function(prize){

    let lastClass = "";

    if(prize === "LAST ONE賞"){
        lastClass = "lastTenItem";
    }


    html+=`
    <div class="tenItem ${lastClass}">

        <img src="${prizeData[prize].image}">

        <p>${prize}</p>

    </div>
    `;

});

html += `</div>`;


html += `
<div class="summary">

<div><span>A賞</span><span>× ${summary["A賞"]}</span></div>
<div><span>B賞</span><span>× ${summary["B賞"]}</span></div>
<div><span>C賞</span><span>× ${summary["C賞"]}</span></div>

<div><span>D賞</span><span>× ${summary["D賞"]}</span></div>
<div><span>E賞</span><span>× ${summary["E賞"]}</span></div>
<div><span>F賞</span><span>× ${summary["F賞"]}</span></div>
<div><span>LAST ONE賞</span><span>× ${summary["LAST ONE賞"]}</span></div>

</div>
`;

html += `
<hr>

<div class="resultButtons">

    <button id="drawAgainButton">
        🎁 もう一回10回引く
    </button>

    <button id="copyButton">
        📋 結果をコピー
    </button>

    <button id="closeButton2">
        ❌ 閉じる
    </button>

</div>
`;

modalResult.innerHTML = html;
modal.classList.remove("hidden");

// 🎁 もう一回10回引く
document.getElementById("drawAgainButton").addEventListener("click", function(){

    modal.classList.add("hidden");

    drawTenTimes();

});

// 📋 結果をコピー
document.getElementById("copyButton").addEventListener("click", function(){

    const text = results.join("\n");

    navigator.clipboard.writeText(text);

    alert("結果をコピーしました！");

});

// ❌ 閉じる
document.getElementById("closeButton2").addEventListener("click", function(){

    modal.classList.add("hidden");

});

}