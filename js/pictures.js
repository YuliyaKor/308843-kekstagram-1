'use strict';
// получить случайное число
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
// обозначение клавиш
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
// массив комментариев
var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// масив случайных комментариев
var randomComments = [
  [userComments[getRandom(0, userComments.length)]],
  [userComments[getRandom(0, userComments.length)], userComments[getRandom(0, userComments.length)]]
];
// массив фотографий пользователей, вкл лайки, комментарии и фото
var getPhotos = function (value) {
  var photos = [];
  for (var i = 0; i < value; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: randomComments[getRandom(0, randomComments.length)]
    });
  }
  return photos;
};
var userPhotos = getPhotos(25);
// шаблон
var similarPictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

// элемент
var similarPictureElement = document.querySelector('.pictures');
// заполнение шаблона
var getPicture = function (picture) {
  var newPicture = similarPictureTemplate.cloneNode(true);
  newPicture.querySelector('img').src = picture.url;
  newPicture.querySelector('.picture-likes').textContent = picture.likes;
  newPicture.querySelector('.picture-comments').textContent = picture.comments.length;
  return newPicture;
};
// заполнение блока
var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < userPhotos.length; i++) {
    var pictureOne = getPicture(userPhotos[i]);
    pictureOne.addEventListener('click', pictureClickHandler(i));
    fragment.appendChild(pictureOne);
  }
  similarPictureElement.appendChild(fragment);
};
var pictureClickHandler = function (i) {
  return function (evt) {
    evt.preventDefault();
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', overlayEscHandler);
    fillGalleryOverlay(userPhotos[i]);
  };
};
renderPictures();
// окно с картинкой
var galleryOverlay = document.querySelector('.gallery-overlay');
// заполнить окно данными
var fillGalleryOverlay = function (photo) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
};
// закрыть окно Esc
var overlayEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    overlayCloseHandler();
  }
};
// общая функция закрыть окно
var overlayCloseHandler = function () {
  galleryOverlay.classList.add('hidden');
  uploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', overlayEscHandler);
};
// закрыть окно кликом
var closeGallary = galleryOverlay.querySelector('.gallery-overlay-close');
closeGallary.addEventListener('click', overlayCloseHandler);
// закрыть окно клавишей
closeGallary.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    overlayCloseHandler();
  }
});
// форма загрузки
var imageForm = document.querySelector('#upload-select-image');
// поле загрузки файла
var aploadFile = imageForm.querySelector('#upload-file');
// форма кадрирования изображения
var uploadOverlay = imageForm.querySelector('.upload-overlay');
// открытие формы кадрирования
aploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', overlayEscHandler);
});
// закрытие формы кадрирования
var formCancel = imageForm.querySelector('.upload-form-cancel');
formCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', overlayEscHandler);
});
// отмена Esc при фокусе на комментарии
var comment = uploadOverlay.querySelector('.upload-form-description');
comment.addEventListener('focus', function () {
  document.removeEventListener('keydown', overlayEscHandler);
});
comment.addEventListener('blur', function () {
  document.addEventListener('keydown', overlayEscHandler);
});
// поле с эффектами
var fieldsetEffect = document.querySelector('.upload-effect-controls');
// картинка
var imagePreview = document. querySelector('.effect-image-preview');
// делегирование
fieldsetEffect.addEventListener('change', function (evt) {
  var target = evt.target.value;
  imagePreview.className = 'effect-image-preview effect-' + target + '';
});
// изменение масштаба изображения
var buttonSmall = document.querySelector('.upload-resize-controls-button-dec');
var buttonBig = document.querySelector('.upload-resize-controls-button-inc');
var buttonValue = document.querySelector('.upload-resize-controls-value');
buttonSmall.addEventListener('click', function () {
  if (parseFloat(buttonValue.value) > +buttonValue.min) {
    buttonValue.value = '' + (parseFloat(buttonValue.value) - buttonValue.step) + '%';
    imagePreview.style = 'transform: scale(' + parseFloat(buttonValue.value) / buttonValue.max + ')';
  }
});
buttonBig.addEventListener('click', function () {
  if (parseFloat(buttonValue.value) < +buttonValue.max) {
    buttonValue.value = '' + (parseFloat(buttonValue.value) + +buttonValue.step) + '%';
    imagePreview.style = 'transform: scale(' + parseFloat(buttonValue.value) / buttonValue.max + ')';
  }
});
// валидация формы!!!!!
var teg = document.querySelector('.upload-form-hashtags');
var hashtagsValid = function () {
  if (teg.value.length === 0) {
    return false;
  }
  var tegSplit = teg.value.split(' ');
  var teglength = tegSplit.length;
  if (teglength > 5) {
    return true;
  }
  for (var i = 0; i < teglength; i++) {
    if (tegSplit[i][0] !== '#') {
      return true;
    }
    if (tegSplit[i].length > 20) {
      return true;
    }
    for (var j = 0; j < length; j++) {
      if (tegSplit[i].toLowerCase() === tegSplit[j].toLowerCase() && i !== j) {
        return true;
      }
    }
  }
  return false;
};

var submitFormHandler = function (evt) {
  if (hashtagsValid() === true) {
    teg.style.borderColor = 'red';
    evt.preventDefault();
  }
};
imageForm.addEventListener('submit', submitFormHandler);
