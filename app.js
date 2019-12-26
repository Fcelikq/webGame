//document 
const scane = document.getElementById("sahne");
const basket = document.getElementById("kutu");
const scorTable= document.getElementById("gosterge");
const healtTable= document.getElementById("gosterge2");
const btnStart= document.getElementById("btn");
const reStart= document.getElementById("btn2");

//baslangic degiskenleri

let yellowApples=[];
let life=5;
let score=0;
let appleRed=0;
let appleGreen=0;

btnStart.addEventListener("click",function(e){
    startGame()
});

reStart.addEventListener("click",function(e){
    location.reload();
});

function startGame(){
    btnStart.style.visibility='hidden';

    scorTable.innerHTML=`Oyun Baslatiliyor... `;
    
    setTimeout(function(){
        moveBasket()
        addYellowApple();
        yellowAppleMove(); 
        hit()
    },3000); 
    
    setTimeout(function(){
        scorTable.innerHTML=`Score : ${score}`;
        healtTable.innerHTML=`<br>life : ${life}`;
    },4000);
}

    //Player 1
     function moveBasket(){
        window.addEventListener('keydown', function(e) {
            let x = basket.offsetLeft;
           
            if (e.keyCode === 39) {
                if(x>240) x=-10;
                x+=10; //sag yonu
                basket.style.left=x+"px";
                
            }
            if (e.keyCode === 37) {
                if(x<5) x=259;
                x-=10; //sol yonu
                basket.style.left=x+"px";
            }
         
            });
     }
        

      
     //sari elma
     //sari elmalari ekle
    function addYellowApple() {
      let addYellowAppleSet= setInterval(function(){
             appleRed++;
             appleGreen++;
            const apple = document.createElement("div");
            apple.className="kutular";
            apple.innerHTML+=`<i class="fas fa-apple-alt"></i>`;
            let appleLocation= Math.floor(Math.random() * 260);
            apple.style.left=appleLocation+"px";
            if(appleRed===5){
             appleRed=0;
             apple.style.color='red';
            }
           if(appleGreen===12){
                appleGreen=0;
                apple.style.color='green';
               }
            scane.appendChild(apple);
            yellowApples.push(apple);
            if(life===0) {
                clearTimeout(addYellowAppleSet);
                reStart.style.visibility='visible'
            }
            
        },1000);
    }
    
    //sari elmalari oynat
    function yellowAppleMove(){
        let yellowAppleMoveSet = setInterval(function(){
            for (var i=0;i<yellowApples.length;i++){
               
                let appleTop;
             appleTop = yellowApples[i].offsetTop;
             appleTop+=1;
             yellowApples[i].style.top=appleTop+"px";
            }
            if(life===0) {
            clearTimeout(yellowAppleMoveSet);
            reStart.style.visibility='visible'
            
        }
    },15);
       
}  
    //sari elmayi yakala
    function hit(){
        let hitSet =setInterval(function(){

            //sepet konumu
            for(var i =0;i<yellowApples.length;i++){
            let myleft = basket.offsetLeft;
            let myright=scane.offsetWidth-(basket.offsetLeft+basket.offsetWidth);
            let mytop=basket.offsetTop;
            let mybottom=scane.offsetHeight-(basket.offsetTop+basket.offsetHeight);
           
           //elma konumu
            let otherleft = yellowApples[i].offsetLeft;
            let otherright=scane.offsetWidth-(yellowApples[i].offsetLeft+yellowApples[i].offsetWidth);       
            let othertop=yellowApples[i].offsetTop;
            let otherbottom=scane.offsetHeight-(yellowApples[i].offsetTop+yellowApples[i].offsetHeight);        
            
            //carpma testi
            if(myleft-otherleft<25 && myright-otherright<25 && mytop-othertop<15 && mybottom-otherbottom<25) {
                scane.removeChild(yellowApples[i]);
               if(yellowApples[i].style.color==='red'){
               life--;
               healtTable.innerHTML=`<br>life : ${life}`;
              }
               if(yellowApples[i].style.color==='green'){
                score+=15;
                life++;
                scorTable.innerHTML=`Score : ${score}`;
                healtTable.innerHTML=`<br>life : ${life}`;
              }
              else{
                score+=5;
                scorTable.innerHTML=`Score : ${score}`;
              }
               
                
             }
             
             else if(othertop===284){
                if(yellowApples[i].style.color==='red'){
                    scane.removeChild(yellowApples[i]); 
                }else{
                    scane.removeChild(yellowApples[i]); 
                    life-=1;
                    healtTable.innerHTML=`<br>life : ${life}`;
                }
                
             }
             
         }
        });
    }
   