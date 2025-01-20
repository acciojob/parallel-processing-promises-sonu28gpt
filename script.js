//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

btn.addEventListener('click',()=>{
	btn.style.display='none';
output.innerHTML=`<div id='loading'>Loading...</div>`

function loadImage(image) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
  });
}
function downloadImages(images) {
  let promises = images.map(image => loadImage(image));

  return Promise.all(promises);
}

downloadImages(images)
  .then(imgElements => {
    let output = document.getElementById('output');
	  output.innerHTML='';
    imgElements.forEach(img => output.appendChild(img));
  })
  .catch(error => {
    let errorDiv = document.createElement('div');
	  errorDiv.setAttribute('id','error')
	  
	    errorDiv.textContent = error;
	  output.innerHTML='';
	  output.appendChild(errorDiv);
  });

});