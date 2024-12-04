
const imgEarth = document.querySelector('#imgEarth');
const title = document.querySelector('#title');

window.addEventListener("scroll", () => {
    //Gets de current position of the scroll
    let scroll = window.scrollY; 

    //Adjusts the bottom position of the title 
    title.style.bottom = (scroll * 0.05) + '%'; 

    //adjusts the size of the Earth image
    let scale = 1 - scroll * 0.001; 
        //Ensures the scale doesn't go below 90% of its original size 28%
    scale = Math.max(scale, 0.9); 
    
    let translateY = scroll * 0.30; 
    let translateX = scroll * 0.20; 

    //Combines everything related to the img
    imgEarth.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    
})


