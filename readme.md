Here's my HTML - CSS - JS video player.

*** TECH USED ***

CSS 3D TRANSFORMS (for the progress bar, volume bar, )

CSS TRANSITIONS ( When the buttons are clicked )

HTML5 VIDEO API (The core of the work)

JAVASCRIPT ( to link all my HTML and CSS to the VIDEO API, and managing 			 the different states of the divs)

JQUERY (I had to install it to use colorthief, but typed no line with 			it)

COLORTHIEF ( I used this library to get the main color of every frame 				 of the video, in order to create the ambilight effect)

QUANTIZE (Is necessary to properly use colorthief)

*** FEATURES ***

PLAY / PAUSE : with the button and by clicking on the video 

FORWARD / BACKWARD : makes you go 10s forward or backward

PROGRESS BAR : Updates when the video is playing. You can drag and drop to change the currentTime, or just click.

PREVISUALIZATION :  Gives you the opportunity to see the video at X second when hovering the progress bar.

SOUND : By hovering the sound button, you can make the volume bar appear. It is draggable, just like the progress bar. You can also click the sound button in order to mute the video. Click a second time and the volume goes back to its previous value. 

RESTART : When the video stops, you can click the restart button and play the video again. 

FULL SCREEN : You can go fullscreen by clicking the full-screen button. The custom controls will appear in full screen mode. Click again to exit the full-screen mode. 

SPEED RATE : Just hover the cog icon to make the speed-rate appear. You have five speed rate options.

SHARE CUSTOM URL : By clicking the share button, a custom URL will be copied to your clipboard, containing the currentTime when you clicked.
Just paste it to the URL bar to play the video from this moment.

AMBILIGHT : With a time interval, I'm displaying every frame of the video in an invisible canvas, from which an image is created. Using the colorthief, I extract the main color of these frames in order to include it in the background gradient. 

TIME : The current time of the video is displayed, with the total time of the video. 


*** DIFFICULTIES ***

I had a hard time managing the fullscreen on mozilla, and I dropped it. Same for the disappearing of the controls once in fullscreen. I couldnt find a way to do it.


*** RESSOURCES ***

http://snipplr.com/view/64256/
http://lokeshdhakar.com/projects/color-thief/

http://www.w3schools.com/html/html5_video.asp

http://fortawesome.github.io/Font-Awesome/icons/

http://www.intheloftstudios.com/blog/detecting-html5-video-fullscreen-and-events
https://css-tricks.com/custom-controls-in-html5-video-full-screen/


VILLANI Arnaud H2 P2019