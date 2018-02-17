$(document).on("click", "#submit", function () {
    event.preventDefault();
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            name: $("#name_"+thisId).val(),
            // Value taken from note textarea
            body: $("#comment_"+thisId).val()
        }

    }).then(function(data){
        if(data){
            location.reload();
        }
    });
});

$(document).on("click", "#delete", function () {
    // Grab the id associated with the article from the submit button
    var deleteId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/notes/" + deleteId,
    }).then(
    $("#" + deleteId).remove()
    );
});
