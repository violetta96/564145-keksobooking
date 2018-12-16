'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');
  var previewPhotoContainer = document.querySelector('.ad-form__photo-container');

  var checkFileType = function (file, fileTypes) {
    var fileName = file.name.toLowerCase();
    return fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var onLoadAddFiles = function (reader) {
    var newPhotoDiv = document.createElement('div');
    newPhotoDiv.classList.add('ad-form__photo');
    var img = document.createElement('img');
    img.src = reader.result;
    img.alt = 'Фотография жилья';
    img.width = '70';
    img.height = '70';
    newPhotoDiv.appendChild(img);
    previewPhotoContainer.appendChild(img);
  };

  var onLoadremoveFiles = function () {
    var previewPhotoElements = previewPhotoContainer.querySelectorAll('.ad-form__photo');
    for (var i = 0; i < previewPhotoElements.length; i++) {
      previewPhotoContainer.removeChild(previewPhotoElements[i]);
    }
  };

  var uploadPhoto = function (fileChooser, preview, multiple) {

    var onChangeInput = function () {
      var file = fileChooser.files;
      for (var i = 0; i < file.length; i++) {
        if (checkFileType(file[i], FILE_TYPES)) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            if (multiple) {
              onLoadremoveFiles();
              onLoadAddFiles(reader);
            } else {
              preview.src = reader.result;
            }
          });

          reader.readAsDataURL(file[i]);
        }
      }
    };

    fileChooser.addEventListener('change', onChangeInput);
  };

  uploadPhoto(fileChooserAvatar, previewAvatar);
  uploadPhoto(fileChooserPhoto, previewPhoto, true);
})();
