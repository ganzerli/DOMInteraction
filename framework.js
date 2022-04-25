document.addEventListener("DOMContentLoaded", e => {
    getElements();
    createMap();
    start();
    console.log("DOMContent loaded");
});

const MAIN_DOM_ROOT = document.querySelector("body");
const CHECK_TIME_ms = 500;
const GLOBAL_PAGINATION = [];


let CURRENT_PAGE = {
    name:"index",
    template:[1,2]
};

function start(){
    // set pagination
    setPagination();
    // start check loop
    check();
};


let getElements = ()=>{
    // code here
    const elements = MAIN_DOM_ROOT.children
    const name = "brick-";
    // change classname for better structuring
    for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add = name+i;
            GLOBAL_PAGINATION.push(elements[i]);
            GLOBAL_PAGINATION[i].style.border="1px solid black";
    }

    return elements;

};

// from last action choose page to display
let setPagination = ()=>{
    // code here


};

let check = ()=>{
    // code here
    setPagination();

};

let createMap =()=>{
    const map = document.createElement("div");
    let width, height , percentageWidth, percentageHeight;

    map.style.position="fixed";
    map.style.top="10px";
    map.style.left="10px";

    const bodyWidth = MAIN_DOM_ROOT.clientWidth;
    const bodyHeight = MAIN_DOM_ROOT.clientHeight;
    
    width = (bodyWidth / 10);
    height = (bodyHeight / 20);


    map.style.width  = width + "px";
    map.style.height = height + "px";
    //map.style.border="1px solid black";
    map.style.zIndex="9999999";


    //i = 1 globalpaginatin[0] is the map itself
    for (let i = 1; i < GLOBAL_PAGINATION.length; i++) {
        const map_el = document.createElement("div");

        percentageWidth = (GLOBAL_PAGINATION[i].clientWidth) / bodyWidth ;
        percentageHeight = (GLOBAL_PAGINATION[i].clientHeight) / bodyHeight;

        //console.log(percentageWidth ,percentageHeight);
        
        width = percentageWidth * width;
        height =  percentageHeight * 200;

        console.log(width ,height);


       // console.log(width,height);

        map_el.style.position="relative";
        map_el.style.width =  width + "px" ;
        map_el.style.height =  height + "px" ;
        map_el.style.border="1px solid black";
        map_el.style.display="block";
        map_el.style.content=" ";
        map_el.status = true;
        map_el.style.backgroundColor = "lightgreen";

        // integrating comands acting for DOM 
        const map_el_act_container = document.createElement("div");
        const map_el_act1 = document.createElement("span");
        const map_el_act2 = document.createElement("span");
        const map_el_act3 = document.createElement("span");


        map_el_act1.style.backgroundColor="green";
        map_el_act1.style.width="20px";
        map_el_act1.style.height="5px";
        map_el_act1.style.position="absolute";
        map_el_act1.style.top="0px";
        map_el_act1.style.left="0px";


        map_el_act2.style.backgroundColor="red";
        map_el_act2.style.width="20px";
        map_el_act2.style.height="5px";
        map_el_act2.style.position="absolute";
        map_el_act2.style.top="0px";
        map_el_act2.style.left="20px";

        map_el_act3.style.backgroundColor="darkgrey";
        map_el_act3.style.width="30px";
        map_el_act3.style.height="10px";
        map_el_act3.style.position="absolute";
        map_el_act3.style.top="5px";
        map_el_act3.style.left="40px";

        map_el_act_container.style.display="none";


        map_el_act1.addEventListener("click", e =>{
            // dom action
            GLOBAL_PAGINATION[i].style.display="block";
            map_el.status = true;
            map_el.style.background = "lightgreen";
            map_el.style.opacity = .8;

        });

        map_el_act2.addEventListener("click", e =>{
            // dom action
            GLOBAL_PAGINATION[i].style.display="none";
            map_el.status = false;
            map_el.style.background = "tomato";
            map_el.style.opacity = .4;

        });

        // create textbox for changes
        const form = document.createElement("form");
        const input = document.createElement("input");
        input.type = "text";
        input.style.position = "fixed";

        form.appendChild(input);
        MAIN_DOM_ROOT.appendChild(form);


        const updateTextboxPosition=(e)=>{
            if(map_el_act3.status){
                input.style.top=e.y +10 +"px";
                input.style.left=e.x+ 10+ "px";
            }else{
                console.log(e.x);
            }
        }
        
        let toggleClick = (e) => {
            const el = e.target;
            form.onsubmit = (e) => {
                e.preventDefault();
                el.innerText = input.value;
                input.value = "";
            };

            if( map_el_act3.status){
                input.focus();
                console.log(e.target);
            }else{
                console.log("inactive for that");
            }
        }

        GLOBAL_PAGINATION[i].addEventListener("click",toggleClick);
        GLOBAL_PAGINATION[i].addEventListener("mousemove",updateTextboxPosition);


        map_el_act3.status = false;
        map_el_act3.addEventListener("click", e =>{
            if(map_el_act3.status){
                // toggle status
                map_el_act3.style.background="darkgrey";
                map_el_act3.status = false;
                GLOBAL_PAGINATION[i].style.cursor = "none";
                input.style.display="none";

            }else{
                // toggle status
                map_el_act3.style.background="white";
                map_el_act3.status = true;
                GLOBAL_PAGINATION[i].style.cursor = "pointer";
                input.style.display="block";
                input.focus();
            }
        });

        // append commands to comnd panel
        map_el_act_container.appendChild(map_el_act1);
        map_el_act_container.appendChild(map_el_act2);
        map_el_act_container.appendChild(map_el_act3);


        // append comend panel to map_el
        map_el.appendChild(map_el_act_container);


        // HOVER for comand panel
         map_el.addEventListener('mouseenter', (e)=>{
            map_el_act_container.style.display="block";
         })
         map_el.addEventListener('mouseleave', (e)=>{
            map_el_act_container.style.display="none";
         })

        map.appendChild(map_el);
    }

    console.log("create map");
    console.log(map);

    MAIN_DOM_ROOT.appendChild(map);
};