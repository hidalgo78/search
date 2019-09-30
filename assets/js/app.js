$(function() {
    if (window.location.href.indexOf("results") > -1) {
        loadData();
    }

    function ValidateEmail(inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        } else {
            return false;
        }
    }

    var search = $('.js-search');
    search.on("click", function(event) {
        var email = $('.js-email-s').val();
        var msg =   $('.fail-msg');
        var found = false;
        var searchInput = searchInput;
        event.preventDefault();

        if (ValidateEmail(email)) {

            msg.fadeOut('fast');
            searchInput.removeClass("fail");
            $.ajax({
                url: 'http://search.csdev1.com/data.json',
                dataType: 'json',
                success: function(data) {
                    $.each(data, function(key, val) {
                        $.each(val, function(key, val) {
                            if (val.email === email) {
                                found = true;
                                window.localStorage.setItem('data', JSON.stringify(val));
                                window.location.href = "/results.html";
                            } else {
                                found = false;
                            }
                        });
                    });
                    if (found == false) {
                        setTimeout(function() {
                            msg.text('No info for this email address..Please try again!');
                            msg.fadeIn('fast');
                        }, 500);
                    }
                },
                statusCode: {
                    404: function() {
                        alert('There was a problem with the server.  Try again soon!');
                    }
                }
            });
        } else {
            searchInput.addClass('fail');
            msg.text('Please add a valid email address');
            msg.fadeIn('fast');
        }
    });

    function loadData() {
        var dataFrom = JSON.parse(window.localStorage.getItem('data'));
        var name = dataFrom.name;
        var age = dataFrom.age;
        var adress = dataFrom.address;
        var email = dataFrom.email;
        var phones = dataFrom.phoneNumbers;
        var relatives = dataFrom.relatives;
        var notes = dataFrom.notes;

        var rName = "<h3>" + name + ", <span>" + age + "</span></h3>";
        $('.js-name h3').html(rName);
        $('.js-name p').text(notes);
        $('.js-adress p').text(adress);
        $('.js-email p').text(email);

        $.each(phones, function(key, val) {
            if (val.phone) {
                $('.js-numbers').append("<a href='tel:" + val.phone + "'>" + val.phone + "</a>");
            }else {
                $('.js-relatives').append("<p>No info available</p>");
            }
        });
        $.each(relatives, function(key, val) {
            if (val.name) {
                $('.js-relatives').append("<p>" + val.name + "</p>");
            }else {
                $('.js-relatives').append("<p>No info available</p>");
            }
        });
    }
});
