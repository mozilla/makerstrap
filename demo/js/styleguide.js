angular.module('styleguide', ['ngRoute', 'ui.bootstrap', 'hljs'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/docs.html',
          controller: 'docsController'
        })
        .otherwise({redirectTo: '/'});
    }
  ])

  .directive('mason', ['$window',
    function($window) {
      return {
        restrict: 'EA',
        link: function(scope, el) {
          el.masonry = new $window.Masonry(el[0], {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            transitionDuration: '0.2s'
          });

          el.ready(function() {
             el.masonry.addItems([el]);
             el.masonry.reloadItems();
             el.masonry.layout();
          });
        }
      };
    }
  ])

  // based on https://github.com/iameugenejo/ngScrollTo
  // and https://github.com/alicelieutier/smoothScroll/
  .directive('scrollTo', ['$window',
    function($window) {
      return {
        restrict: 'A',
        compile: function(iElement, iAttributes) {

          var document = $window.document;
          var offset = parseInt(iAttributes.offset) || 0;
          var duration = iAttributes.duration || 500;

          // Get the top position of an element in the document
          var getTop = function(element) {
            if (element.nodeName === 'HTML') {
              return -window.pageYOffset
            }
            return element.getBoundingClientRect().top + offset + window.pageYOffset;
          }

          // Ease in out function thanks to:
          // http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
          var easeInOutCubic = function(t) {
            return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
          }

          // Calculate the scroll position
          var position = function(start, end, elapsed) {
            if (elapsed > duration) return end;
            return start + (end - start) * easeInOutCubic(elapsed / duration);
          }

          // The actual scroll function
          var smoothScroll = function(el) {
            var start = window.pageYOffset;

            if (typeof el === 'number') {
              var end = parseInt(el) + offset;
            } else {
              var end = getTop(el);
            }

            var clock = Date.now();
            var requestAnimationFrame = window.requestAnimationFrame ||
              window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
                function(fn) {
                  window.setTimeout(fn, 15);
              };

            var step = function() {
              var elapsed = Date.now() - clock;
              window.scroll(0, position(start, end, elapsed, duration));
              if (elapsed > duration) {
                // update location
              } else {
                requestAnimationFrame(step);
              }
            }
            step();
          }

          function scrollInto(idOrName) {
            // If no id or name, scroll to the top.
            if (!idOrName) {
              return smoothScroll(0, duration, offset);
            }

            // Check if an element can be found with id attribute
            var el = document.getElementById(idOrName) || document.getElementsByName(idOrName);

            if (el) {
              smoothScroll(el, duration, offset);
            }
          }

          return function(scope, element, attr) {
            element.bind('click', function() {
              scrollInto(attr.scrollTo);
            });
          };
        }
      };
    }
  ])
  .controller('navController', function($scope, $anchorScroll, $location) {
    $scope.isCollapsed = true;

    $scope.docsSections = [
      "colours",
      "typography",
      "lists",
      "buttons",
      "alerts",
      "forms",
      "tables",
      "logo",
      "userInfo",
      "LESSMixins",
      "gallery"
    ];

  })
  .controller('docsController', function($scope) {

    $scope.userbarCollapsed = true;

    $scope.colours = [{
        less: 'green',
        hex: '#3fb58e',
        bootstrap: 'primary'
      },
      // {
      //   less: 'darkgreen',
      //   hex: '#328f70'
      // },
      {
        less: 'navy',
        hex: '#013E5F',
        bootstrap: 'secondary'
      }, {
        less: 'blue',
        hex: '#27aae1',
        bootstrap: 'info'
      }, {
        less: 'yellow',
        hex: '#ffcd36',
        bootstrap: 'warning'
      }, {
        less: 'red',
        hex: '#c13832',
        bootstrap: 'danger'
      }, {
        less: 'orange',
        hex: '#ee8950'
      }, {
        less: 'lightyellow',
        hex: '#fff2cc'
      },
      // {
      //   less: 'darkyellow',
      //   hex: '#eab514'
      // },
      {
        less: 'grey',
        hex: '#4d4e53'
      }, {
        less: 'lightgrey',
        hex: '#e3eaee'
      }, {
        less: 'midgrey',
        hex: '#ddd'
      }, {
        less: 'white',
        hex: '#fff'
      }, {
        less: 'black',
        hex: '#000'
      }
    ];

    $scope.gallery = [{
      "url": "https://elsewhere.makes.org/popcorn/1if1",
      "contentType": "application/x-popcorn",
      "contenturl": "https://elsewhere.makes.org/popcorn/1if1_",
      "locale": "en_us",
      "title": "[Mozfest] Ah Ah Ah, Jurrasic Park Remix",
      "description": "Made on the green screen at Mozilla Festival 2013 by Stephen Fortune.",
      "author": "elsewhere",
      "tags": ["webmaker:p-02", "webmaker:featured", "mozfest", "jurrasicpark"],
      "thumbnail": "http://stuff.webmaker.org/editorial-assets/magicword.jpg",
      "remixedFrom": null,
      "likes": [{
        "_id": "52b079d5b0b26e1a50000066"
      }, {
        "_id": "52b079e5b0b26e1a50000067"
      }, {
        "_id": "52b079f4b0b26e1a50000068"
      }, {
        "_id": "52b07b31b0b26e1a50000069"
      }, {
        "_id": "52b07b7ab0b26e1a5000006a"
      }, {
        "userId": 657,
        "_id": "52b07ddeb0b26e1a50000084"
      }, {
        "userId": 103,
        "_id": "52c60cab7681c5c36f000015"
      }],
      "reports": [],
      "_id": "526bec455f463f7a69000027",
      "createdAt": 1382804549357,
      "updatedAt": 1388711083767,
      "username": "elsewhere",
      "emailHash": "716938e8d34ed1fe9902922fd80138a0"
    }, {
      "url": "https://laura.makes.org/thimble/protect-your-privacy",
      "contentType": "application/x-thimble",
      "contenturl": "https://laura.makes.org/thimble/protect-your-privacy_",
      "locale": "en_US",
      "title": "Protect Your Privacy",
      "description": "",
      "author": "",
      "tags": ["teach", "privacy", "criticalthought", "remixing", "webmaker:privacy"],
      "thumbnail": "http://stuff.webmaker.org/thumbnails/privacymatters-thumb.png",
      "remixedFrom": null,
      "likes": [{
        "userId": 1124,
        "_id": "52d4c5e75cf7e8b814000121"
      }, {
        "_id": "52dfdb307a411ee07f0000b3"
      }, {
        "_id": "52dfe2437a411ee07f0000df"
      }, {
        "_id": "52dfe2497a411ee07f0000e0"
      }],
      "reports": [],
      "remixurl": "https://laura.makes.org/thimble/protect-your-privacy/remix",
      "editurl": "https://laura.makes.org/thimble/protect-your-privacy/edit",
      "_id": "52ced2c941d5c6d52a000192",
      "createdAt": 1389286089129,
      "updatedAt": 1390404169930,
      "username": "laura",
      "emailHash": "a3d6ad96b7bbb4ff6ad47c349f73a007"
    }, {
      "url": "https://patrickwade.makes.org/thimble/privacy-collage-activity",
      "contentType": "application/x-thimble",
      "contenturl": "https://patrickwade.makes.org/thimble/privacy-collage-activity_",
      "locale": "",
      "title": "Privacy Collage Activity",
      "description": "Privacy workshop activity",
      "author": "",
      "tags": ["teach", "privacy", "webmaker:privacy"],
      "thumbnail": "http://farm4.staticflickr.com/3816/10491165934_58a170b630.jpg",
      "remixedFrom": "5213462240033992650001b3",
      "likes": [{
        "_id": "52dfdbb87a411ee07f0000bd"
      }, {
        "_id": "52dfe1cd7a411ee07f0000dd"
      }],
      "reports": [],
      "remixurl": "https://patrickwade.makes.org/thimble/privacy-collage-activity/remix",
      "editurl": "https://patrickwade.makes.org/thimble/privacy-collage-activity/edit",
      "_id": "5238e4b8393d397c50000012",
      "createdAt": 1379460280925,
      "updatedAt": 1390404045116,
      "username": "patrickwade",
      "emailHash": "496f953734d145b0dec9ca1b85de75ec"
    }, {
      "url": "https://karenlouisesmith.makes.org/popcorn/1j1j",
      "contentType": "application/x-popcorn",
      "contenturl": "https://karenlouisesmith.makes.org/popcorn/1j1j_",
      "locale": "en_us",
      "title": "Merkel privacy remix",
      "description": "",
      "author": "karenlouisesmith",
      "tags": ["privacy", "webmaker:privacy-5"],
      "thumbnail": "https://i1.ytimg.com/vi/GC-YPXXNMVU/hqdefault.jpg",
      "remixedFrom": null,
      "likes": [{
        "_id": "52dfde337a411ee07f0000cf"
      }],
      "reports": [],
      "remixurl": "https://karenlouisesmith.makes.org/popcorn/1j1j/remix",
      "editurl": "https://karenlouisesmith.makes.org/popcorn/1j1j/edit",
      "_id": "52758e705f463f7a69000157",
      "createdAt": 1383435888611,
      "updatedAt": 1390403123635,
      "username": "karenlouisesmith",
      "emailHash": "bfaa829d66e2cc77f8b62bd6cb696a06"
    }, {
      "url": "https://amrit.makes.org/thimble/merry-christmas-everybody",
      "contentType": "application/x-thimble",
      "contenturl": "https://amrit.makes.org/thimble/merry-christmas-everybody_",
      "locale": "en_US",
      "title": "[Holidays] Merry Christmas everybody!",
      "description": "Have a Merry Christmas and a happy new year! Made with Girls Who Code.",
      "author": "",
      "tags": ["webmaker:p-01", "webmaker:featured", "javascript", "hourofcode", "merrychristmas"],
      "thumbnail": "http://farm6.staticflickr.com/5150/5883733093_bcc7db3bf2_z.jpg",
      "remixedFrom": "5276362925213cb96c000167",
      "likes": [{
        "_id": "52b0791cb0b26e1a50000061"
      }, {
        "_id": "52b07935b0b26e1a50000062"
      }, {
        "_id": "52b0794ab0b26e1a50000063"
      }, {
        "_id": "52b07960b0b26e1a50000064"
      }, {
        "_id": "52b07994b0b26e1a50000065"
      }, {
        "_id": "52b07cc6b0b26e1a50000075"
      }, {
        "userId": 657,
        "_id": "52b07dddb0b26e1a50000083"
      }, {
        "userId": 103,
        "_id": "52c60c39ad3d4b9b2c000018"
      }],
      "reports": [],
      "_id": "52a6efdf803a2e6861000029",
      "createdAt": 1386672095276,
      "updatedAt": 1388710969427,
      "username": "amrit",
      "emailHash": "d6f7196aeffb84e4ba59e82560826be3"
    }, {
      "url": "https://stephguthrie.makes.org/thimble/girls-in-tech-teaching-kit",
      "contentType": "application/x-thimble",
      "contenturl": "https://stephguthrie.makes.org/thimble/girls-in-tech-teaching-kit_",
      "locale": "",
      "title": "[Mozfest] Girls in Tech Teaching Kit",
      "description": "Here are some activities and resources to help girls think critically about gender and the tech industry while empowering them as webmakers.",
      "author": "",
      "tags": ["webmaker:p-06", "webmaker:featured", "teach", "girls", "tech", "webmaker", "learn", "maketheweb", "women", "popcorn", "xraygoggles", "gender", "media", "medialiteracy", "webmaker:teach-4"],
      "thumbnail": "https://farm6.staticflickr.com/5324/10244640626_7dc80db19d.jpg",
      "remixedFrom": "521333f465cb5ff9180001fb",
      "likes": [{
        "userId": 51073,
        "_id": "526c0c7d25213cb96c000041"
      }, {
        "_id": "5270cedd5f463f7a690000c4"
      }, {
        "_id": "5270cfc8fe2ca871600000e1"
      }, {
        "userId": 6797,
        "_id": "5273f0fbe2c0b9346a000149"
      }, {
        "userId": 198,
        "_id": "52770a8de2c0b9346a00017c"
      }, {
        "userId": 37261,
        "_id": "5283c232717ff88765000045"
      }, {
        "_id": "52b07d99b0b26e1a5000007c"
      }, {
        "_id": "52b07da5b0b26e1a5000007d"
      }, {
        "_id": "52b07dadb0b26e1a5000007e"
      }, {
        "userId": 657,
        "_id": "52b07ddab0b26e1a50000082"
      }, {
        "userId": 103,
        "_id": "52c60c5dad3d4b9b2c00001b"
      }],
      "reports": [],
      "remixurl": "https://stephguthrie.makes.org/thimble/girls-in-tech-teaching-kit/remix",
      "editurl": "https://stephguthrie.makes.org/thimble/girls-in-tech-teaching-kit/edit",
      "_id": "526c08305f463f7a69000030",
      "createdAt": 1382811696951,
      "updatedAt": 1388711005515,
      "username": "stephguthrie",
      "emailHash": "bd92c6fe5049b3fa00f1547bd8891651"
    }, {
      "url": "https://pkittle.makes.org/popcorn/1hyl",
      "contentType": "application/x-popcorn",
      "contenturl": "https://pkittle.makes.org/popcorn/1hyl_",
      "locale": "en_us",
      "title": "[Mozfest] I always wanted a cat",
      "description": "This is an example of an annotated digital story for MozFest13 digital storytelling scrum. ",
      "author": "pkittle",
      "tags": ["webmaker:p-12", "webmaker:featured", "mozfest", "digitalstorytelling", "annotations", "webmaker:teach-5"],
      "thumbnail": "http://stuff.webmaker.org/editorial-assets/deccat.jpg",
      "remixedFrom": null,
      "likes": [{
        "_id": "5270e61dfe2ca871600000ed"
      }, {
        "_id": "5270e662fe2ca871600000ef"
      }, {
        "_id": "5270e673fe2ca871600000f0"
      }, {
        "_id": "5270e6905f463f7a690000d2"
      }, {
        "userId": 37261,
        "_id": "5283c22ff012f91654000034"
      }, {
        "_id": "52b0832ab0b26e1a500000b1"
      }, {
        "_id": "52b08343b0b26e1a500000b2"
      }, {
        "_id": "52b08350b0b26e1a500000b3"
      }, {
        "_id": "52b08359b0b26e1a500000b4"
      }],
      "reports": [],
      "remixurl": "https://pkittle.makes.org/popcorn/1hyl/remix",
      "editurl": "https://pkittle.makes.org/popcorn/1hyl/edit",
      "_id": "5265884dd9c30e0f7500000a",
      "createdAt": 1382385741704,
      "updatedAt": 1389975777959,
      "username": "pkittle",
      "emailHash": "900022638e5c4596ed8192c0b0e18fab"
    }, {
      "url": "https://patrickwade.makes.org/thimble/privacy-and-remix-workshop-teaching-kit",
      "contentType": "application/x-thimble",
      "contenturl": "https://patrickwade.makes.org/thimble/privacy-and-remix-workshop-teaching-kit_",
      "locale": "",
      "title": "Privacy and Remix Workshop Teaching Kit",
      "description": "",
      "author": "",
      "tags": ["teach", "webmaker:privacy", "webmaker:privacy-2"],
      "thumbnail": "http://farm6.staticflickr.com/5446/9781266116_f98279e110.jpg",
      "remixedFrom": "521333f465cb5ff9180001fb",
      "likes": [{
        "_id": "52dfdbd57a411ee07f0000be"
      }, {
        "_id": "52dfddfe7a411ee07f0000cd"
      }, {
        "_id": "52dfde047a411ee07f0000ce"
      }, {
        "_id": "52dfde9e7a411ee07f0000d0"
      }],
      "reports": [],
      "remixurl": "https://patrickwade.makes.org/thimble/privacy-and-remix-workshop-teaching-kit/remix",
      "editurl": "https://patrickwade.makes.org/thimble/privacy-and-remix-workshop-teaching-kit/edit",
      "_id": "522735bbded9e83b3a000024",
      "createdAt": 1378301371520,
      "updatedAt": 1390403230625,
      "username": "patrickwade",
      "emailHash": "496f953734d145b0dec9ca1b85de75ec"
    }, {
      "url": "https://juliahivenyc.makes.org/thimble/happy-holidays",
      "contentType": "application/x-thimble",
      "contenturl": "https://juliahivenyc.makes.org/thimble/happy-holidays_",
      "locale": "en_US",
      "title": "[Holidays] Hour of Code Holiday Bunny",
      "description": "I made a two-sided holiday card for Hour of Code featuring my bunny.",
      "author": "",
      "tags": ["webmaker:p-10", "webmaker:featured", "javascript", "letitsnow", "hourofcode", "hackaholidaycard"],
      "thumbnail": "http://stuff.webmaker.org/editorial-assets/Holidaybunny.JPG",
      "remixedFrom": "5276362925213cb96c000167",
      "likes": [{
        "_id": "52b081ddb0b26e1a50000099"
      }, {
        "_id": "52b081e3b0b26e1a5000009a"
      }, {
        "_id": "52b081f2b0b26e1a5000009c"
      }, {
        "_id": "52b08202b0b26e1a5000009d"
      }, {
        "_id": "52b08215b0b26e1a5000009e"
      }, {
        "_id": "52b083f1b0b26e1a500000b5"
      }, {
        "userId": 103,
        "_id": "52c60c6bad3d4b9b2c00001c"
      }],
      "reports": [],
      "_id": "52a9eb44f93815f07100018a",
      "createdAt": 1386867524918,
      "updatedAt": 1388711019230,
      "username": "juliahivenyc",
      "emailHash": "6177e61d7622978fa9c8ff43095a1c1d"
    }];

  });
