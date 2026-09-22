const QUESTIONS=[
{n:1,text:"Một bạn đang đi xe đạp. Phía trước có người đi bộ qua đường nhưng bạn ấy vẫn giữ nguyên tốc độ vì nghĩ “người ta sẽ tránh mình”. Điều gì cần có trước tiên để xử lý tình huống này an toàn?",answer:"BÌNH TĨNH",letter:"B"},
{n:2,text:"Một học sinh thấy đường vắng nên định vượt xe phía trước ngay tại đoạn đường cong. Theo em, điều gì khiến quyết định này nguy hiểm dù lúc đó chưa nhìn thấy xe ngược chiều?",answer:"CẤM VƯỢT",letter:"Ấ"},
{n:3,text:"Một xe đạp điện chạy sát một chiếc xe lớn. Người lái xe đạp điện không thể nhìn rõ phía trước xe. Theo em, phương tiện lớn đó có thể là gì?",answer:"Ô TÔ",letter:"T"},
{n:4,text:"Một bạn đang đi xe đạp thì phát hiện phía trước có chướng ngại vật. Bạn ấy không đủ khoảng cách để chuyển hướng an toàn. Trong tình huống này, hành động nào nên được thực hiện trước?",answer:"DỪNG XE",letter:"N"},
{n:5,text:"Một học sinh bật xi-nhan nhưng không kiểm tra phía sau rồi lập tức chuyển hướng. Hành động nào trong tình huống này dễ khiến người phía sau không kịp xử lý?",answer:"RẼ GẤP",letter:"G"},
{n:6,text:"Xe phía trước bất ngờ dừng lại. Em đang ở phía sau và khoảng cách đã khá gần. Cách xử lý nào thể hiện em chủ động phòng tránh thay vì phản ứng quá muộn?",answer:"CHỜ",letter:"Ờ"}
];
const state={selected:null,done:Array(6).fill(false),revealed:Array(6).fill(false),timer:15,timerId:null,keywordShown:false};
const $=s=>document.querySelector(s);
const nav=$("#questionNav"),grid=$("#puzzleGrid");
function bindQuestionButtons(){nav.querySelectorAll(".q-pill").forEach(b=>{b.onclick=null;b.addEventListener("click",()=>openQuestion(Number(b.dataset.q)));});}
function renderNav(){
 nav.innerHTML=QUESTIONS.map(q=>`<div class="question-row ${state.done[q.n-1]?"done":""}"><button class="q-pill" type="button" data-q="${q.n}">Câu ${q.n}</button><div class="row-answer">${state.done[q.n-1]?q.answer:""}</div></div>`).join("");
 bindQuestionButtons();
}
function renderGrid(){
 grid.innerHTML="";
 QUESTIONS.forEach((q,r)=>{for(let c=0;c<15;c++){const cell=document.createElement("div");cell.className="cell";if(c===5)cell.classList.add("keyword");if(state.revealed[r])cell.classList.add("revealed");if(state.revealed[r]&&c===5)cell.textContent=q.letter;grid.appendChild(cell);}});
}
function setTime(v){const t="0:"+String(v).padStart(2,"0");$("#topTimer").textContent=t;$("#questionTimer").textContent=t;}
function stopTimer(){if(state.timerId){clearInterval(state.timerId);state.timerId=null;}}
function startTimer(){stopTimer();state.timer=15;setTime(15);state.timerId=setInterval(()=>{state.timer--;setTime(Math.max(0,state.timer));if(state.timer<=0)stopTimer();},1000);}
function openQuestion(n){state.selected=n;document.body.classList.add("question-open");$("#boardScreen").classList.add("hidden");$("#questionScreen").classList.remove("hidden");$("#qTitle").textContent="Câu "+n;$("#questionText").textContent=QUESTIONS[n-1].text;$("#answerBox").textContent="Chưa mở đáp án";$("#answerBox").classList.remove("shown");startTimer();}
function backBoard(){stopTimer();document.body.classList.remove("question-open");$("#questionScreen").classList.add("hidden");$("#boardScreen").classList.remove("hidden");renderNav();renderGrid();}
function confirmQuestion(){if(state.selected==null)return;const i=state.selected-1;state.done[i]=true;state.revealed[i]=true;$("#answerBox").textContent=QUESTIONS[i].answer;$("#answerBox").classList.add("shown");renderNav();renderGrid();}
function reset(){stopTimer();state.selected=null;state.done.fill(false);state.revealed.fill(false);state.keywordShown=false;setTime(15);$("#keywordBox").textContent="";$("#keywordBox").classList.remove("keyword-revealed");renderNav();renderGrid();}
$("#backBtn").addEventListener("click",backBoard);
$("#startTimer").addEventListener("click",startTimer);
$("#stopTimer").addEventListener("click",stopTimer);
$("#markDone").addEventListener("click",confirmQuestion);
$("#keywordRevealBtn").addEventListener("click",()=>{state.keywordShown=true;$("#keywordBox").textContent="BẤT NGỜ";$("#keywordBox").classList.add("keyword-revealed");});
$("#cancelBtn").addEventListener("click",()=>{$("#keywordBox").textContent="";$("#keywordBox").classList.remove("keyword-revealed");state.keywordShown=false;});
$("#resetGame").addEventListener("click",reset);
$("#presentationMode").addEventListener("click",()=>document.body.classList.toggle("presentation"));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#questionScreen").classList.contains("hidden"))backBoard();if(e.key===" "){e.preventDefault();startTimer();}});
renderNav();renderGrid();setTime(15);
