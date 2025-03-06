

document.addEventListener('DOMContentLoaded', function() {  

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

    const dynamic_content_pattern = "Dynamic Content"
    section_titles = []
    dynamic_content_sections_indexes = [] 
    embedding_section_index = []
    
    for (let i = 0; i < membership_content_NodeList.length; i++) {
        section_titles.push(membership_content_NodeList[i].querySelector("p").innerText)
        
        if (section_titles[i].includes(dynamic_content_pattern)){
            dynamic_content_sections_indexes.push(i)
        }
    }


  // Get Dynamic element for the content - should be in a for loop 
  dynamic_section_index = dynamic_content_sections_indexes[0]
  dynamic_content_metadata = membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").innerText
  dynamic_content_JSON = JSON.parse(dynamic_content_metadata);

  // Create a reference to the component to load. 
  notebook = `https://christoforou.github.io/cus1172_2023/${dynamic_content_JSON.content}`
  let newElement = document.createElement("iframe")
  newElement.src = notebook
  newElement.width="100%"       
  newElement.height="6600px"    // TODO - Get the values of pixels of the height based on the applications TODO
    
  if (editing_mode) {
    // Do not inject. 
    console.log("In Edit mode, do not inject the text")
  } else {    
    // Erase existing contnet in dyamic section, update title, inject content.
    membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").innerHTML = ""
    membership_content_NodeList[dynamic_section_index].querySelector("p").innerText = dynamic_content_JSON.title
    membership_content_NodeList[dynamic_section_index].querySelector(".section-paragraph").append(newElement)

  } // end of not in edit mode. 
    


})
