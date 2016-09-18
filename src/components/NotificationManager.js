

var NotificationManager = {}


NotificationManager.registerTable = {}


NotificationManager.register = function(notification, callback) {
    NotificationManager.registerTable[notification] = NotificationManager.registerTable[notification] || []
    var listenerArray = NotificationManager.registerTable[notification]

    listenerArray.push(callback)
}


// Thanks to http://stackoverflow.com/questions/5767325/how-to-remove-a-particular-element-from-an-array-in-javascript
NotificationManager.deregister = function(notification, callback) {
    NotificationManager.registerTable[notification] = NotificationManager.registerTable[notification] || []
    var listenerArray = NotificationManager.registerTable[notification]

    var index = listenerArray.indexOf(callback);
    if (index >= 0) {
        // this is not suported on internet explorer, apparently
        listenerArray.splice(index, 1);
    }

    // Remove array if empty
    if (listenerArray.length == 0) {
        delete NotificationManager.registerTable[notification]
    }
}


NotificationManager.notify = function(notification) {
    NotificationManager.registerTable[notification] = NotificationManager.registerTable[notification] || []
    var listenerArray = NotificationManager.registerTable[notification]
    var results = []

    for (i = 0; i < listenerArray.length; i++) {
        var callback = listenerArray[i]
        results.push(callback(arguments[1]))
    }

    return results
}
