$(document).on("click", "#submit", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            name: $("#name").val(),
            // Value taken from note textarea
            body: $("#comment").val()
        }
    }).then(function(data){
        console.log(data)
    });
});

$(document).on("click", "#delete", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "DELETE",
        url: "/notes/" + thisId,
    }).then(
    $("#" + thisId).remove()
    );
});
