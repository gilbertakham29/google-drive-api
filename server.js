const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');
const credentials = require('./google_drive.json');
const {client_id,client_secret,redirect_uris} = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
)
const REFRESH_TOKEN = "1//04b8L9_Bak3eZCgYIARAAGAQSNwF-L9Irxir-ZWsxAAxD6kBvqYnTeBrvNunM61csgFsZTGVuvU3LpnTQR1YMvJdGWTEJSkE3oZ0";

oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
const drive = google.drive({
    version:'v3',
    auth:oAuth2Client
})
const filePath = path.join(__dirname,'./Google-Drive.png');

// this codes create or upload a file in the google drive
async function uploadFile(){
    try{
        const response = await drive.files.create({
            requestBody: {
                name:'Google-Drive.png',
                mimeType:'image/png',
            },
            media:{
                mimeType:'image/png',
                body:fs.createReadStream(filePath),
            }
        })
        console.log(response.data);
    }catch(err){
        console.error(err.message);
    }
}
uploadFile();

// to delete a particular file or a folder.
async function deleteFile(){
    try{
        const response = await drive.files.delete({
            fileId:'1JQhvf3K94WhjLSura3SVElkQF1_icg6Z',
        })
        console.log(response.data,response.status);
    }catch(err){
        console.error(err.message);
    }
}
deleteFile();

// this updates the file or folder we uploaded.
async function updateFile(){
    try{
        const updatedFile = await drive.files.update({
            media:{
                body:fs.createReadStream('./google-developers.png')
            },
            fileId:'1QCOTGG0YWQQhHbsQtJAxBcXg-RuSg3v6'
        })
        console.log(updatedFile.data.id);
    }catch(err){
        console.error("Please specify a file",err.message);
    }
}
updateFile();

// this generates the public url to get or access the file/folder.
async function generateUrl(){
    try{
        const fieldId = '1QCOTGG0YWQQhHbsQtJAxBcXg-RuSg3v6';
        await drive.permissions.create({
            fileId:fieldId,
            requestBody:{
                role:'reader',
                type:'anyone',
            }
        })
        const fileResult = await drive.files.get({
            fileId:fieldId,
            fields:'webViewLink, webContentLink',
        })
        console.log(fileResult.data);
    }catch(err){
        console.error(err.messsage);
    }
}
generateUrl();