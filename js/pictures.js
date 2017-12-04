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
  var overlayOpenHandler = function (evt) {
    evt.preventDefault();
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', overlayEscHandler);
    fillGalleryOverlay(userPhotos[i]);
  };
  return overlayOpenHandler;
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
// общая функция открыть окно
var overlayOpenHandler = function () {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', overlayEscHandler);
};
// общая функция закрыть окно
var overlayCloseHandler = function () {
  galleryOverlay.classList.add('hidden');
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
