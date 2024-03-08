 document.addEventListener('DOMContentLoaded', ()=>{
            console.log('The button is pressed XXX');
            console.log(window)
            console.log(window.parent)  
            console.log(window.parent.parent.window.config);
            //console.log(window.parent.window.config);
            console.log('IS Cookie');
            console.log(document.cookie);
            
            console.log('The button is pressed');
            console.log(window);
            console.log(document.baseURI);
            console.log(document.parent);
            console.log(window.parent.window.config);
            console.log(window.parent.window.document);
            console.log('The button is pressed END');
            window.document.querySelector('#myFrameMain').src='https://preactjs.com/tutorial/01-vdom/';
            window.parent.window.document.querySelector("#app").style.backgroundColor = 'blue';        
});
