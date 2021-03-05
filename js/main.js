let YOURLIFE = 100;
let ENEMYLIFE = 100;
const DIFFICULTY = ['easy', 'normal', 'hard']
const MEZAMASHI = document.querySelector('#mezamashivoice');
const HIKAKIN = document.querySelector('#hikakinvoice');
const SAZAE = document.querySelector('#sazaevoice');
const BATTLEBGM = document.querySelector('#battle-bgm');
const HIT = document.querySelector('#hit');
const MISS = document.querySelector('#miss');
const YOUWINSOUND = document.querySelector('#youwin');
const YOULOSESOUND = document.querySelector('#youlose');
const CONTINUE = document.querySelector('#continue-se');
const UUWAA = document.querySelector('#uuwaa-se');

function YOUWIN(){
  BATTLEBGM.pause();
  YOUWINSOUND.play();
  $(".bglayer").addClass('open');
  $(".win-text").removeClass('hide');
  $(".vs-img").addClass('hide');
  $(".roulette-img").css('filter', 'grayscale(100%)');
  $(".continue").removeClass('hide');
  $(".under-area").removeClass("hide");
}

function YOULOSE(){
  BATTLEBGM.pause();
  YOULOSESOUND.play();
  $(".bglayer").addClass('open');
  $(".lose-text").removeClass('hide');
  $(".vs-img").addClass('hide');
  $("#camera").css('filter', 'grayscale(100%)');
  $(".continue").removeClass('hide');
  $(".under-area").removeClass("hide");
}

// キャラ選択ルーレット
$(".roulette-start").on('click', function(){
  $(".under-area").addClass("hide");
  $("#caution").css('opacity', 0);
  $(".your-life").css('width', '100%');
  $(".enemy-life").css('width', '100%');
  $(".life-wrapper").removeClass("hide");
  $(".self-img-outer").css('opacity', 1);
  $(".vs-img-wrapper").css('opacity', 1);
  $(".gslogo-wrapper").css('opacity', 1);
  $(".btn-wrapper").css('pointer-events', 'none');


  if($(this).hasClass("easy")){
    $(".btn-wrapper").css('opacity', 0);
    var option = {
      speed : 50,
      duration : 1,
      stopImageNumber : 0,
    }
    $('#character-name').delay(1700).queue(function(){
      $(this).text("MEZAMASHI");
      MEZAMASHI.play();
      $(".janken-wrapper").removeClass("hide");
      $("#battle-start").click();
    });
    // アタックエリアのimgにもめざましくんの画像を入れ込む
    $(".rival-img").attr('src','img/MezamashikunFaceMain.jpg');
    // イージークラスを追加する
    $(".rival-img").addClass('easy');
  }
  if($(this).hasClass("normal")){
    var option = {
      speed : 50,
      duration : 1,
      stopImageNumber : 1,
    }
    $('#character-name').delay(1700).queue(function(){
      $(this).text("HIKAKIN");
      HIKAKIN.play();
      $(".janken-wrapper").removeClass("hide");
      $("#battle-start").click();
    });
    // アタックエリアのimgにもヒカキンの画像を入れ込む
    $(".rival-img").attr('src','img/HikakinFaceMain.jpg');
    // ノーマルクラスを追加する
    $(".rival-img").addClass('normal');
  }
  if($(this).hasClass("hard")){
    var option = {
      speed : 50,
      duration : 1,
      stopImageNumber : 2,
    }
    $('#character-name').delay(1700).queue(function(){
      $(this).text("SAZAE");
      SAZAE.play();
      $(".janken-wrapper").removeClass("hide");
      $("#battle-start").click();
    });
    // アタックエリアのimgにもサザエさんの画像を入れ込む
    $(".rival-img").attr('src','img/SazaeFaceMain.jpg');
    // ハードクラスを追加する
    $(".rival-img").addClass('hard');
  }
	$('div.roulette').roulette(option);
  $('div.roulette').roulette('start');
});




