# Data Recording Sub-Team

#### Below is a step-by-step summary of all of the tasks that we achieved throughout research
#### We have also included any pertinent github links and code critical to the progress of the team's research

### Part 1

After realizing that we will be working with the Intel 435i depth-mapping camera to obtain RGB, depth mappings, and other useful functionalities for our Autonomous Visualization Research, we went ahead and downloaded the IntelRealSense SDK 2.0 application to have a user friendly interface of the recordings while gaining familiarity with how the camera worked and how the files were saved ('.bag' extensions)

The following link is useful to obtain the IntelRealSense SDK 2.0 

* https://www.intelrealsense.com/sdk-2/


From here, we discovered that the librealsense library will provide the most useful functionalities and tools needed for our progress. Intel provided this library to all programmers through their github repository - the following is the github link to the repository

* https://github.com/IntelRealSense/librealsense


Within the librealsense library, the two most important functionalities for the purposes of our team were: 

 * rs-convert https://github.com/IntelRealSense/librealsense/tree/master/tools/convert
 * rs-record-playback https://github.com/IntelRealSense/librealsense/tree/master/examples/record-playback
 
#### Beware: You are highly advised to use Visual Studio 2019 as the IDE to run the rs-record-playback example below, as many other IDE's caused unexpected issues and errors. Make sure that the camera is plugged in before you begin running the application. Here is the link for VS 2019: https://visualstudio.microsoft.com/vs/
 
When the camera is plugged in to your laptop (USB connection), execute the rs-record-playback sample code. You will see that it provides the optionalities to begin recording, pause recordings, resume recordings, to stop reocrdings, and to playback the previous recording you made. Once the recoridng is finished, it will be saved within the **Debug** folder within the samples and/or rs-record playback directory. This will be created for you automatically once you have completed the first recording.

rs-convert allows you take the bag file from the recording that you made, and convert it to one of many formats:
* PNG (for depth mapping and RGB)
* CSV depth matrix
* RAW output
* PLY output
* BIN output

Up to now, PNG is the most useful format for us. However, we are planning on looking into the other formats and seeing how useful that they might be for obtaining useful information to help create the visualization system. In the usage example on the link to rs-convert placed above, you will see that to properly convert, the terminal prompt must be in the format:
 - *rs-convert.exe -v test -i 1.bag*. 
 
We found that it is helpful to replace *test* with the folder destination that you want to save the PNG files to. This is something we had to discover on our own, but a useful tool.

#### Following this, we managed to reach the first big stage throughout the project: we fully set up the SDK realsense viewer, recorded with the depth mapping Intel 435i, stored the recording into bag files, and converted the bag files to a suitable format for our visualization purposes.


