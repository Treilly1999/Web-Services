//Get friend status'

function getFriendStatus() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        var friendCounter = 1;
        if (req.readyState == 4 && req.status == 200) {
            JSON.parse(req.response).forEach(function(item) {

                if (item.status == "requested") {
                    $('#requestDump').append('<p id="requested"></p>');
                    document.getElementById("requested").innerText = "You have requested: " + item.friend.username;
                    document.getElementById("requested").id = 'requested' + friendCounter;

                }
                if (item.status == "pending") {
                    $('#pendingTextHere').append('<p id="pending"></p>');
                    document.getElementById("pending").innerText = `You have a friend request from: ${item.friend.username}.`;
                    document.getElementById("pending").id = 'pending' + friendCounter;
                    $('#acceptDecline').append('<form action="/friends/friendAccept" id="acceptFriend" method="post"><input type="submit" value="Accept"></form>');
                    document.getElementById("acceptFriend").action = '/friends/friendAccept/' + item.friend._id;
                    $('#acceptDecline').append('<form action="/friends//friendRemove" id="friendRemoves" method="post"><input type="submit" value="Decline"></form>');
                    document.getElementById("friendRemoves").action = '/friends/friendRemove/' + item.friend._id;
                    document.getElementById("friendRemoves").id = 'friendRemoves' + friendCounter;
                }
                if (item.status == "accepted")
                {
                    $('#acceptDump').append('<p id="friend"></p>');
                    document.getElementById("friend").innerText = friendCounter +". " + item.friend.username;
                    document.getElementById("friend").id = 'friend' + friendCounter;
                    $('#acceptDump').append('<form id="viewProfile" method="get"><input type="submit" value="View Profile"></form>');
                    document.getElementById("viewProfile").action = '/profile/friendProfile/' + item.friend._id;
                    document.getElementById("viewProfile").id = 'viewProfile' + friendCounter;
                    $('#acceptDump').append('<form action="/friends/friendRemove" id="friendRemove" method="post"><input type="submit" value="Remove"></form>');
                    document.getElementById("friendRemove").action = '/friends/friendRemove/' + item.friend._id;
                    document.getElementById("friendRemove").id = 'friendRemove' + friendCounter;

                }
                friendCounter++;
            });
        }
    };
    req.open("GET", "http://68.9.212.228:8080/friends/getFriendStatus", true);
    req.send();
}

function sendError() {
        const info = getUrlParameter("info");

        if(info) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.innerText = info;
            errorMessage.style.display = "block";
        }
}