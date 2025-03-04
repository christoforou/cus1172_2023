document.addEventListener('DOMContentLoaded', function() {  


    console.log('The button is pressed XXX Automatics Version');
    console.log(window)
    console.log(window.parent)  
    console.log(window.parent.parent.window.config);
    console.log('The button is pressed');
    console.log(window);
    console.log(document.baseURI);
    console.log('IS Cookie');
    console.log(document.cookie);

    console.log(document.parent);
    console.log(window.parent.window.config);
    console.log(window.parent.window.document);
    console.log('The button is pressed END');
    // To activate later
    //window.document.querySelector('#myFrameMain').src='https://preactjs.com/tutorial/01-vdom/';
    //window.parent.window.document.querySelector("#app").style.backgroundColor = 'blue';     
    //

    // Hide the left sidebar and make the right main content full screen. 
    window.parent.window.document.querySelector(".post-canvas-container").className = 'w-full md:w-full post-canvas-container';
    //window.parent.window.document.querySelector(".post-canvas-container").parentElement.firstChild.className = 'md:w-1/12 w-full flex flex-col space-y-5 md:mt-0 mt-5'
    window.parent.window.document.querySelector(".post-canvas-container").parentElement.firstChild.className = 'md:w-1/12 w-full flex flex-col space-y-5 md:mt-0 mt-5 hidden'
   
    // make the iframe invisible, not occupying space in the window. - might need to change that to some heigh - or position absolute to control view
    // For now, make the component, zero height instead of hidden.
    //window.parent.window.document.querySelector(".custom-embed-iframe").className = '.custom-embed-iframe hidden'
    window.parent.window.document.querySelector(".custom-embed-iframe").style.height="0px"
    window.parent.window.document.querySelector(".custom-embed-iframe").id = "rki_custom_course_view"
    
    


})
