//document 
const sahne = document.getElementById("sahne");
const kutu = document.getElementById("kutu");
const gosterge= document.getElementById("gosterge");
const gosterge2= document.getElementById("gosterge2");
const btn= document.getElementById("btn");
//baslangic degiskenleri
let yon = 0;
let dusman = 6;
let dusmanDizi = [];
let yonler = [];
let level=20;
let puan=0;
let timer=0;
let lvl;

    btn.addEventListener("click",function(e){
        btn.style.visibility='hidden';
        gosterge.innerHTML=`kutulara Carpmamaya Calis!!! `;
        setTimeout(function(){
            gosterge.innerHTML=`Oyun Baslatiliyor... `;
        },2000);
        
        
        oynat();
        yondegisimi();
        kutuEkle();
        gostergeler();
    });
 
    //gostergeler
    function gostergeler(){
        setInterval(function(){
            setTimeout(function(){
                timer++;
                let lvl;
                switch(timer){
                    case 1: {level=20;}break;
                     case 30: {level=15;clearTimeout(oynat(),level);dusman=2; kutuEkle();}break;
                     case 60: {level=10;clearTimeout(oynat(),level);dusman=2; kutuEkle(); }break;
                    } 
              gosterge.innerHTML=`Zaman: ${timer}`;
              switch(level){
                case 10:{ lvl=3; puan+=15;  }break;
                case 15:{ lvl=2; puan+=10 }break;
                case 20:{ lvl=1;  puan+=5; }break;
           }
           
             gosterge.innerHTML+=`<br>level: ${lvl}`;
             gosterge.innerHTML+=`<br>Puan: ${puan}`;
            
            },4000);
            
        },1000);   
    }

        

//fonksiyonlari baslatma






//dusman ekle
function kutuEkle() {
    for(var i=0;i<dusman;i++){
        const kutular = document.createElement("div");
        kutular.className="kutular";
        let xs= Math.floor(Math.random() * 289);
        let ys= Math.floor(Math.random() * 289); 
        kutular.style.left=xs+"px";
        kutular.style.top=ys+"px";
        sahne.appendChild(kutular);
        dusmanDizi.push(kutular);
    }
}


    //yon degistir
function yondegisimi(){
   setInterval(function(){
        yonler=[];
    for(var i=0;i<dusmanDizi.length;i++){
        yonler[i] = Math.floor(Math.random () * 4);
       
    }
        
    },5000);
}

     //oynat
function oynat(){

    

    let carpismaId =setInterval(function(){
        //player 1 location
        for(var i =0;i<dusmanDizi.length;i++){
        let myleft = kutu.offsetLeft;
        let myright=sahne.offsetWidth-(kutu.offsetLeft+kutu.offsetWidth);
        let mytop=kutu.offsetTop;
        let mybottom=sahne.offsetHeight-(kutu.offsetTop+kutu.offsetHeight);
       
       //dusman location
        let otherleft = dusmanDizi[i].offsetLeft;
        let otherright=sahne.offsetWidth-(dusmanDizi[i].offsetLeft+dusmanDizi[i].offsetWidth);       
        let othertop=dusmanDizi[i].offsetTop;
        let otherbottom=sahne.offsetHeight-(dusmanDizi[i].offsetTop+dusmanDizi[i].offsetHeight);        
        
        //crach test
        var crash = true;
        if(myleft-otherleft<10 && myright-otherright<10 && mytop-othertop<10 && mybottom-otherbottom<10) {
         crash = false;
         }
         if(crash===false){
            level=20;
             clearInterval(oynatId);
             
             let score=puan;
             gosterge2.innerHTML=`Oyun Bitti
             Puaniniz : ${score} `;
             gosterge2.style.zIndex='2';
             clearInterval(carpismaId);
            
             setTimeout(function(){
                gosterge2.style.zIndex='-1';
                gosterge.innerHTML=`Tekrar Baslatiliyor... `;
             let kutularSil = document.querySelectorAll(".kutular");
                kutularSil.forEach(function(i){
                    i.remove();
                });
                dusman=6;
                dusmanDizi=[];
                kutuEkle();
                setTimeout(function(){
                    oynat();
                },1000);
                timer=0;
                puan=0;
                lvl=1; 
                level=20;
                   
             },1000);
            
         }
        }
        });
        let oynatId = setInterval(function(){
            
            for (var i=0;i<dusmanDizi.length;i++){
                yonbul(i);
                yon=yonler[i];
            }
    },level);
       
}

   
    //yonbul
    function yonbul(i){
        let ykutu;
        let xkutu;
        ykutu = dusmanDizi[i].offsetTop;
        xkutu = dusmanDizi[i].offsetLeft;

        if(yon===0){
            //asagi yonu
            if(ykutu===290) ykutu=0;
            ykutu+=1;
          dusmanDizi[i].style.top=ykutu+"px";
        }
        else if(yon===1){
            //yukari yonu
            if(ykutu===0) ykutu=290;
            ykutu-=1;
            dusmanDizi[i].style.top=ykutu+"px";
        }
        
        else if(yon===2){
            //sag yonu
            if(xkutu===290) xkutu=0;
            xkutu+=1;
            dusmanDizi[i].style.left=xkutu+"px";
        }
       else if(yon===3){
            //sol yonu
            if(xkutu===0) xkutu=290;
            xkutu-=1;
            dusmanDizi[i].style.left=xkutu+"px";
        }
    }
   


    //Player 1
window.addEventListener('keydown', function(e) {
    let x = kutu.offsetLeft;
    let y = kutu.offsetTop;
    if (e.keyCode === 39) {
        if(x===290) x=-10;
        x+=10; //sag yonu
        kutu.style.left=x+"px";
        
    }
    if (e.keyCode === 37) {
        if(x===0) x=300;
        x-=10; //sol yonu
        kutu.style.left=x+"px";
       
    }
    if (e.keyCode === 38) {
        if(y===0) y=300;
        y-=10; //yukari yonu
        kutu.style.top=y+"px";
       
       
        
    }
    if (e.keyCode === 40) {
        if(y===290) y=-10;
        y+=10; //asagi yonu
        kutu.style.top=y+"px";
       
        
    }
    });
    
