function createHTMLElement(elementID, JSONObject, hasAction, action)
{
    if (hasAction == true)
    {
        document.getElementById(elementID).action = action + '' + JSONObject;
    }
    else
    {
        document.getElementById(elementID).innerText = JSONObject;
    }

    document.getElementById(elementID).id = "" + JSONObject;
}



function createHTMLDateElement(elementID, JSONObject, dateCorrection)
{
    document.getElementById(elementID).innerText = "Date posted: " + correctDate(JSONObject, dateCorrection);
    document.getElementById(elementID).id = JSONObject;
}

