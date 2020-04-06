// License: Apache 2.0. See LICENSE file in root directory.
// Copyright(c) 2017 Intel Corporation. All Rights Reserved.

#include <librealsense2/rs.hpp> // Include RealSense Cross Platform API
#include "example.hpp"          // Include short list of convenience functions for rendering
#include <chrono>

// Includes for time display
#include <sstream>
#include <iostream>
#include <iomanip>


int main(int argc, char* argv[])
{


    // Create booleans to control GUI (recorded - allow play button, recording - show 'recording to file' text)
    bool recorded = false;
    bool recording = false;

    // Declare a texture for the depth image on the GPU
    texture depth_image;

    // Declare frameset and frames which will hold the data from the camera
    rs2::frameset frames;
    rs2::frame depth;

    // Declare depth colorizer for pretty visualization of depth data
    rs2::colorizer color_map;

    // Create a shared pointer to a pipeline
    auto pipe = std::make_shared<rs2::pipeline>();

    // Start streaming with default configuration
    pipe->start();

    // Initialize a shared pointer to a device with the current device on the pipeline
    rs2::device device = pipe->get_active_profile().get_device();

    // Create a variable to control the seek bar
    int seek_pos;

    // While application is running
    while (true) {

        // If the device is sreaming live and not from a file
        if (!device.as<rs2::playback>())
        {
            frames = pipe->wait_for_frames(); // wait for next set of frames from the camera
            depth = color_map.process(frames.get_depth_frame()); // Find and colorize the depth data
        }

        if (!device.as<rs2::playback>()) // Disable recording while device is playing
        {

            if (!device.as<rs2::recorder>())
            {
                pipe->stop(); // Stop the pipeline with the default configuration
                pipe = std::make_shared<rs2::pipeline>();
                rs2::config cfg; // Declare a new configuration
                cfg.enable_record_to_file("bro.bag");
                pipe->start(cfg); //File will be opened at this point
                device = pipe->get_active_profile().get_device();
            }
            else
            { // If the recording is resumed after a pause, there's no need to reset the shared pointer
                device.as<rs2::recorder>().resume(); // rs2::recorder allows access to 'resume' function
            }
            recording = true;
        }

    }
    return EXIT_SUCCESS;
}