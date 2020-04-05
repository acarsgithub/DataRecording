# Data Recording Sub-Team

#### Below is a step-by-step summary of all of the tasks that we achieved throughout research
#### We have also included any pertinent github links and code critical to the progress of the team's research

### Part 1

After realizing that we will be working with the Intel 435i depth-mapping camera to obtain RGB, depth mappings, and other useful functionalities for our Autonomous Visualization Research, we went ahead and downloaded the IntelRealSense SDK 2.0 application to have a user friendly interface of the recordings while gaining familiarity with how the camera worked and how the files were saved ('.bag' extensions)

The following link is useful to obtain the IntelRealSense SDK 2.0 application

* https://www.intelrealsense.com/sdk-2/


From here, we discovered that the librealsense library will provide the most useful functionalities and tools needed for our progress. Intel provided this library to all programmers through their github repository - the following is the github link to the repository

* https://github.com/IntelRealSense/librealsense


Within the librealsense library, the two most important functionalities for the purposes of our team were: 

 * rs-convert https://github.com/IntelRealSense/librealsense/tree/master/tools/convert
 * rs-record-playback https://github.com/IntelRealSense/librealsense/tree/master/examples/record-playback
 
#### Beware: You are highly advised to use Visual Studio 2019 as the IDE to run the rs-record-playback example, as many other IDE's caused unexpected issues and errors. Make sure that the camera is plugged in before you begin running the application. Here is the link for VS 2019: https://visualstudio.microsoft.com/vs/
 
When the camera is plugged in to your laptop (USB connection), execute the rs-record-playback sample code. You will see that it provides the optionalities to begin recording, pause recordings, resume recordings, to stop reocrdings, and to playback the previous recording you made. Once the recording is finished, it will be saved within the **Debug** folder within the samples and/or rs-record playback directory. This will be created for you automatically once you have completed the first recording.

rs-convert allows you take the bag file from the recording that you made, and converts it to one of many formats:
* PNG (for depth mapping and RGB)
* CSV depth matrix
* RAW output
* PLY output
* BIN output

Up to now, PNG is the most useful format for us. However, we are planning on looking into the other formats and seeing how useful that they might be for obtaining useful information to help create the visualization system. In the usage example on the link to rs-convert, you will see that to properly convert from bag files that the terminal prompt must be in the following format:
 - *rs-convert.exe -v test -i 1.bag*. 
 
We found that it is helpful to replace *test* with the folder destination that you want to save the PNG files to. This is something we had to discover on our own, but a useful tool.

We also modified the rs-record-playback file to start recording with the Intel435i as soon as the program starts running and to continuously record while it is running, until the program is killed. We believed that this was going to be very useful for the overall application we needed to create, making it quicker to start recording and helping us revolve around the issue of needing to press buttons on the rs-record-playback user interface to start recording. Our plan was to control the recording through beacon signals (explained in the next section). We did manage to modify the code and get the result that we needed, but we ran into an issue converting the bag file that we obtained. Since our plan was to abruptly kill the program, it turns out that we cause a "bag unindexed" error that comes about from the unexpected interruption of the recording process. The modified code that we made is included in the repositiory named rs-record-playback-modified. As of now, because of the interruption issue, this is still an ongoing process. We also created an executable of the program, which is also included in this repository. 

#### Current issue: We cannot just unexpectedly kill the program, so we must work aorund this issue.

#### Following this, we managed to reach the first big stage throughout the project: we fully set up the SDK realsense viewer, recorded with the depth mapping Intel 435i, stored the recording into bag files, and converted the bag files to a suitable format for our visualization purposes.


### Part 2

After we managed to successfully complete the first part of the project, our next task was to focus on Bleacon technology as a means of communication between a smartphone and a controller (such as a Raspberry Pi) in order to execute our code for the Intel 435i recording.

Bleacon technology is used in conjunction with the noble and bleno libraries. Together, these things allow for a controller to communicate properly with a smartphone. Please observe the PNG attached to this repository named *EndResult.PNG* to view a conceptual representation/diagram of what the focus of this part of the project is; essentially, it is to create an application that will help us communicate between a controller and a smartphone with bluetooth functionality so that we can record with the 435i at will.

The following is needed:
* The Bleacon library: https://github.com/sandeepmistry/node-bleacon
* The noble library (prerquisite for bleacon): https://github.com/noble/noble#prerequisites
* The bleno library (prerequisite for bleacon): https://github.com/noble/bleno

#### I can't stress this enough: follow all README directions for properly installing the libraries above, it is critical.

After the libraries have installed properly, go ahead and download the 'Locate' smartphone application in the application store:
* https://apps.apple.com/in/app/locate-beacon/id738709014 

Also, if you don't already have it, go ahead and download the Visual Studio Code IDE, as we have found that it works the best for the bleacon library:
* https://code.visualstudio.com/

Here is a quick breakdown of how beacon signals and Bluetooth Low Energy technology works:
* Each beacon signal consists of a UUID, major, and minor combination
* The UUID is a string encoding meant to represent one large clustered group of beacons
* The major integer value is a representation of a subgroup within the large group of beacons
* The minor integer value is a representation of each individual beacon
* Here is a good link that explaisn beacon technology in more detail: https://kontakt.io/blog/beacon-id-strategy-guide-quick-deployment/

Once all of the above has been successfully installed, go ahead and open up the **node_modules** folder (this folder contains the libraries for bleacon, bleno, noble, and probably many others that were automatically downloaded throughout the above installation process). Within the node_modules folder, enter the bleacon folder and go to the *test.js* file and run the file. Here is where the file is located and what it looks like: https://github.com/sandeepmistry/node-bleacon/blob/master/test.js.

If everything was installed properly, then running test.js should display (to console) the beacon with the specific UUID, major, and minor that was advertised. We managed to get to this point after a lot of struggle, but it eventually worked out! The console logging is laggy and glitchy sometimes, so it may not display properly or at all, but keep attempting to run the code and make sure everything was installed properly beforehand. Essentially, make sure that you can pick the signal up in the 'Locate' application, and that you can also advertise your own signal from the 'Locate' application and scan it properly from the test.js file to log the beacon to console.

At this point, after the beacon properly advertises and gets scanned, we can set up our own transmitters/beacon signals for the purposes of the overall application. There are four signals we need to create. For all of these signals, the only thing that we need to differentiate between the signals is the minor value. The UUID and major will stay consistent. The following signals were created within the 'Locate' application:
* A *Start Recording* signal with minor value 1
* A *Stop Recording* signal with minor value 0
* A *Currently Recording State* signal with minor value 3
* A *Not Recording State* signal with minor value 2

Once we made sure we could recieve and send signals for state and recording control, we began modifying the test.js file for the overall application. That code is available above. Just use the *test.js* file within the repository and replace the original code with this one. 

#### Current Issue: We can send a signal and recieve state back properly, but we cannot swap between states or signals yet. This is still an ongoing process.


### Part 3

In this part, we will speak on the hardware part of the project. 

We originally started working with the Jetson Nvidia Nano, but quickly ran into issues regarding the architecture of the operating system not being x86. We then decided to work with the raspberry pi instead as we thought it would be the best substitute.


### Part 4

Here, we will discuss our progress on the Amazon S3 portion of the proejct.


