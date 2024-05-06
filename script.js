// audio files for anmations and actions
const music = new Audio();
music.src = "./main.mp3";
music.volume = .7;
music.preload = "auto"; 
var parts = document.getElementById('particles-js')
document.body.style.animationPlayState = 'paused';


var loading = document.getElementById('loading')
parts.style.opacity = '0';
loading.style.display = 'flex';

window.addEventListener("load",function(){
    
    loading.style.display = 'none';
    
    parts.style.opacity = '0';

})


var logo = document.getElementById('logo');
logo.style.display = 'none';
var slogan = document.getElementById('slogan')
    logo.style.display = 'flex';
  

    slogan.classList.add('logoIn')
    slogan.classList.remove('logoOut')
    
        setTimeout(function(){
            slogan.classList.add('logoOut')
            slogan.classList.remove('logoIn')
            music.loop = 'true';
            music.currentTime = 0;
            music.play();
            setTimeout(
                function(){
                    slogan.style.display = 'none';
                    logo.style.display = 'none';
    
                    parts.style.opacity = '1';
                    parts.style.transition = '.5s';
    
    
                    mainmenu.style.display = 'flex';
                    document.body.style.animationPlayState = 'running';
    
                },2000
            )  
    
        },4000)


   



const click = new Audio();
click.src = "./click.mp3";
click.preload = "auto"; 

const selectSound = new Audio();
selectSound.src = "./select.mp3";
selectSound.preload = "auto"; 

const remove = new Audio();
remove.src="./back.mp3";
remove.preload = "auto"; 

const fail = new Audio();
fail.src = "./fail.mp3";
fail.preload = "auto";


const win= new Audio();
win.src="./win.mp3";
win.preload = "auto"; 


const thunder= new Audio();
thunder.src="./launch.mp3";
thunder.preload = "auto"; 

const start= new Audio();
start.src="./start.mp3";
start.preload = "auto"; 


const over = new Audio();
over.src = "./warn.mp3"; 
over.preload = "auto"; 


const finish = new Audio();
finish.src = "./finish.mp3";
finish.preload = "auto"; 


let numbers = [];
let selectedNumbers = [];
const generatedNumbers = new Set(); // تعريف مجموعة للأرقام المولّدة
const levels = {
    easy: { digits: 1, maxNumbers: 6 },
    medium: { digits: 2, maxNumbers: 6 },
    hard: { digits: 3, maxNumbers: 6 }
};
let currentLevel = levels.easy;
let timerInterval; // تحريك المتغير إلى خارج الدالة

var scoreBox = document.getElementById('score')
var timerBox = document.getElementById('timer')
var guid = document.getElementById('guid')
var buttonsContainer = document.getElementById('buttonsContainer');

function generateNumbers() {
    numbers = [];
    generatedNumbers.clear(); // مسح الأرقام السابقة
    for (let i = 0; i < currentLevel.maxNumbers; i++) {
        let number = '';
        for (let j = 0; j < currentLevel.digits; j++) {
            number += Math.floor(Math.random() * 10);
        }
        // التحقق من عدم تكرار الرقم
        while (generatedNumbers.has(number)) {
            number = '';
            for (let j = 0; j < currentLevel.digits; j++) {
                number += Math.floor(Math.random() * 10);
            }
        }
        generatedNumbers.add(number); // إضافة الرقم إلى المجموعة للتحقق من تكراره لاحقًا
        numbers.push(parseInt(number));
    }
    displayNumbers();
}

function displayNumbers() {
    const numbersContainer = document.getElementById('numbersContainer');
    numbersContainer.innerHTML = '';
    numbers.forEach((number, index) => {
        const span = document.createElement('span');
        span.textContent = number;
        span.onclick = () => {
            const newSound = new Audio("./select2.mp3"); // إنشاء صوت جديد لكل نقرة
            newSound.play(); // تشغيل الصوت
            selectNumber(index); // استدعاء الدالة عند النقر
        };
        
        numbersContainer.appendChild(span);
    });
}

function selectNumber(index) {

    if (selectedNumbers.length >= currentLevel.maxNumbers) {
        alert('لقد تجاوزت الحد الأقصى لعدد الأرقام');
        return;
    }
    if (selectedNumbers.includes(numbers[index])) {
        return;
    }
    if (selectedNumbers.length === currentLevel.maxNumbers) {
            selectedNumbers = []; // حذف الأرقام المختارة
    
    }
    selectedNumbers.push(numbers[index]);
    displaySelectedNumbers();
}

