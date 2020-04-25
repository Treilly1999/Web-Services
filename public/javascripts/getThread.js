//Discussion Board Thread Pool

function populateThreadPool() {
    //populate threadPool with get requests
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {

            JSON.parse(req.response).forEach(function(item){

                const id = item._id;
                const topic = item.topic;

                $('#threadPool').append('<form  style="display:grid; grid-template-columns: 1fr" id="viewThread" action="/threads/threadPages" method="get"><input id = "value" type="submit"><label id="author"></label></form><br>');
                document.getElementById('viewThread').action = '/threads/threadPages/' + id;
                document.getElementById('value').value =  topic;
                document.getElementById('viewThread').id = id;
                document.getElementById('value').id = topic;
                document.getElementById('author').innerText =  "By: " + item.author;
                document.getElementById('author').id = item.author;
            });
        }
    };
    req.open("GET", "http://68.9.212.228:8080/threads/threads", true);
    req.send();
}

//Viewing individual threads threadPages.html

function renderThread() {
    var user = null;

    const req2 = new XMLHttpRequest();
    req2.onreadystatechange = function () {
        if (req2.readyState == 4 && req2.status == 200) {
            user = JSON.parse(req2.response).user;
        }
    };
    req2.open("GET", "http://68.9.212.228:8080/users/user", true);
    req2.send();

    //grab user information to use user.username for comparison to author of thread.
    const req = new XMLHttpRequest();
    const id = getUrlParameter('id');
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            const item = JSON.parse(req.response);
            const topic = item.topic;
            const author = item.author;
            const date = item.posted;
            const body = item.body;

            document.getElementById("header").innerText = `${topic}`;
            document.getElementById("author").innerText = `By: ${author}`;
            document.getElementById("date").innerText = `Posted: ${date}`;
            document.getElementById("body").innerText = `${body}`;

            //$('#threadPool').append('<form id="viewThread" action="/threadPages" method="get"><table width="320" border="1"><tr><td colspan="2" rowspan="1">' + topic + '</td></tr><tr><td width="118">' + "By: " +  author + '</td><td width="250">' + "Date: " +  date + '</td></tr><tr><td colspan="2" rowspan="3">' +body + '</td></tr></table><input type="submit" value="Go to thread"></form>');
            //document.getElementById('viewThread').action = '/threadPages/' + item._id;

            if(item.author == user.username)
            {
                $('#threadPool').append('<form action="/threads/deleteThread" id="delThread" method="post"><input type="submit" value="Delete Thread"></form>')
                document.getElementById('delThread').action = '/threads/deleteThread/' + item._id;
            }
        }
    };

    req.open("GET", "http://68.9.212.228:8080/threads/individualThread/" + id, true);
    req.send();

    const reqComment = new XMLHttpRequest();
    reqComment.onreadystatechange = function () {
        if (reqComment.readyState == 4 && reqComment.status == 200) {
            JSON.parse(reqComment.response).forEach(function(item){

                var commentCounter = 1;
                var commentID = 'comment' + commentCounter;

                const text = item.text;
                const author = item.author;
                const date = item.posted;
                const id = item._id;

                $('#comments').append('<h2 id="commenter"></h2><p id="dateComment"></p><p id="comment"></p><br><br>');
                document.getElementById('comment').innerText = `${text}`;
                document.getElementById('comment').id = 'comment' + commentCounter;
                document.getElementById('commenter').innerText = `By: ${author}`;
                document.getElementById('commenter').id = commenter;
                document.getElementById('dateComment').innerText = `Posted: ${date}`;
                document.getElementById('dateComment').id = 'dateComment' + commentCounter;


                if(author == user.username)
                {


                    $('#comments').append('<form action="/comments/deleteComment" id="delComment" method="post"><input type="submit" value="Delete Comment"></form>')
                    document.getElementById('delComment').action = '/comments/deleteComment/' + item._id + '/' + item.threadID;
                    document.getElementById('delComment').id = id;

                }
                commentCounter++;
            });

        }
    };

    reqComment.open("GET", "http://68.9.212.228:8080/comments/comments/" + id, true);
    reqComment.send();
}

