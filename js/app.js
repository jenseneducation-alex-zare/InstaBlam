let Cameraview = {};
document.addEventListener('touchstart', event => {
  setTimeout(() => {
      if (document.querySelector('body').scrollTop < 0) {
      }
  }, 1000);
})

async function captureImage(Cameraview) {
  const mediaTrack = Cameraview.getVideoTracks()[0];
  console.log(mediaTrack);
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto()
  console.log(photo)
  const imgUrl = URL.createObjectURL(photo);
  console.log(imgUrl);
  document.querySelector('#photo').src = imgUrl;
}


async function getMedia() {
  try {
    Cameraview = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElem = document.querySelector('#me');
    videoElem.srcObject = Cameraview;
    videoElem.addEventListener('loadedmetadata', () => {
      videoElem.play();
      randomiseHue(videoElem);
    })
    console.log(Cameraview);
  } catch (error) {
      console.log(error);
  }
}

getMedia();

document.querySelector('#Takepic').addEventListener('click', event => {
    captureImage(Cameraview);
    document.querySelector(".editer").style.display="flex";
})

function registrateServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
    .then((registration) => { 
      console.log('Registered')
      push();
    })
    .catch(error => console.log('Something went wrong'));
  }
}
// Brightness up n down
document.getElementById("b+").addEventListener('click', event => {
  Caman('#photo', function(){
    this.brightness(10).render();
  })
})
document.getElementById("b-").addEventListener('click', event => {
  Caman('#photo', function(){
    this.brightness(-10).render();
  })
})
// contrast up n down
document.getElementById("c+").addEventListener('click', event => {
  Caman('#photo', function(){
    this.contrast(10).render();
  })
})
document.getElementById("c-").addEventListener('click', event => {
  Caman('#photo', function(){
    this.contrast(-10).render();
  })
})
// saturation up n down
document.getElementById("s+").addEventListener('click', event => {
  Caman('#photo', function(){
    this.saturation(10).render();
  })
})
document.getElementById("s-").addEventListener('click', event => {
  Caman('#photo', function(){
    this.saturation(-10).render();
  })
})
// vibrance up n down
document.getElementById("v+").addEventListener('click', event => {
  Caman('#photo', function(){
    this.vibrance(10).render();
  })
})
document.getElementById("v-").addEventListener('click', event => {
  Caman('#photo', function(){
    this.vibrance(-10).render();
  })
})
// exposure up n down
document.getElementById("e+").addEventListener('click', event => {
  Caman('#photo', function(){
    this.exposure(10).render();
  })
})
document.getElementById("e-").addEventListener('click', event => {
  Caman('#photo', function(){
    this.exposure(-10).render();
  })
})

registrateServiceWorker();