function displaySelectedNumbers() {
    const selectedNumbersContainer = document.getElementById('selectedNumbers');
    selectedNumbersContainer.innerHTML = ''; // يمسح المحتوى السابق

    selectedNumbers.forEach((number, index) => {
        const div = document.createElement('div');
        div.textContent = number;
        selectedNumbersContainer.appendChild(div);
        // التحقق من صحة الترتيب عند اكتمال الأرقام المختارة
        if (selectedNumbers.length === currentLevel.maxNumbers) {

            checkSolution();

        }
        // تطبيق الانيميشن فقط على العناصر الجديدة
        if (index === selectedNumbers.length - 1) {
            div.style.animation = 'reveal 1s cubic-bezier(0,.91,0,.99)';
        }
    });
}

function displaySelectedNumbersWithoutAnimation() {
    const selectedNumbersContainer = document.getElementById('selectedNumbers');
    selectedNumbersContainer.innerHTML = ''; // يمسح المحتوى السابق

    selectedNumbers.forEach((number) => {
        const div = document.createElement('div');
        div.textContent = number;
        selectedNumbersContainer.appendChild(div);
    });
}

let backButton = document.getElementById('back');
let isRemoving = false; // متغير للتحقق من حالة الحذف

function removeLastNumber() {
    if (isRemoving || selectedNumbers.length === 0) { // تحقق من حالة الحذف وإذا كانت القائمة فارغة
        return;
    }
    
    
    remove.play(); 
    isRemoving = true; // تحديد أن العملية قيد التشغيل

    const lastNumberDiv = document.getElementById('selectedNumbers').lastElementChild;
    lastNumberDiv.style.animation = 'hide .33s cubic-bezier(1,.06,.94,.99)'; // تغيير الانتقال
    setTimeout(() => {
        selectedNumbers.pop();
        displaySelectedNumbersWithoutAnimation();
        backButton.style.opacity = '100%';
        backButton.style.transition = '.2s ';
        isRemoving = false; // إعادة تعيين الحالة بعد اكتمال الانتقال

        // إظهار الرقم المخفي عند العودة

    }, 300); // انتظار انتهاء الانتقال قبل حذف الرقم
}

var doneSquare = document.querySelector('.done');
var winBox = document.querySelector('.win');

function checkSolution() {
    // التحقق مما إذا كان عدد الأرقام المختارة يساوي 10
    if (selectedNumbers.length !== 6) {
        alert('يرجى اختيار 5 أرقام قبل التحقق من الترتيب.');
        return;
    }

    // فحص صحة الترتيب
    const sortedNumbers = bubbleSort([...selectedNumbers]);

    var nums = document.getElementById('numbersContainer');

    if (arraysEqual(sortedNumbers, selectedNumbers)) {
        // عرض رسالة بالنجاح وزيادة النقاط
        win.currentTime = 0;
        win.play(); 
        updateScore();
        nums.classList.add('vfx');
        setTimeout(function(){
            nums.classList.remove('vfx');

        },500)

        document.body.style.animationDuration = '2s';


        setTimeout(function(){
            document.body.style.animationDuration = '10s';
            document.body.style.backgroundColor = 'black';

            document.body.style.animationPlayState = 'running';
            document.body.style.scale = '1';


        },500)

        generateNumbers();

        document.body.classList.add('cameraWiggle');
        setTimeout(function(){
            document.body.classList.remove('cameraWiggle');
        },500)
        


        // قائمة الكلمات التحفيزية
var motivationalWords = ["!رائع", "!ممتاز", "!ابداعى", "!أحسنت", "!مذهل", "!مبهج"];

// تابع لتوليد رقم عشوائي بين صفر وطول المصفوفة
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
    
}

// تحديث كلمة التحفيز في winBox
function updateMotivationalWord() {
    var randomIndex;
    do {
        randomIndex = getRandomIndex(motivationalWords.length);
    } while (motivationalWords[randomIndex] === winBox.innerText); // التأكد من عدم تكرار الكلمة نفسها
    winBox.innerText = motivationalWords[randomIndex];
}    updateMotivationalWord(); // تحديث كلمة التحفيزية

        winBox.style.display = 'block' ;
        winBox.onanimationend = function(){
            this.style.display = 'none';
        }

    } else {
        
        fail.play();
    
        selectedNumbers = [];
    
        setTimeout(function() {
            clearInterval(timerInterval);
            gameError.innerHTML = 'أخطأت فى الترتيب';
            result.style.display = 'flex'
            gameOver.style.display = 'flex';
            finalResult();
            

            document.body.style.animationPlayState = 'paused';
            thunder.pause();
            over.pause();
            // finish.play();
        }, 100); // تأخير عرض الرسالة بمقدار 100 مللي ثانية
        music.pause(); 
        retryWithoutChange();
    }
}

