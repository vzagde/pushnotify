/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        alert("On DeviceReady");
        PushbotsPlugin.initializeAndroid("56be37e0177959e76e8b4568", "633137522062");
        alert("Device is Android");
        if(PushbotsPlugin.isAndroid()){

        }

        if(PushbotsPlugin.isiOS()){
            PushbotsPlugin.initializeiOS("56be37e0177959e76e8b4568");
        }

        // Should be called once app receive the notification
        Pushbots.on("notification:received", function(data){
            console.log("received:" + JSON.stringify(data));
        });

        // Should be called once the notification is clicked
        // **important** Doesn't work with iOS while app is closed
        function myMsgClickHandler(msg){
            console.log("Clicked On notification" + JSON.stringify(msg));
            alert(JSON.stringify(msg));
        }
        PushbotsPlugin.onNotificationClick(myMsgClickHandler);

        // Should be called once the device is registered successfully with Apple or Google servers
        Pushbots.on("registered", function(token){
            console.log(token);
            alert("registered :"+token);
        });

        Pushbots.getRegistrationId(function(token){
            console.log("Registration Id:" + token);
            alert("Registration Id :"+token);
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

app.initialize();