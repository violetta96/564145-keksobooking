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

  var createNewDiv = function () {
    var newDiv = document.createElement('div');
    newDiv.classList.add('ad-form__photo');
    return newDiv;
  };

  var onLoadAddFiles = function (reader) {
    var newPhotoDiv = createNewDiv();
    var img = document.createElement('img');
    img.src = reader.result;
    img.alt = 'Фотография жилья';
    img.width = '70';
    img.height = '70';
    newPhotoDiv.appendChild(img);
    previewPhotoContainer.appendChild(newPhotoDiv);
  };

  var removeFiles = function () {
    var previewPhotoElements = previewPhotoContainer.querySelectorAll('.ad-form__photo');
    previewPhotoElements.forEach(function (photo) {
      if (photo.classList.contains('ad-form__photo')) {
        previewPhotoContainer.removeChild(photo);
      }
    });
  };

  var removeAvatar = function () {
    previewAvatar.src = 'img/muffin-grey.svg';
  };

  var uploadPhoto = function (fileChooser, preview, multiple) {

    var onChangeInput = function () {
      var files = fileChooser.files;
      for (var i = 0; i < files.length; i++) {
        if (checkFileType(files[i], FILE_TYPES)) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            if (multiple) {
              onLoadAddFiles(reader);
            } else {
              preview.src = reader.result;
            }
          });

          reader.readAsDataURL(files[i]);
        }
      }
    };
    removeFiles();
    fileChooser.addEventListener('change', onChangeInput);
  };

  uploadPhoto(fileChooserAvatar, previewAvatar);
  uploadPhoto(fileChooserPhoto, previewPhoto, true);

  window.photo = {
    resetImages: function () {
      removeFiles();
      removeAvatar();
      previewPhotoContainer.appendChild(createNewDiv());
    }
  };
})();
