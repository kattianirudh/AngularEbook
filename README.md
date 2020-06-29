### Author : Anirudh Katti

## Readme

The Ebook app is build on angular. Due to certain packages used being outdated  the application runs angular 5 with RxJs 5.5.6. Both of them are necessary.



## Docker

1. The zip package contains a docker image. Running it as follows : 
2.  The name of the docker image is "kattianirudh-eBookReader-dockerImage.tar".
3.  First navigate your command prompt to the location of the  dockerImage file by using the ls command or by right clicking and choosing open cmd here.
4.  Once your cmd is open type the command  ***docker load --input kattianirudh-eBookReader-dockerImage.tar***  to load the image.
5. Then to run the container use the command ***docker run -p 80:80 kattianirudh/angularepubviewer***.  
6. The above command will run docker on your system. You can use the application by going to the URL ->  ***localhost:80***

***NOTE*** : To use the above commands you need to have docker setup in your system.



## NPM

1.  Open the folder and use the command ***'cd ./AngularEpubViewer'*** or enter the folder and right clicking and choosing open cmd here.
2.  Install all the NPM dependencies using the command ***npm install***
3.  Then   run the application by using the command ***ng serve***.
4.  The application will be open in ***localhost:4200***

***NOTE*** : You need to have NPM before hand

**NOTE**: Before using the ng serve command make sure that you have NgRx version less than 5.6 installed.