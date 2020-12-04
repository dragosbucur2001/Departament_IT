$(function() {
    var subjectsDropdown = $('#subjects');
    var entryTitle = $('#title');
    var entryList = $('#buyList');

    $.ajax({
        url: '/subjects',
        contentType: 'application/json',
        success: function (response) {
            subjectRefresh(response.subjects);
        }
    });

    $('#sendToBuy').on('click', function() {
        $.ajax({
            url: '/entries',
            contentType: 'application/json',
            success: function (response) {
                entryRefresh(response.entries);
            }
        });
    });

    $('#buyForm').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: '/entries',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                subject: subjectsDropdown.get(0).value,
                title: entryTitle.get(0).value
            }),
            success: function(response) {
                $('#closeModal').click();

                subjectsDropdown.get(0).value = "";
                entryTitle.get(0).value = "";

                entryRefresh(response.entries);
            }
        });
    });

    $('#buyList').on('click', '.deleteEntry', function() {
        var entry = $(this).attr('id');
        $.ajax({
            url: '/entries/' + entry,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                entryRefresh(response.entries);
                console.log(response.id);
            }
        })
    });

    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name');
        var email = $('#email');
        var feedback = $('#feedback');
        
        $.ajax({
            url: '/email',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: name.val().trim(),
                email: email.val().trim(),
                feedback: feedback.val().trim()
            }),
            success: function(response) {
                window.alert("Ai trimis cu succes mailul");
                name.val("");
                email.val("");
                feedback.val("");
            }
        });
    });

    function entryRefresh(entries) {
        entryList.html('');
        entries.forEach(function(entry) {
            entryList.append('\
                <li class="d-flex entry justify-content-between">\
                    <div>\
                        <h5>' + entry.title + '</h5>\
                        <h5>(' + entry.subject + ')</h5>\
                    </div>\
                    <button type="button" class="deleteEntry" id="' + entry.id + '">\
                        <i class="fas fa-times-circle fa-lg"></i>\
                    </button>\
                </li>\
            ');
        });

    }

    function subjectRefresh(subjects) {
        subjects.forEach(function (subject) {
            subjectsDropdown.append('\
                <option value="' + subject + '">' + subject + '</option>\
            ');
        });
    }
});

