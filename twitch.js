var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "cbrunofinandomster404"];


function getStreams(userList){


    var i = 0, j=0;

    usernames.forEach(function(username){

        var url = "https://wind-bow.gomix.me/twitch-api/streams/" + username +"?stream_type=all&callback=?";


        $.getJSON(url, function(json){

             

           if(json.stream){

                $("#panel").append("<div class='channel online'><div class='picture' id='online" + i +"'></div><div class='content'><h3>" + json.stream.channel.display_name + "</h3> <p>" + json.stream.channel.status + "</p> <a href='"+ json.stream.channel.url +"' target='_blank'><button class='onBut'> Online </button></a></div></div>"
                );

                $("#online" + i).css("backgroundImage", "url('" + json.stream.channel.logo + "')");  
                i++;
                
           }
           else{

                var url2 = "https://wind-bow.gomix.me/twitch-api/users/" + username +"?callback=?";
                
                $.getJSON(url2, function(json2){

                    console.log(json2)
                    if(!json2.error){
                        $("#panel").append("<div class='channel offline'><div class='picture' id='offline" + j +"'></div><div class='content'><h3>" + json2.display_name + "</h3> <a href='https://www.twitch.tv/" + username +"' target='_blank'><button class='offBut'> Offline </button></a></div></div>"
                        );

                        if(json2.logo)
                            $("#offline" + j).css("backgroundImage", "url('" + json2.logo + "')");
                        else{
                        $("#offline" + j).css("backgroundImage", "url('assets/nopic.jpg')");
                        }

                    }
                    else{

                        $("#panel").append("<div class='channel offline'><div class='picture' id='offline" + j +"'></div><div class='content'><h3> Sorry, no account found </h3> <p> User " + username + " does not exist: he closed his account or username is incorret. </p></div></div>"
                        );
                        $("#offline" + j).css("backgroundImage", "url('assets/noacc.jpg')");

                    }
                    

                    j++;

                });
            
                    
           } 

                
           
        });


    });
   
}




$(document).ready(function() {
   getStreams(usernames);

   $("#on").click(function(){

        $(".online").css("display", "flex");
        $(".offline").css("display", "none");


   });

   $("#off").click(function(){

        $(".online").css("display", "none");
        $(".offline").css("display", "flex");


   });

   $("#all").click(function(){

        $(".online").css("display", "flex");
        $(".offline").css("display", "flex");


   });


});


