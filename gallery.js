const gallery = (function () {
    const GALLERY = document.querySelector(".gallery__container")
    const FOCUSED_IMAGE = document.createElement("img") 
    const THUMBNAILS = document.createElement("div")
    
    FOCUSED_IMAGE.classList.add("gallery__focusedImage")
    THUMBNAILS.classList.add("gallery__thumbnails")   

    //Elementer til zoom
    const ZOOMED_IMAGE_DIV = document.createElement("div")
    const ZOOMED_IMAGE = document.createElement("img")
    ZOOMED_IMAGE_DIV.append(ZOOMED_IMAGE)
    ZOOMED_IMAGE_DIV.style.display="none"
    ZOOMED_IMAGE_DIV.classList.add("gallery__zoomedImageContainer")
    ZOOMED_IMAGE.classList.add("gallery__zoomedImage") 
    
    //Callback Funktion til vores forEach loop
    //Det første parameter (image) er det enkelte aktuelle element
    //som forEach automatisk sender med
    function buildThumbnail (image) {
        const BUTTON = document.createElement("button")
        BUTTON.addEventListener("mouseover", changeFocus)
        BUTTON.innerHTML = `<img src="${image}" alt="galleri miniature"
        class="gallery__thumbnail">`
        BUTTON.classList.add("gallery__button")
        THUMBNAILS.append(BUTTON)
    }

    function changeFocus (event){
        //Vi sikrer os lige at event.target
        //rent faktisk er et et billede som har en
        //src attribut og ikke f.eks den button som
        //billedet er nestet i
        if (event.target.tagName == "IMG"){
            //kopier src attribut fra thumb til focus img
            FOCUSED_IMAGE.src = event.target.src
        }   
    }

    //Vi trigger zoom funktionen ved mouse over
    FOCUSED_IMAGE.addEventListener("mouseover", zoom)    
    
    function zoom (event){
        //Flere mouse-eventlyttere. Hvis vi tilføjer
        //lyttere inde i en funktion som trigges igen og igen
        //er det god praksis at fjerne dem igen.
        //det gør vi i stopZoom() 
        FOCUSED_IMAGE.addEventListener("mousemove", move)
        FOCUSED_IMAGE.addEventListener("mouseout", stopZoom)
        ZOOMED_IMAGE.src = event.target.src
        ZOOMED_IMAGE_DIV.style.display="block"    
    }
    function move(event){
        //Musens position i forhold til hele viduet
        let mouseX = event.clientX
        let mouseY = event.clientY
        //getBound.. returerer propperties om selve elementets position 
        let rect = event.target.getBoundingClientRect()
        //Med lidt matematik kan vi nu få musens position relativ til billedet
        posX = mouseX - rect.left
        posY = mouseY - rect.top
        ZOOMED_IMAGE.style.transformOrigin = `${posX}px ${posY}px`
    }
    function stopZoom(){
        ZOOMED_IMAGE_DIV.style.display="none"
        //Oprydning og rengøring
        FOCUSED_IMAGE.removeEventListener("mousemove")
        FOCUSED_IMAGE.removeEventListener("mouseout")
    }

    function init (images = []){
        //standard billede ved load af side
        FOCUSED_IMAGE.src = images[0]
        //Loop over den array med billed-stier vi har sendt med
        images.forEach(buildThumbnail)
        //prop de generede elementer ind i DOMen
        GALLERY.append(FOCUSED_IMAGE, THUMBNAILS, ZOOMED_IMAGE_DIV)
    }

    return {
        init
    }

} )()