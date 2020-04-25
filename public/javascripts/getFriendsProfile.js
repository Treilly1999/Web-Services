//Generate friends profile

function generateFriendsProfile() {
    //req friend information
    const req = new XMLHttpRequest();
    const id = getUrlParameter('id');
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const user = JSON.parse(req.response);
            document.getElementById("friend-username").innerText = `${user.username}'s Profile`;
            document.getElementById("friends-prof").innerText = `Their email is: ${user.email}`;
            document.getElementById("friend-birthday").innerText = `Their birthday is: ${user.birthday}`;
        }
    };
    req.open("GET", "http://68.9.212.228:8080/profile/getFriend/" + id, true);
    req.send();

    //req friends thread history
    const reqThread = new XMLHttpRequest();
    reqThread.onreadystatechange = function () {
        if (reqThread.readyState == 4 && reqThread.status == 200) {
            JSON.parse(reqThread.response).forEach(function(item) {
                $('#threadHistory').append('<h3 id="thread-topic"></h3><p id="date"></p><form id="viewThread" action="/threads/threadPages" method="get"><input type="submit" value="Go to thread"></form><br><br>');
                document.getElementById('viewThread').action = '/threads/threadPages/' + item._id;
                document.getElementById('thread-topic').innerText =  "Topic: " + item.topic;
                document.getElementById('viewThread').id = item._id;
                document.getElementById('thread-topic').id = item.topic;
                document.getElementById('date').innerText =  "Date posted: " + item.posted;
                document.getElementById('date').id = item.date;

            })

        }
    };
    reqThread.open("GET", "http://68.9.212.228:8080/profile/getFriendThreadHistory/" + id, true);
    reqThread.send();

    //req friends comment history
    const reqComment = new XMLHttpRequest();
    reqComment.onreadystatechange = function () {
        if (reqComment.readyState == 4 && reqComment.status == 200) {
            JSON.parse(reqComment.response).forEach(function(item) {
                $('#commentHistory').append('</h3><p id="date"></p><p id="comment"></p><form id="viewThread" action="/threads/threadPages" method="get"><input type="submit" value="Go to thread"></form><br><br>');
                document.getElementById('viewThread').action = '/threads/threadPages/' + item.threadID;
                document.getElementById('viewThread').id = item.threadID;
                document.getElementById('date').innerText =  "Date posted: " + item.posted;
                document.getElementById('date').id = item.date;
                document.getElementById('comment').innerText =  "Text: " + item.text;
                var comment = 1;
                document.getElementById('comment').id = "comment" + comment;
                comment++;

            })
        }
    };
    reqComment.open("GET", "http://68.9.212.228:8080/profile/getFriendCommentHistory/" + id, true);
    reqComment.send();
}