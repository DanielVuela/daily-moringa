module.exports = function(controller) {

    const PARTICIPATION_QUESTION_ID= '001';
    const YESTERDAY_ID = '002';
    const TODAY_ID = '003';
    const BLOCKERS_ID = '004';
    const dataService = require('../components/dataUtil/dsuData.js');

    controller.on('slash_command', function (bot, message) {
        var channelId = message.channel_id;

        bot.reply(message, "DSU time, remember, what you did yesterday, what you plan to do today, let us know if you have any blocker!");
        
        if(message.command==='dsu'){
            console.log("DSU CASE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        }

        bot.api.channels.info({
            channel: channelId // Specific channel you refer
        }, function (err, results) {
            console.log(results);
            if (results.ok && results.ok === true) {
                var members = results.channel.members;
                
                for (var index = 0; index < members.length; index++) {
                    var member = members[index];
    
                    bot.startPrivateConversation({
                        user: member
                    }, function (err, convo) {
                        if (!err && convo) {
                            startDSU(convo);
                        }
                    });
                }
            }
        });
     });
     
     controller.on('interactive_message_callback', (bot, message)=>{
         bot.replyInterctive(message, {
            text: 'SOMETHING TO TEST',

         });
     });

    const startDSU = function(convo){
        convo.ask({
            attachments:[
                {
                    title: "Hello, it's time to start daily standup. Also remember to take your daily moringa. ",
                    callback_id: PARTICIPATION_QUESTION_ID,
                    attachment_type: 'default',
                    actions: [
                        {
                            "name":"performDSU",
                            "text": "Im ready for my update.",
                            "value": "performDSU",
                            "type": "button",
                        },
                        {
                            "name":"SkipDSU",
                            "text": "Won't participate today.",
                            "value": "SkipDSU",
                            "type": "button",
                        }
                    ]
                }
            ]
        },[
            {
                pattern: "performDSU",
                callback: function(reply, convo) {
                    convo.next();
                    askYesterday(convo);
                }
            },
            {
                pattern: "SkipDSU",
                callback: function(reply, convo) {
                    convo.say('Too bad');
                    convo.next();
                }
            },
            {
                default: true,
                callback: function(reply, convo) {
                    convo.say("Default");
                    convo.next();
                }
            }
        ]);
    }

    const askYesterday = function(convo){
        convo.ask({
            attachments:[
                {
                    title: "What did you complete yesterday?",
                    callback_id: YESTERDAY_ID,
                    attachment_type: 'default',
                    
                }
            ]
        },[
            
            {
                default: true,
                callback: function(reply, convo) {
                    convo.next();
                    askToday(convo);
                }
            }
        ]);
    }   

    const askToday = function(convo){
        convo.ask({
            attachments:[
                {
                    title: "What do you plan to complete to today?",
                    callback_id: TODAY_ID,
                    attachment_type: 'default',
                    
                }
            ]
        },[
            
            {
                default: true,
                callback: function(reply, convo) {
                    convo.next();
                    askForBlockers(convo);

                }
            }
        ]);
    }   

    const askForBlockers = function(convo){
        convo.ask({
            attachments:[
                {
                    title: "Any blocker?",
                    callback_id: BLOCKERS_ID,
                    attachment_type: 'default',
                    
                }
            ]
        },[
            
            {
                default: true,
                callback: function(reply, convo) {
                    convo.say("Nice, also remember to take some moringa today!");
                    convo.next();
                }
            }
        ]);
    }   
}