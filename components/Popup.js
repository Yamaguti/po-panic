

function showPopup(popup) {
    TransitionManager.startTransition(popup.position, {
        "time" : 1000,
        "y" : centerY,
        "easing" : "outQuad",
    })
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
    popup.position.y = screenBottom

    popup.showPopup = function() {
        showPopup(popup)
    }

    return popup
}

