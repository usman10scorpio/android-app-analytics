## How to run project on local machine
1) First install dependencies in client and server. For that just write these commands in your console.

    `npm run client-install`
    `npm run server-install`

2) Run the project

    `npm run start` ( it will start both the client and server)

## Modules

    client : call backend to fetch android app statistics in (app.js)
    Server : getting android application stats in (getDownloadScheduler.js) and exposing an api for front end in (statsController.js)
    

## Schedulers
There is one scheduler that runs every day at 12:00 midnight. Its job is to fetch the downloads of android app and store in downloads folder.

## Extra info
In start there will be no **downloads** folder. To show the graph on front end change you computer time 
and set it to **11:59 pm**. Close the already running server if any, and restart it. **downloads** folder
will be created at **12:00 am (midnight)**. In **downloads** folder **sub folders** ( e.g dlg or menu guru )
after the android app name will be created. In each of these folders, file with **current date** will be 
created ( e.g 29-06-2020.json). Refresh your **localhost:3000** to see the graph.
