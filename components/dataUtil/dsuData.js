// const JSON_FILE_DIR = '../../.data/db/dsu.json';
// export const TYPES_OF_UPDATE = { YESTERDAY: 1, TODAY: 2, BLOCKERS: 3 };

// export const addupdateToDSU = (channel, team, user, updateWording, updateWordingType, ) => {

//     var dsuID = craftDSUID(channel, team);
//     var newDSU = craftDSUdsuObject(dsuID, updateWordingType, user, updateWording);
//     updateWordingFile(newDSU);

// }

// export const getDSUData = (channel, team) => {

// }

// const updateWordingDSUData = (channel, team, updateWordingType, user, updateWording) => {

// }

// const updateWordingFile = (dsuObj) => {
//     var fs = require('fs');

//     fs.exists(JSON_FILE_DIR, function (exists) {
//         if (exists) {
//             console.log("yes file exists");
//             fs.readFile(JSON_FILE_DIR, function readFileCallback(err, data) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     //TODO Make it compare and add just the proper update
//                     data = JSON.parse(data);
//                     data.push(dsuObj);
//                     var json = JSON.stringify(data);
//                     fs.writeFile(craftDSUdsuObject, json);
//                 }
//             });
//         } else {
//             console.log("file not exists")
//             data = [];
//             data.push(dsuObj)
//             var json = JSON.stringify(data);
//             fs.writeFile(JSON_FILE_DIR, json);
//         }
//     });
// }

// const craftDSUdsuObject = (id, updateWordingType, user, updateWording) => ({
//     id: id,
//     users: [{
//         user: user,
//         updateWordings: [{
//             updateWordingType: updateWordingType,
//             updateWordingWording: updateWording
//         }]
//     }]
// })

// const craftDSUID = (channel, team) => {
//     var rightNow = new Date();
//     var rightNowAsString = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
//     return `${rightNowAsString}.${team}.${channel}`;
// }

