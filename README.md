# SmartMirror


## Setup

* Install python3 and pip on the rpi using `sudo apt install python3 python3-pip`
* Install the dependencies of this project using `pip3 install --user -r requirements.txt`
* Copy `.env-template` to `.env` and add the required information
* Copy `move to smartmirror.service` into `/etc/systemd/system/`
* Copy `autostart` to `$HOME/.local/lxsession/LXDE-pi/autostart`
* Run `sudo systemctl enable smartmirror`
* reboot

The pi should now open chromium at our webpage in fullscreen.
