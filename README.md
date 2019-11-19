# fmgmap
**This is a WIP & will expose your FortiManager device status at the endpoint /devices**

Simple flask/leaflet containerised jigger to plot all your devices (with longitude != 0.0)
+ Green = Good
+ Red = Bad
+ Grey = Unknown
#### Why? 
Because the built-in map display is per-ADOM.

### Usage
##### Create a read-only admin user
   Create a read-only API user with permissions to all ADOMs on your FortiManager and API access
   At minimum needs an admin profile with read-only permissions for Add/Delete/Edit Devices/Groups  

##### Clone repo and build
```
git clone https://github.com/poroping/fmgmap.git
cd ./fmgmap
docker build -t fmgmap .
```
##### Run container and set credentials with environmental variables
```
docker run -it -p 5000:5000 --name fmgmap -e FORTIMAPS_FMG_HOST=<URL/IP> -e FORTIMAPS_FMG_USERNAME=<USERNAME> -e FORTIMAPS_FMG_PASSWORD=<PASSWORD> -d fmgmap
```
   If not defined the username and password is admin

### TODO:
+ Make polling of FortiManager independent, at the moment polls FortiManager whenever a GET is received at /devices
+ Restrict GET request and/or add auth
+ HTTPS
+ Yellow for out of sync

**This is a WIP & will expose your FortiManager device status at the endpoint /devices**
