document.addEventListener('DOMContentLoaded', function() {
  alert("Installing DOM observer");
  
  // Your custom function
  function myCustomHandler(event) {
    console.log('$nextTick was called!');
    console.log(window.app.__vue__.$route)
    console.log(event);
  }
  const originalNextTick  = window.app.__vue__.__proto__.$nextTick;
  
  window.app.__vue__.__proto__.$nextTick = (callback) => {
      myCustomHandler(this);
      originalNextTick.call(this, callback); 
      return 
  }
}
