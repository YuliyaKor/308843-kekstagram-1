'use strict';
(function () {
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
    [userComments[window.getRandom(0, userComments.length)]],
    [userComments[window.getRandom(0, userComments.length)], userComments[window.getRandom(0, userComments.length)]]
  ];
  // массив фотографий пользователей, вкл лайки, комментарии и фото
  var getPhotos = function (value) {
    var photos = [];
    for (var i = 0; i < value; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.getRandom(15, 200),
        comments: randomComments[window.getRandom(0, randomComments.length)]
      });
    }
    return photos;
  };
  window.userPhotos = getPhotos(25);
})();
