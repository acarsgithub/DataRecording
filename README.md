# Data Recording Sub-Team

### Below is a step-by-step summary of all of the tasks that we achieved throughout research
### We have also included any pertinent github links and code critical to the progress of the team's research


After realizing that we will be working with the Intel 435i depth-mapping camera to obtain RGB, depth mappings, and other useful functionalities for our Autonomous Visualization Research, we went ahead and downloaded the IntelRealSense SDK 2.0 application to have a user friendly interface of the recordings while gaining familiarity with how the camera worked and how the files were saved ('.bag' extensions)

The following link is useful to obtain the IntelRealSense SDK 2.0 

* https://www.intelrealsense.com/sdk-2/


From here, we discovered that the librealsense library will provide the most useful functionalities and tools needed for our progress. Intel provided this library to all programmers through their github repository - the following is the github link to the repository

* https://github.com/IntelRealSense/librealsense

#### Beware: You are highly advised to use Visual Studio 2019 as the IDE to run the rs-record-playback example below, as many other IDE's caused issues

Within the librealsense library, the two most important functionalities for the purposes of our team were: 
 * rs-convert https://github.com/IntelRealSense/librealsense/tree/master/tools/convert
 * rs-record-playback https://github.com/IntelRealSense/librealsense/tree/master/examples/record-playback
 





