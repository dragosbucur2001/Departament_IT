const subjects = ["USO", "Mate 1", "Mate 2", "Metode Numerice"];
var entries = [
    {
        subject: "USO",
        title: "Tema 2 ajutor"
    },
    {
        subject: "Mate 1",
        title: "Face vreunu o integrala?"
    },
    {
        subject: "Mate 2",
        title: "Face vreunu o matrice?"
    }
]

var subjectsDropdown = $('#subjects');
var entryList = $('#buyList');
var entryTitle = $('#title');

subjects.forEach(function (subject) {
    subjectsDropdown.append('\
        <option value="' + subject + '">' + subject + '</option>\
    ');
});

entryRefresh();

$('#buyForm').submit(function (e) {
    e.preventDefault();
    entries.unshift(
        {
            subject: subjectsDropdown.get(0).value,
            title: entryTitle.get(0).value
        }
    )
    $('#closeModal').click();
    entryRefresh();
    subjectsDropdown.get(0).value = "";
    entryTitle.get(0).value = "";
});

function entryRefresh() {
    var i = 0;
    entryList.html('');
    entries.slice(0, 5).forEach(function (entry) {
        i++;
        entryList.append('\
            <li class="d-flex justify-content-between">\
                <div>\
                    <h5>' + entry.title + '</h5>\
                    <h5>(' + entry.subject + ')</h5>\
                </div>\
                <button type="button" class="deleteEntry" id="' + i + '">\
                    <i class="fas fa-times-circle fa-lg"></i>\
                </button>\
            </li>\
        ');
    });

   entryDeleteAsign(); 
}

function entryDeleteAsign() {
    for(let j = 1; j <= Math.min(entries.length, 5); j++) {
        $('#' + j).on('click', function() {
            entries.splice(j - 1, 1);
            entryRefresh();
        });
    }
}