//Generate Profile for user

function generateProfile() {
    var userID = "";

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const user = JSON.parse(req.response).user;
            document.getElementById("profile-name").innerText = `Your current user name is: ${user.username}.`;
            document.getElementById("profile-email").innerText = `Your current email is: ${user.email}`;
            document.getElementById("profile-birthday").innerText = `Birthday: ` + correctDate(user.birthday, 1);
            document.getElementById("profile-realname").innerText = `Your Profile`;

            //req user thread history
            const reqThread = new XMLHttpRequest();
            reqThread.onreadystatechange = function () {
                if (reqThread.readyState == 4 && reqThread.status == 200) {
                    JSON.parse(reqThread.response).forEach(function(item) {
                        $('#threadHistory').append('<h3 id="thread-topics"></h3><p id="dates"></p><form id="viewThreads" action="/threads/threadPages" method="get"><input class="submit" type="submit" value="Go to thread"></form><br><br>');
                        document.getElementById('viewThreads').action = '/threads/threadPages/' + item._id;
                        document.getElementById('thread-topics').innerText =  "Topic: " + item.topic;
                        document.getElementById('viewThreads').id = item._id;
                        document.getElementById('thread-topics').id = item.topic;
                        document.getElementById('dates').innerText =  "Date posted: " + correctDate(item.posted, 2);
                        document.getElementById('dates').id = item.date;

                    })

                }
                if(reqThread.status==404)
                {
                     $('#threadHistory').append('<p>No thread history</p>');

                }
            };
            reqThread.open("GET", "http://70.175.220.179:8080/profile/getFriendThreadHistory/" + user._id, true);
            reqThread.send();

            //req user comment history
            const reqComment = new XMLHttpRequest();
            reqComment.onreadystatechange = function () {
                if (reqComment.readyState == 4 && reqComment.status == 200) {
                    JSON.parse(reqComment.response).forEach(function(item) {
                        $('#commentHistory').append('</h3></p><p id="comments"></p><p id="dates"><form id="viewThreads" action="/threads/threadPages" method="get"><input class="submit" type="submit" value="Go to thread"></form><br><br>');
                        document.getElementById('viewThreads').action = '/threads/threadPages/' + item.threadID;
                        document.getElementById('viewThreads').id = item.threadID;
                        document.getElementById('comments').innerText =  "Comment: " + item.text;
                        var comment = 1;
                        document.getElementById('comments').id = "comment" + comment;
                        comment++;
                        document.getElementById('dates').innerText =  "Date posted: " + correctDate(item.posted, 2);
                        document.getElementById('dates').id = item.date;


                    })
                }
                if(reqComment.status == 404)
                {
                    $('#commentHistory').append('<p>No comment history</p>');

                }
            };
            reqComment.open("GET", "http://70.175.220.179:8080/profile/getFriendCommentHistory/" + user._id, true);
            reqComment.send();


            //req user comment history
            const reqImage = new XMLHttpRequest();
            reqImage.onreadystatechange = function () {
                if (reqImage.readyState == 4 && reqImage.status == 200) {
                    const image = JSON.parse(reqImage.response);
                    document.getElementById("userImage").src = image.url;
                }
            };
            reqImage.open("GET", "http://70.175.220.179:8080/getImage/" + user._id, true);
            reqImage.send();

        }

    };
    req.open("GET", "http://70.175.220.179:8080/users/user", true);
    req.send();



}

function deleteAccount() {

    var input = confirm("Are you sure?");

    if(input)
    {
        const reqDelete = new XMLHttpRequest();
        reqDelete.onreadystatechange = function () {
            if (reqDelete.readyState == 4 && reqDelete.status == 200) {

            }
        };
        reqDelete.open("GET", "http://70.175.220.179:8080/profile/deleteAccount", true);
        reqDelete.send();
    }


}
