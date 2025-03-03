document.addEventListener('DOMContentLoaded', function() {  


    console.log('The button is pressed XXX Automatics Version');
    console.log(window)
    console.log(window.parent)  
    onsole.log(window.parent.parent.window.config);
    console.log('The button is pressed');
    console.log(window);
    console.log(document.baseURI);
    console.log('IS Cookie');
    console.log(document.cookie);

    console.log(document.parent);
    console.log(window.parent.window.config);
    console.log(window.parent.window.document);
    console.log('The button is pressed END');
    window.document.querySelector('#myFrameMain').src='https://preactjs.com/tutorial/01-vdom/';
    window.parent.window.document.querySelector("#app").style.backgroundColor = 'blue';     
    //
  
    window.parent.window.document.querySelector(".post-canvas-container").className = 'w-full md:w-full post-canvas-container';
    window.parent.window.document.querySelector(".post-canvas-container").parentElement.firstChild.className 'md:w-1/12 w-full flex flex-col space-y-5 md:mt-0 mt-5'
})
