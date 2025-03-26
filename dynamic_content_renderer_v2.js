
document.addEventListener('DOMContentLoaded', async function() {  

    // Extract information from the parent window. 
    editing_mode = document.baseURI.includes("/edit")            
    data_name = window.parent.document.querySelector("span.hidden").innerHTML
    window_config = window.parent.parent.window.config
    document_baseURI = document.baseURI
    document_cookie = document.cookie
   

    // Adjust the style : Hide the left sidebar and make the right main content full screen.
    window.parent.window.document.querySelector(".post-canvas-container").className = 'w-full md:w-full post-canvas-container';
    window.parent.window.document.querySelector(".post-canvas-container").parentElement.firstChild.className = 'md:w-1/12 w-full flex flex-col space-y-5 md:mt-0 mt-5 hidden'

    
    // Find the sections with Dynamic content.
    membership_content_NodeList = window.parent.window.document.querySelectorAll(".membership-content-section") 
    num_content_elements = membership_content_NodeList.length

    const dynamic_content_pattern = "{{RKI_DYNAMIC_CONTENT}}"
    const renderer_pattern = "{{RKI_RENDERER}}"
    
    section_titles = []
    dynamic_content_sections_indexes = [] 
    embedding_section_indexs = []
    
    for (let i = 0; i < membership_content_NodeList.length; i++) {
        section_titles.push(membership_content_NodeList[i].querySelector("h1, h2, p").innerText)
        
        if (section_titles[i].includes(dynamic_content_pattern)){
            dynamic_content_sections_indexes.push(i)
        }
        if (section_titles[i].includes(renderer_pattern)){
            embedding_section_indexs.push(i)
        }
    }

  // Repeat for every dynamic content in the page. 
  for (dynamic_section_index of dynamic_content_sections_indexes) {
          // Get Dynamic element for the content - should be in a for loop 
          //dynamic_section_index = dynamic_content_sections_indexes[0]
          dynamic_content_metadata = membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").innerText
          dynamic_content_JSON =  JSON.parse(dynamic_content_metadata.replaceAll(/\u00a0/g, ' '))  // remove nbsp characters.

            let base_url = "https://x97k2snqkd.execute-api.us-east-1.amazonaws.com/Prod/renderer"

            content =  encodeURIComponent(dynamic_content_JSON.content);
            repo =  encodeURIComponent(dynamic_content_JSON.repo);
            get_resource_URI = `${base_url}/getResourceURL/${repo}/${content}`
            
            URI_Request_params = {
                method : "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                 },
                body : JSON.stringify({
                    'groove_token' : `${document_cookie}`,
                    'mode' : `view`
                    })
            }
            if (editing_mode) {
                // If in edit mode - use the corresponding token
                preview_token = `token=${JSON.parse(window.localStorage.user).token}`
                URI_Request_params.body = JSON.stringify({
                    'groove_token' : `${preview_token}`,
                    'mode' : `preview`
                    })
            }

              
            myresponse = await fetch(get_resource_URI,URI_Request_params)
            const myresponse_json = await myresponse.json();
            console.log(myresponse_json);
            
          
           
      
          // Create a reference to the component to load. 
          //notebook = `https://christoforou.github.io/cus1172_2023/${dynamic_content_JSON.content}`
          notebook = myresponse_json.iframe_src
          let newElement = document.createElement("iframe")
          newElement.src = notebook
          newElement.width="100%"       
          newElement.height= dynamic_content_JSON.height     // TODO - Get the values of pixels of the height based on the applications TODO
          //newElement.onload = () => { newElement.style.heigh = newElement.contentWindow.document.body.scrollHeight + 'px'}
            
            
          if (editing_mode) {
            // Do not inject. 
            console.log("In Edit mode, do not inject the text")
            membership_content_NodeList[dynamic_section_index].querySelector("h1, h2, p").innerText = dynamic_content_pattern + dynamic_content_JSON.title
            membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").append(newElement)
        
              
          } else {    
            // Erase existing contnet in dyamic section, update title, inject content.
            membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").innerHTML = ""
            membership_content_NodeList[dynamic_section_index].querySelector("h1, h2, p").innerText = dynamic_content_JSON.title
            membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").append(newElement)
        
          } // end of not in edit mode. 
}

// After updating all dynamic contents - hide the embedding section from the live website. 
if (!editing_mode) {
    membership_content_NodeList[embedding_section_indexs[0]].className="hidden"
}
})