function retryWithoutChange() {
    selectedNumbers = [];
    displaySelectedNumbers();
}

function changeNumbers() {
    generateNumbers();
}



const result = document.getElementById('result');
const gameError = document.getElementById('gameError');
const gameOver = document.getElementById('gameOver');



function finalResult(){
    if ( score === 0) {
        result.innerHTML = `.لم تحصل على اى نقاط`;
    } 
    else if ( score === 1) {
        result.innerHTML = ` .لقد حصلت على نقطة واحدة`;
    } 
    else if ( score === 2) {
        result.innerHTML = ` .لقد حصلت على  نقطتين`;
    } 

    else if
    (score > 10) {
        result.innerHTML = `  .لقد حصلت على ${score} نقطة`;
    } 
    else if
    (score > 2 && score < 11) {
        result.innerHTML = `  .لقد حصلت على ${score} نقاط`;
    } 
  
    
}

function startGame() {
    
    document.body.style.animationPlayState = 'running';
    music.pause();

    
    thunder.volume = 0.5;
    setTimeout(function(){
        thunder.currentTime = 0;
        thunder.play()    

    },2000)






let timeRemaining = 60; // وقت بالثواني
let timerDisplay = document.getElementById('timer');

var overLay = document.getElementById('overlay');

    const selectedLevel = document.getElementById('level').value;
    changeLevel(selectedLevel);

    setTimeout(function () {
        document.getElementById('gameContainer').style.display = 'block';
        overLay.style.display= 'block';

    }, 200);
    setTimeout(function () {
        guid.style.display = 'flex';
        document.body.style.animationPlayState = 'paused';
        document.body.style.scale = '1';

        setTimeout(function(){
            document.body.style.animationPlayState = 'running';
            document.body.style.scale = '1';

            // overLay.style.display= 'none';

        },2000)
        setTimeout(function(){
            

            overLay.style.display= 'none';

        },3000)

    }, 200);
    setTimeout(function () {
        document.getElementById('mainmenu').style.display = 'none';
      
    }, 1500);
    setTimeout(function () {
        scoreBox.style.display = 'block';
        timerBox.style.display = 'block';
        buttonsContainer.style.display = 'flex';


 timerInterval = setInterval(updateTimer, 1000);




function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeRemaining--;

    if (timeRemaining === 4) {
       thunder.volume = .2;
       
       over.play();
       over.loop= 'false';
        
        // تمرير المصفوفة إلى الدالة endGame
                // يمكنك تنفيذ أي إجراءات إضافية هنا بعد انتهاء الوقت
    }
   
    if (timeRemaining < 0) {
        clearInterval(timerInterval);
       
        gameOver.style.display = 'flex';
        document.body.style.animationPlayState = 'paused';
        thunder.pause();
        over.pause();
        finish.play();

        gameError.innerHTML = '.انتهى الوقت';
        finalResult();

        finalResult();
        
       
       
        // تمرير المصفوفة إلى الدالة endGame
                // يمكنك تنفيذ أي إجراءات إضافية هنا بعد انتهاء الوقت
    }
}


}, 500);
}

function changeLevel(level) {
    currentLevel = levels[level];
    generateNumbers();
}

function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

window.onload = generateNumbers;

function menu() {
    setTimeout(function () {
       
    }, 300);

    setTimeout(function () {
        document.getElementById('gameContainer').style.display = 'none';
    }, 1000);
}

let score = 0;

function updateScore() {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    selectedNumbers = []; // حذف الأرقام المختارة

}


let timeRemaining = 60; // وقت بالثواني
let timerDisplay = document.getElementById('timer');

function updateTimer() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeRemaining--;

    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        alert('انتهى الوقت!');
        // يمكنك تنفيذ أي إجراءات إضافية هنا بعد انتهاء الوقت
    }
}


var gameTitle = document.getElementById('gameTitle')
var getReady = document.getElementById('ready')

var menuItems = document.querySelector('.menu')

var poly = document.querySelector('.poly')
var tri = document.querySelector('.tri')

