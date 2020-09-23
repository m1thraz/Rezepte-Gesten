var cooldown = false;

class MyTarget extends EventTarget {}
const target = new MyTarget();
target.addEventListener('onSpeech', () => {
    var text = event.detail.recognized;
    // if(cooldown) {
    //     return;
    // }
    console.log("Erkannt: " + event.detail.recognized);
    if(text.includes('weiter') || text.includes('runter')) {
            ws.goNext();
            startCoolDown()
    }
    else if(text.includes('zurück') || text.includes('hoch')) {
            ws.goPrev()
            startCoolDown()
    }
    else if(text.includes('timer starten') || text.includes('timer beginnen')) {
            timerzeigen();
            startCoolDown()
    }
    else if(text.includes('zum anfang') || text.includes('zum beginn')) {
            ws.goToSlide(1, false);
            startCoolDown()
    }

    // switch() {
    //     case 'weiter':
    //         ws.goNext();
    //     break;
    //     case 'zurück' :
    //         ws.goPrev()
    //     break;
    //     case 'runter':
    //         ws.goNext();
    //     break;
    //     case 'hoch' :
    //         ws.goPrev()
    //     break;
    //     case 'timer starten' :
    //         timerzeigen();
    //     break;
    //     case 'timer stoppen' :
    //         timerzeigen();
    //     break;
    //     case 'timer zurücksetzen' :
    //         timerzeigen();
    //     break;
    //     case 'gehe zum anfang' :
    //         // timerzeigen();
    //         ws.goToSlide(1, false);
    //     break;

    //     default:
    //     break;
    // }
}
);



var controller = Leap.loop({enableGestures: true}, function(frame){
    if(frame.valid && frame.gestures.length > 0 && cooldown == false){
      frame.gestures.forEach(function(gesture){
        cooldown = true;
        sleep(1000).then(() => {
            cooldown = false;
        });
          switch (gesture.type){
            case "circle":
                console.log("Circle Gesture");
                break;
            case "keyTap":
                console.log("Key Tap Gesture");
                break;
            case "screenTap":
                console.log("Screen Tap Gesture");
                timerzeigen();
                break;
            case "swipe":
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                if(isHorizontal){
                    if(gesture.direction[0] > 0){
                        swipeDirection = "right";
                        ws.goPrev()

                    } else {
                        swipeDirection = "left";
                        ws.goNext();

                    }
                } else { //vertical
                    if(gesture.direction[1] > 0){
                        swipeDirection = "up";
                        ws.goNext();

                    } else {
                        swipeDirection = "down";
                        ws.goPrev()
                    }                  
                }
                console.log(swipeDirection);
                break;
          }
      });
    }
  });


function startCoolDown() {
    cooldown = true;
    console.log(cooldown);
    sleep(1000).then(() => {
        cooldown = false;
    });
  }

  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }