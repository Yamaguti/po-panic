
var MultipressButton = {}

MultipressButton.new = function(spritePath, buttonParams) {
    var button = Button.newButton(spritePath, buttonParams)

    var oldMouseup = button.mouseup

    // degambs another gambs
    button.mouseup = function() {
        oldMouseup();
        button.interactive = true
    }

    return button
}
