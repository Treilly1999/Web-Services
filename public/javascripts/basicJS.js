function correctDate(date, correction)
{

     var d = new Date(date).toLocaleString();

     //no time stamp
     if(correction == 1)
     {
          d = d.split(', ')[0];
          return d;
     }

     //time stamp
     if(correction == 2)
     {

          var dateRet = d.split(', ')[0];
          var timeRet = d.split(', ')[1];

          timeRet = timeRet.split(':')[0] + ":" + timeRet.split(':')[1] + " " + timeRet.split(' ') [1];

          var returnDate = dateRet + " " + timeRet;
          return returnDate;
     }

}