/** カメラ設定 */
const VIDEO = document.querySelector("#camera");

const CONSTRAINTS = {    // constraintsの意味は「制約」
  audio: false,
  video: {
    width: 200,
    height: 200,
    facingMode: "user"   // フロントカメラを利用する
    // facingMode: { exact: "environment" }  // リアカメラを利用する場合
  }
};

/**
 * [onload] カメラを<video>と同期
 */
function syncCamera(){
  navigator.mediaDevices.getUserMedia(CONSTRAINTS)
  .then( (stream) => {
    VIDEO.srcObject = stream;
    VIDEO.onloadedmetadata = (e) => {
      VIDEO.play();
    };
  })
  .catch( (err) => {
    console.log(`${err.name}: ${err.message}`);
  });
};
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーカメラつける
syncCamera();
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーカメラつける

// ーーーーーーーーーーージャンケンエリアーーーーーーーーーーー

const type = ["gu", "choki", "pa"];
var id;
var rand;

// 画像をシャッフルする関数を定義
function shuffleImage(){
  rand = Math.floor(Math.random()*3);
  $(".dealer-img").attr('src',`img/${type[rand]}.jpg`);
  id = setTimeout(function () {
    shuffleImage();
  }, 20);
}

$("#battle-start").on('click', function(){
  BATTLEBGM.play();
  shuffleImage();
  $(".jnkn-result-text").text("");
  $(".dealer-img").removeClass("hide");
});

// 自分の手を出すとシャッフルが止まるようにする
$(".jnkn-btn").on('click', function(){
  clearTimeout(id);
});

$(".gu").on('click', function(){
  if(type[rand] === "gu"){
    $(".jnkn-result-text").text("Draw!Again!");
    $('#battle-start').delay(1000).queue(function(){
      $(this).click();
      $(this).dequeue();
    });
  }
  if(type[rand] === "choki"){
    $(".jnkn-result-text").text("Win!Attack!");
    // アタックエリアを表示させるーーーーーーーーーーーーーーーーーーーーーーーーーーー
    ATKstart();
  }
  if(type[rand] === "pa"){
    $(".jnkn-result-text").text("Lose!Defense!");
    // ディフェンスエリアを表示させるーーーーーーーーーーーーーーーーーーーーーーーーーーー
    DFSstart();
  }
});

$(".choki").on('click', function(){
  if(type[rand] === "gu"){
    $(".jnkn-result-text").text("Lose!Defense!");
    // ディフェンスエリアを表示させるーーーーーーーーーーーーーーーーーーーーーーーーーーー
    DFSstart();
  }
  if(type[rand] === "choki"){
    $(".jnkn-result-text").text("Draw!Again!");
    $('#battle-start').delay(1000).queue(function(){
      $(this).click();
      $(this).dequeue();
    });
  }
  if(type[rand] === "pa"){
    $(".jnkn-result-text").text("Win!Attack!");
    // アタックエリアを表示させるーーーーーーーーーーーーーーーーーーーーーーーーーーー
    ATKstart();
  }
});

$(".pa").on('click', function(){
  if(type[rand] === "gu"){
    $(".jnkn-result-text").text("Win!Attack!");
    // アタックエリアを表示させるーーーーーーーーーーーーーーーーーーーーーーーーーーー
    ATKstart();
  }
  if(type[rand] === "choki"){
    $(".jnkn-result-text").text("Lose!Defense!");
    // ディフェンスエリアを表示させるーーーーーーーーーーーーーーーーーーーーーーーーーーー
    DFSstart();
  }
  if(type[rand] === "pa"){
    $(".jnkn-result-text").text("Draw!Again!");
    $('#battle-start').delay(1000).queue(function(){
      $(this).click();
      $(this).dequeue();
    });
  }
});

// ーーーーーーーーーーージャンケンエリアーーーーーーーーーーー

// ーーーーーーーーーーーアタックエリアーーーーーーーーーーー

