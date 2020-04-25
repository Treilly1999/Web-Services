//Generate Profile for user

function generateProfile() {
    var userID = "";

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const user = JSON.parse(req.response).user;
            document.getElementById("profile-name").innerText = `Your current user name is: ${user.username}. Note you will be logged out after changing username.`;
            document.getElementById("profile-email").innerText = `Your current email is: ${user.email}`;
            document.getElementById("profile-birthday").innerText = `Your birthday is: ${user.birthday}`
            document.getElementById("profile-realname").innerText = `Hello ${user.name}, welcome to your profile page.`;

            //req user thread history
            const reqThread = new XMLHttpRequest();
            reqThread.onreadystatechange = function () {
                if (reqThread.readyState == 4 && reqThread.status == 200) {
                    JSON.parse(reqThread.response).forEach(function(item) {
                        $('#threadHistory').append('<h3 id="thread-topics"></h3><p id="dates"></p><form id="viewThreads" action="/threads/threadPages" method="get"><input type="submit" value="Go to thread"></form><br><br>');
                        document.getElementById('viewThreads').action = '/threads/threadPages/' + item._id;
                        document.getElementById('thread-topics').innerText =  "Topic: " + item.topic;
                        document.getElementById('viewThreads').id = item._id;
                        document.getElementById('thread-topics').id = item.topic;
                        document.getElementById('dates').innerText =  "Date posted: " + item.posted;
                        document.getElementById('dates').id = item.date;

                    })

                }
            };
            reqThread.open("GET", "http://68.9.212.228:8080/profile/getFriendThreadHistory/" + user._id, true);
            reqThread.send();

            //req user comment history
            const reqComment = new XMLHttpRequest();
            reqComment.onreadystatechange = function () {
                if (reqComment.readyState == 4 && reqComment.status == 200) {
                    JSON.parse(reqComment.response).forEach(function(item) {
                        $('#commentHistory').append('</h3><p id="dates"></p><p id="comments"></p><form id="viewThreads" action="/threads/threadPages" method="get"><input type="submit" value="Go to thread"></form><br><br>');
                        document.getElementById('viewThreads').action = '/threads/threadPages/' + item.threadID;
                        document.getElementById('viewThreads').id = item.threadID;
                        document.getElementById('dates').innerText =  "Date posted: " + item.posted;
                        document.getElementById('dates').id = item.date;
                        document.getElementById('comments').innerText =  "Text: " + item.text;
                        var comment = 1;
                        document.getElementById('comments').id = "comment" + comment;
                        comment++;

                    })
                }
            };
            reqComment.open("GET", "http://68.9.212.228:8080/profile/getFriendCommentHistory/" + user._id, true);
            reqComment.send();

        }
    };
    req.open("GET", "http://68.9.212.228:8080/users/user", true);
    req.send();
}