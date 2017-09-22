const cloudName = 'dht8hrgql';
const unsignedUploadPreset = 'zq35ikx2';

var fileSelect = document.getElementById("fileSelect"),
  fileElem = document.getElementById("fileElem");

fileSelect.addEventListener("click", function(e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

// *********** Upload file to Cloudinary ******************** //
function uploadFile(file) {
  var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
      var url = response.secure_url;      
      console.log("url: " + url);
    }
  };

  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'Syspush'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file);
  xhr.send(fd);
}
//antiga função do exemplo: http://www.developerslearnit.com/2016/11/build-photo-gallery-app-with-ionic2.html
uploadPhoto() {
  let loader = this.loadingCtrl.create({
    content: "Aguarde..."
  });
  loader.present();

  let filename = this.imagePath.split('/').pop();
  let options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "image/jpg",
    params: { 'title': this.postTitle, 'description': this.desc }
  }; 
   
  this.filetransfer = this.transfer.upload(this.imageNewPath, this.apiEndPoint,
    options).then((entry) => {
      this.imagePath = '';
      this.imageChosen = 0;
      loader.dismiss();
      this.navCtrl.setRoot(InCioPage);
    }, (err) => {
      alert(JSON.stringify(err));
    });
}  