// アタックスタートの関数を作る
function ATKstart(){
  $(".atk-result-text").text("");
  $(".attack-area").addClass("open");
  const r = Math.ceil( Math.random() * 4 );
  $(".rival-img").addClass("hide");
    if (r == 1){
      $(".rival-img").animate({zIndex:1},{
        //3秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".rival-img").css({transform:'rotate(' + (now * 7560) + 'deg)'});
          $("#down").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".rival-img").css('zIndex', 0);
        }
      })
    }
    if (r == 2){
      $(".rival-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".rival-img").css({transform:'rotate(' + (now * 7650) + 'deg)'});
          $("#left").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".rival-img").css('zIndex', 0);
        }
      })
    }
    if (r == 3){
      $(".rival-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".rival-img").css({transform:'rotate(' + (now * 7740) + 'deg)'});
          $("#up").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".rival-img").css('zIndex', 0);
        }
      })
    }
    if (r == 4){
      $(".rival-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".rival-img").css({transform:'rotate(' + (now * 7830) + 'deg)'});
          $("#right").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".rival-img").css('zIndex', 0);
        }
      })
    }
}

// ーーーーー以下アタックエリアの回答ボタンーーーーー

$(".atk-answer").click(function(){
    $(".rival-img").removeClass("hide");
    if($(this).hasClass("correct")){                   // 正解だった場合
      // 正解の音を鳴らして
      HIT.play();
      $(".atk-result-text").text("HIT!");
      if($(".rival-img").hasClass("easy")){
        ENEMYLIFE -= 100;
        console.log(ENEMYLIFE);
        $(".enemy-life").css('width', ENEMYLIFE + '%');
        UUWAA.play();
        $(".rival-img").delay(1500).queue(function(){
          YOUWIN();
        });
        return ENEMYLIFE;
      }
      else if($(".rival-img").hasClass("normal")){
        ENEMYLIFE -= 50;
        console.log(ENEMYLIFE);
        $(".enemy-life").css('width', ENEMYLIFE + '%');
        if(ENEMYLIFE <= 0){
          UUWAA.play();
        $(".rival-img").delay(1500).queue(function(){
          YOUWIN();
        });
          return ENEMYLIFE;
        }
      }
      else if($(".rival-img").hasClass("hard")){
        ENEMYLIFE -= 40;
        console.log(ENEMYLIFE);
        $(".enemy-life").css('width', ENEMYLIFE + '%');
        if(ENEMYLIFE <= 0){
          UUWAA.play();
        $(".rival-img").delay(1500).queue(function(){
          YOUWIN();
        });
          return ENEMYLIFE;
        }
      }
        // もう一度じゃんけんをスタートさせる
        $("#battle-start").click();
        // correctクラスをremoveして
        $(".atk-answer").removeClass("correct");
        // アタックエリアを非表示にして（openクラスを取り除いて）
        $(".attack-area").delay(1000).queue(function(){
          $(this).removeClass("open");
          $(".rival-img").css('transform', 'none');
          $(this).dequeue();
        });
      return ENEMYLIFE;
      } else {
        MISS.play();
        $(".atk-result-text").text("MISS!");
        // もう一度じゃんけんをスタートさせる
        $("#battle-start").click();
        // correctクラスをremoveして
        $(".atk-answer").removeClass("correct");
        // アタックエリアを非表示にして（openクラスを取り除いて）
        $(".attack-area").delay(1000).queue(function(){
          $(this).removeClass("open");
          $(".rival-img").css('transform', 'none');
          $(this).dequeue();
        });
      }
    });


// ーーーーーーーーーーーアタックエリアーーーーーーーーーーー