function intro(){
    parts.style.opacity = '0';

    start.play();
    document.body.style.scale = '1';
    document.body.style.transition = '.5s ease';


   document.body.style.animationPlayState = 'paused';

    setTimeout(function(){
        music.pause(); 

    },300)

    tri.style.scale = '60';
    tri.style.rotate = '180deg';
    tri.style.transition = '1s cubic-bezier(.32,0,.02,.99)';

    gameTitle.style.translate ='0 -20rem';
    poly.style.scale = '3';
    poly.style.transition = ' 1s cubic-bezier(1,0,.88,.99)';


    getReady.classList.add('h2Active')
    getReady.classList.remove('h2Unactive')


    setTimeout(function(){
        tri.style.scale = '0';
        tri.style.rotate = '0deg';
        tri.style.transition = '.5s cubic-bezier(.99,-0.01,.02,.99)';

        getReady.classList.add('h2Unactive')
        getReady.classList.remove('h2Active')


        poly.style.transition = ' 1.5s cubic-bezier(1,-0.01,0,1)';

        poly.style.scale = '20';
        // poly.style.animation = 'btnRotate 1.5s cubic-bezier(1,-0.01,0,1) ';
        poly.style.animation = 'newone 1s linear ) '; // تغيير سرعة الانيميشن إلى 0.5 ثانية
        // startGame();
        menuItems.style.display = 'none';
        startGame();

        document.body.classList.add('cameraWiggle');
        setTimeout(function(){
            document.body.classList.remove('cameraWiggle');
        },800)
    },1000)


}
var aboutSection = document.getElementById('aboutSection');

var levelSelection = document.getElementById('levelSelection');
var mainmenu = document.getElementById('mainmenu');
var gameContainer = document.getElementById('gameContainer');




function displayLevels(){
    click.currentTime = '0';
    click.play();
    levelSelection.style.animation = 'closed 1s ease';
    parts.style.animation = 'opened 1s ease';
    mainmenu.style.animation = 'opened 1s ease';
    onanimationend   = function(){
    levelSelection.style.display = 'flex';
    mainmenu.style.display = 'none';
    parts.style.display = 'none';


  }

}

function hideLevels(){
    click.currentTime = '0';
    click.play();
    parts.style.animation = 'closed 1s ease';
    mainmenu.style.animation = 'closed 1s ease';
    levelSelection.style.animation = 'opened 1s ease';
    onanimationend   = function(){
    mainmenu.style.display = 'flex';
    parts.style.display = 'block';

    levelSelection.style.display = 'none';
  }
}

function displayAbout(){
    click.currentTime = '0';
    click.play();
    aboutSection.style.animation = 'closed 1s ease';
    parts.style.animation = 'opened 1s ease';
    mainmenu.style.animation = 'opened 1s ease';
    onanimationend   = function(){
    aboutSection.style.display = 'flex';
    mainmenu.style.display = 'none';
    parts.style.display = 'none';


  }

}

function hideAbout(){
    click.currentTime = '0';
    click.play();
    parts.style.animation = 'closed 1s ease';
    mainmenu.style.animation = 'closed 1s ease';
    aboutSection.style.animation = 'opened 1s ease';
    onanimationend   = function(){
    mainmenu.style.display = 'flex';
    parts.style.display = 'block';

    aboutSection.style.display = 'none';
  }
}
function hideGameAndReturnHome(){
    thunder.pause();

    music.currentTime = 0; // إعادة الموسيقى إلى البداية
    music.loop = true; // تفعيل تكرار الموسيقى
    music.play(); // تشغيل الموسيقى
     start.currentTime = 0; // إعادة الموسيقى إلى البداية
     start.pause();
     remove.play()
     document.body.style.animationPlayState = 'running'
    gameContainer.style.opacity = '0';
    gameContainer.style.transition = '.5s';
    
    tri.style.scale = '1';
    poly.style.scale = '1';
    tri.style.rotate = '0deg';
    poly.style.rotate = '0deg';

    setTimeout(function(){
        setTimeout(function(){
            parts.style.opacity = '1';
            parts.style.transition= '1s';
        },500)

        clearInterval(timerInterval);
        timerDisplay.textContent = `Time: 01:00`; // تحديث عرض العد التنازلي
        retryWithoutChange();
        score = 0; // إعادة قيمة score إلى الصفر
         document.getElementById('score').textContent = `Score: ${score}`; // تحديث عرض النقاط
    // الشيفرة الأخرى التي تريدها هنا 
        mainmenu.style.display = 'flex';

        gameContainer.style.display='none';
        gameContainer.style.opacity = '1'; 
        gameOver.style.display = 'none';



      

        gameTitle.style.translate ='0 0rem';

        menuItems.style.display = 'flex';
        parts.style.display = 'flex';

    },500)

}



