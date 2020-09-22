function renderFeed() {
    var user = null;

    var feeds = [];

    const req2 = new XMLHttpRequest();
    req2.onreadystatechange = function () {
        if (req2.readyState == 4 && req2.status == 200) {
            user = JSON.parse(req2.response).user;

            const reqUserFeed = new XMLHttpRequest();
            reqUserFeed.onreadystatechange = function () {
                if (reqUserFeed.readyState == 4 && reqUserFeed.status == 200) {

                    var userFeed = JSON.parse(reqUserFeed.response);

                    //add current user feed
                    feeds = feeds.concat(userFeed);

                    const reqFriends = new XMLHttpRequest();
                    reqFriends.onreadystatechange = function () {
                        if (reqFriends.readyState == 4 && reqFriends.status == 200) {


                            var friendsList = JSON.parse(reqFriends.response);

                            friendsList.forEach(function (item, i) {


                                if (item.status == "accepted") {
                                    const reqFriendFeed = new XMLHttpRequest();
                                    reqFriendFeed.onreadystatechange = function () {
                                        if (reqFriendFeed.readyState == 4 && reqFriendFeed.status == 200) {

                                            var friendFeeds = JSON.parse(reqFriendFeed.response);

                                            friendFeeds.forEach(function (feedIDs) {
                                                //add friendFeed before sort
                                                feeds = feeds.concat(feedIDs);
                                            })

                                            feeds.sort(function (a, b) {
                                                var dateA = new Date(a.posted), dateB = new Date(b.posted);
                                                return dateB - dateA;
                                            });


                                            //console.log(feeds)
                                            // TODO: `refactor using jQuery
                                            //loop through sorted feeds and post to webpage dynamically
                                            if (i + 1 == friendsList.length) {
                                                postFeed(user, feeds);
                                            }


                                        }
                                    };
                                    reqFriendFeed.open("GET", "http://70.175.220.179:8080/feed/feed/" + item._id, true);
                                    reqFriendFeed.send();
                                }
                            });

                            if(friendsList.length == 0)
                            {
                                postFeed(user, feeds);
                            };

                        }
                    };
                    reqFriends.open("GET", "http://70.175.220.179:8080/friends/getFriendStatus", true);
                    reqFriends.send();
                }
            };
            reqUserFeed.open("GET", "http://70.175.220.179:8080/feed/feed/", true);
            reqUserFeed.send();


        }
    };
    req2.open("GET", "http://70.175.220.179:8080/users/user", true);
    req2.send();
}

function postFeed(user, feeds)
{
    feeds.forEach(function (feedID) {

        $('#feedDump').append('<div style="border: solid black 4px; border-radius: 50px 20px; background-color: white; margin: 45px 30% 0px; color: black"><h3 id="author"></h3><h4 id="dates"></h4><p id="feedBody"></p></div>');
        createHTMLElement('author', feedID.author, false, null);
        createHTMLDateElement('dates', feedID.posted,2);
        createHTMLElement('feedBody', feedID.body, false, null);

        if (user.userLevel == 2 || feedID.author == user.username) {
            $('#feedDump').append('<form action="/feed/deleteFeed/" id="deleteFeed" method="post"><input style="margin-left: 30%; margin-top: 5px; float: left" class="submit" type="submit" value="Delete"></form>');
            createHTMLElement('deleteFeed', feedID._id, true, '/feed/deleteFeed/')
        }
    })
}