// ーーーーーーーーーーーディフェンスエリアーーーーーーーーーーー
// ディフェンススタートの関数を作る
function DFSstart(){
  $(".dfs-result-text").text("");
  $(".defense-area").addClass("open");
  const dr = Math.ceil( Math.random() * 4 );
  $(".finger-img").addClass("hide");
    if (dr == 1){
      $(".finger-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".finger-img").css({transform:'rotate(' + (now * 7560) + 'deg)'});
          $("#up-dfs").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".finger-img").css('zIndex', 0);
        }
      })
    }
    if (dr == 2){
      $(".finger-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".finger-img").css({transform:'rotate(' + (now * 7650) + 'deg)'});
          $("#right-dfs").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".finger-img").css('zIndex', 0);
        }
      })
    }
    if (dr == 3){
      $(".finger-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".finger-img").css({transform:'rotate(' + (now * 7740) + 'deg)'});
          $("#down-dfs").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".finger-img").css('zIndex', 0);
        }
      })
    }
    if (dr == 4){
      $(".finger-img").animate({zIndex:1},{
        //2秒かけてアニメーション
        duration:3000,
        //stepは、アニメーションが進むたびに呼ばれる
        step:function(now){
          //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
          //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
          $(".finger-img").css({transform:'rotate(' + (now * 7830) + 'deg)'});
          $("#left-dfs").addClass("correct");
        },
        //終わったら
        complete:function(){
          //次のために、元に戻しておく
          $(".finger-img").css('zIndex', 0);
        }
      })
    }
}

// ーーーーー以下ディフェンスエリアの回答ボタンーーーーー

$(".dfs-answer").click(function(){
    $(".finger-img").removeClass("hide");
    if($(this).hasClass("correct")){                   // 正解だった場合
      // ダメージをくらう音を鳴らして
      HIT.play();
      $(".dfs-result-text").text("HIT!");
      // 難易度によってダメージをうける
      if($(".rival-img").hasClass("hard")){
        YOURLIFE -= 100;
        console.log(YOURLIFE);
        $(".your-life").css('width', YOURLIFE + '%');
        UUWAA.play();
        $(".rival-img").delay(1500).queue(function(){
          YOULOSE();
        });
        return YOURLIFE;
      }
      else if($(".rival-img").hasClass("normal")){
        YOURLIFE -= 50;
        console.log(YOURLIFE);
        $(".your-life").css('width', YOURLIFE + '%');
        if(YOURLIFE <= 0){
          UUWAA.play();
          $(this).delay(1500).queue(function(){
            YOULOSE();
          });
          return YOURLIFE;
        }
      }
      else if($(".rival-img").hasClass("easy")){
        YOURLIFE -= 40;
        console.log(YOURLIFE);
        $(".your-life").css('width', YOURLIFE + '%');
        if(YOURLIFE <= 0){
          UUWAA.play();
          $(this).delay(1500).queue(function(){
            YOULOSE();
          });
          return YOURLIFE;
        }
      }
      // もう一度じゃんけんをスタートさせる
      $("#battle-start").click();
      // correctクラスをremoveして
      $(".dfs-answer").removeClass("correct");
      // アタックエリアを非表示にして（openクラスを取り除いて）
      $(".defense-area").delay(1000).queue(function(){
        $(this).removeClass("open");
        $(".finger-img").css('transform', 'none');
        $(this).dequeue();
      });
      return YOURLIFE;
      } else {
        MISS.play();
        $(".dfs-result-text").text("MISS!");
        // もう一度じゃんけんをスタートさせる
        $("#battle-start").click();
        // correctクラスをremoveして
        $(".dfs-answer").removeClass("correct");
        // アタックエリアを非表示にして（openクラスを取り除いて）
        $(".defense-area").delay(1000).queue(function(){
          $(this).removeClass("open");
          $(".finger-img").css('transform', 'none');
          $(this).dequeue();
        });
      }
    });

// ーーーーーーーーーーーディフェンスエリアーーーーーーーーーーー

// ーーーーーーーーーーー結果発表画面ーーーーーーーーーーー
$(".continue").on('click', function(){
  CONTINUE.play();
  $(this).delay(1000).queue(function(){
    location.reload();
  });
});
// ーーーーーーーーーーー結果発表画面ーーーーーーーーーーー

