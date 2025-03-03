
window.setTimeout(()=> {alert("Testing Event")}, 1000)

document.addEventListener('DOMContentLoaded', function() {  
  alert("Installing DOM observer");
  
  // Your custom function
  function myCustomHandler(event) {
    console.log('$nextTick was called!');
    console.log(window.app.__vue__.$route)
    console.log(event);
    try {
      document.querySelector(".post-canvas-container").className = 'w-full md:w-full post-canvas-container';
      document.querySelector(".post-canvas-container").parentElement.firstChild.className = 'md:w-1/12 w-full flex flex-col space-y-5 md:mt-0 mt-5'
    } catch(error) {
      console.error(error);
    }
    
  }
  const originalNextTick  = window.app.__vue__.__proto__.$nextTick;
  
  window.app.__vue__.__proto__.$nextTick = (callback) => {
      myCustomHandler(this);
      return originalNextTick.call(this, callback); 
  }
})
