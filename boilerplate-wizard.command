#!/bin/bash
clear
echo "|----------------------------------------------------------"
echo "| Let's start a new project. "
echo "| !!! Please don't forget that you need internet to create a new project!!! "
echo "|----------------------------------------------------------"
echo ""
echo "Plase enter your new project name(don't use spaces):"

read _project_name
clear
echo "|----------------------------------------------------------"
echo "| Creatting folder $_project_name on /www/sites"
echo "|----------------------------------------------------------"
echo ""
cd /www/sites/
mkdir $_project_name  
cd $_project_name
echo "Done!"
echo "|----------------------------------------------------------"
echo "| Cloning Front-end Project Boilerplate repo  "
echo "|----------------------------------------------------------"
echo ""
git clone git@github.com:nmspf1/Front-End-Project-Boilerplate.git .
echo ""
echo "|----------------------------------------------------------"
echo "| Installing node dependencies"
echo "|----------------------------------------------------------"
echo ""
npm install
echo ""
echo "|----------------------------------------------------------"
echo "| Complete! "
echo "|----------------------------------------------------------"
echo ""
echo "Click enter to continue..."
read
clear
echo ""
echo "|----------------------------------------------------------"
echo "| Please edit the copyright.json file!"
echo "|----------------------------------------------------------"
echo ""
echo "Click enter to open and edit the copyright.json file... "
read 
open app/copyright.json
clear
echo ""
echo "|----------------------------------------------------------"
echo "| All set!? Let's run the project."
echo "|----------------------------------------------------------"
echo ""
echo "NOTE: With the developer tools on your browser check your js and css files, there"
echo " you will see the copyright comment that you just created."
echo ""
echo "Click enter to run the dafault gulp task: "
read 
open .
gulp


exit