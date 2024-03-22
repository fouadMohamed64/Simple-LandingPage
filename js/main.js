
// check if ther's local storage color opition
let mainColors = localStorage.getItem("color-option");

if(mainColors !== null){
    // for test
    // console.log("local storage is not empty");
    // console.log(localStorage.getItem("color-option"))

    document.documentElement.style.setProperty('--mainColor', mainColors);

    // remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");


        // add active class on element with data-color === local storage item
        if(element.dataset.color === mainColors){
            // add active class
            element.classList.add("active")
        }

    });

};


// random background option
let backgroundOption = true;

// variable to control background interval
let backgroundInterval;

// check if ther's local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

// check if random background local storage is not empty
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    // remove active class from all sapn

    document.querySelectorAll(".random-background span").forEach(element =>{
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    }
}

// toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function (){
    // toggle class fa-spin for rotain on self 
    this.classList.toggle("fa-spin");

    // toggle class open on main setting box
    document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on list items
colorsLi.forEach(li => {

    // click on every list item
    li.addEventListener("click", (e) =>{

        // set color on root
        document.documentElement.style.setProperty('--mainColor', e.target.dataset.color);

        // set color on localStorage
        localStorage.setItem("color-option", e.target.dataset.color);

        // remove active class from all children
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active");
        });

        // add active class on him self
        e.target.classList.add("active");

    });
});

// switch random background option
const randomBackgroundElement = document.querySelectorAll(".random-background span");

// loop on all spans
randomBackgroundElement.forEach(span => {

    // click on every span
    span.addEventListener("click", (e) =>{


        // remove active class from all children
        e.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active");
        });

        // add active class on him self
        e.target.classList.add("active");

        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem("background-option", true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);  
            localStorage.setItem("background-option", false);
        }

    });
});

// select landing page element
let landingPage = document.querySelector(".landing-page")

// get array image
let imgsArry = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


// function to randomize img

function randomizeImg (){
    if(backgroundOption === true){
        backgroundInterval = setInterval(()=>{

            // get random number 
            let randomNumber = Math.floor(Math.random() * imgsArry.length);
        
            // chagne url image
            landingPage.style.backgroundImage = 'url("img/'+imgsArry[randomNumber]+'")';
        
        },1000);
    };
};

randomizeImg();



// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){

    // skills offset top
    let skillsOffSetTop = ourSkills.offsetTop;

    // skills outer hight
    let skillsOuteHeight = ourSkills.offsetHeight;

    // window height
    let windowHeight = this.innerHeight;

    // window scroll top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffSetTop + skillsOuteHeight - windowHeight)){
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progres span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progres;
        });

    };

};


// create popup with img
let ourGalarey = document.querySelectorAll(".galery img");

ourGalarey.forEach(img =>{
    img.addEventListener('click', (e) => {

        // create overLay element
        let overLay = document.createElement("div");

        // add class to overlay
        overLay.className = 'popup-overlay';
        // append overlay to body
        document.body.appendChild(overLay);

        // create popup
        let popupBox = document.createElement("div");
        // add class to popup box
        popupBox.className = 'popup-box';

        if(img.alt !== null){
            // create heading
            let imgHeading = document.createElement("h3");

            // create text for heading
            let headingText = document.createTextNode(img.alt);

            // add text to the heading
            imgHeading.appendChild(headingText);

            // append the heading to popup box
            popupBox.appendChild(imgHeading);
        }

        // create the img
        let popupImg = document.createElement("img");

        // set img src
        popupImg.src = img.src;

        // add img to popup box
        popupBox.appendChild(popupImg);

        // add popup box to body
        document.body.appendChild(popupBox);

        // create close span
        let closeBotton = document.createElement("span");

        // create the close button text
        let closeBottonText = document.createTextNode("X");

        // append text to close button 
        closeBotton.appendChild(closeBottonText);

        // add class to the close button
        closeBotton.className = "close-button";

        // add close button to the popup box
        popupBox.appendChild(closeBotton);
    });
});

// close popup
document.addEventListener('click', function(e){

    if(e.target.className === "close-button"){

        // remove the curent popup 
        e.target.parentNode.remove();

        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }

});

// ! i arived on this vidoe # 19 create popup box // 