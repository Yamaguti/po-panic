

function showPopup(popup) {
    function animatePopup() {
        popup.position.y -= 10

        if (popup.position.y > centerY) {
            requestAnimationFrame(animatePopup);
        }
    }
    requestAnimationFrame(animatePopup);
}


function newPopup(msg) {
    // create a new Sprite using the texture
    var texture = PIXI.Texture.fromImage('assets/options_popup.png');
    var popup = new PIXI.Sprite(texture);
    stage.addChild(popup)

    // center the sprite's anchor point
    popup.anchor.x = 0.5;
    popup.anchor.y = 0.5;

    popup.position.x = centerX;
    popup.position.y = centerY;

    popup.position.y = screenBottom

    popup.showPopup = function() {
        showPopup(popup)
    }

    return popup
}

