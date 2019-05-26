# SmartMirror


## Setup

Create the necessary directories, if they do not exist

* Install python3 and pip on the rpi using `sudo apt install python3 python3-pip`
* Install the dependencies of this project using `pip3 install --user -r requirements.txt`
* Copy `.env-template` to `.env` and add the required information
* Copy `move to smartmirror.service` into `/etc/systemd/system/`
* Copy `autostart` into `$HOME/.local/lxsession/LXDE-pi/`
* Copy `kiosk.desktop` into `$HOME/.local/autostart/`
* Run `sudo systemctl enable smartmirror`
* reboot

The pi should now open chromium at our webpage in fullscreen.
