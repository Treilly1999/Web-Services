//Generate search results

function generateSearch() {

    var searchParam = getUrlParameter('search_param');

    //get user results
    const reqUser = new XMLHttpRequest();
    reqUser.onreadystatechange = function () {
        if (reqUser.readyState == 4 && reqUser.status == 200) {
            item = JSON.parse(reqUser.response);

                $('#users').append('<form id="viewProfile" method="get"><input class="submit" type="submit" id="submitUser"></form>');
                document.getElementById("viewProfile").action = '/profile/friendProfile/' + item._id;
                document.getElementById('submitUser').value = item.username;


        }
        if(reqUser.status == 404)
        {
            $('#users').append('<p>No users found</p>');

        }

    }

    reqUser.open("GET", "http://70.175.220.179:8080/search/users/" + searchParam, true);
    reqUser.send();

    //get thread results
    const reqThread = new XMLHttpRequest();
    reqThread.onreadystatechange = function () {
        if (reqThread.readyState == 4 && reqThread.status == 200) {

            item = JSON.parse(reqThread.response);

            $('#threads').append('<form style="margin: 10px" id="viewThread" action="/threads/threadPages" method="get"><div><input style="width: auto" class="submit" id = "value" type="submit"></div><div><label id="author"></label></div></form><br>');
            document.getElementById('viewThread').action = '/threads/threadPages/' + item._id;
            document.getElementById('value').value =  item.topic;
            document.getElementById('viewThread').id = item._id;
            document.getElementById('value').id = item.topic;
            document.getElementById('author').innerText =  "By: " + item.author;
            document.getElementById('author').id = item.author;



        }
        if(reqThread.status == 404)
        {
            $('#threads').append('<p>No threads found</p>');

        }

    }

    reqThread.open("GET", "http://70.175.220.179:8080/search/threads/" + searchParam , true);
    reqThread.send();
    //
    // //get thread results
    // const reqComment = new XMLHttpRequest();
    // reqComment.onreadystatechange = function () {
    //     if (reqThread.readyState == 4 && reqThread.status == 200) {
    //
    //
    //     }
    //
    // }
    //
    // reqComment.open("GET", "http://70.175.220.179:8080/users/user", true);
    // reqComment.send();

}
