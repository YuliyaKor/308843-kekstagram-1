'use strict';
// получить случайное число
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// массив комментариев
var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
// массив фотографий пользователей, вкл лайки, комментарии и фото
var showPhoto = function (value) {
  var photos = [];
  for (var i = 0; i < value; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: userComments[getRandom(0, userComments.length - 1)]
    });
  }
  return photos;
};
var userPhotos = showPhoto(25);
// шаблон
var similarPictureTemplate = document.querySelector('#picture-template').content;
// элемент
var similarPictureElement = document.querySelector('.pictures');
// заполнение шаблона
var getPicture = function (picture) {
  var newPicture = similarPictureTemplate.cloneNode(true);
  newPicture.querySelector('img').src = picture.url;
  newPicture.querySelector('.picture-likes').textContent = picture.likes;
  newPicture.querySelector('.picture-comments').textContent = picture.comments;
  return newPicture;
};
// заполнение блока
var renderPicture = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < userPhotos.length; i++) {
    fragment.appendChild(getPicture(userPhotos[i]));
  }
  similarPictureElement.appendChild(fragment);
};
renderPicture();
// показать элемент
var openPicture = document.querySelector('.gallery-overlay');
openPicture.classList.remove('hidden');
// заполнить элемент данными
var fillOpenPicture = function (count) {
  openPicture.querySelector('.gallery-overlay-image').src = userPhotos[count].url;
  openPicture.querySelector('.likes-count').textContent = userPhotos[count].likes;
  openPicture.querySelector('.comments-count').textContent = userPhotos[count].comments;
};
fillOpenPicture(0);
