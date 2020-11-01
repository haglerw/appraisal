#!/bin/sh
# Requirement For Windows
#  1. Versioned Project with git,svn. 
#  2. Download kiuwan application
#  3. Username and password for kiuwan and svn
#  4. Enable CLI in  tortoise
#  5. pushsvn.sh file
#  6. Use git bash

# Steps 
#  1. Add both kiuwan and svn credentials in windows environment 
#  2. put pushsvn.sh file on the root directory of  your project
#  3. On git bash terminal execute this file with git/svn comment as --- sh pushsvn.sh "comment"
#  4. Hit Enter
#  3. Grab a cup of coffee, that single command automates the code versioning process
#DEVELOPERS  DAVID MANDUKU AND OSCAR MUIGAI


#Kiuwan analyzer location/path

alias agent='D:/KiuwanLocalAnalyzer/bin/agent.cmd'

CI_PROJECT_DIR=$(pwd)

COMMENT_ARGUMENT="$1"
 #  rm -rf "svnD"
 # svn -username=$SVN_USERNAME --password=$SVN_PASSWORD 
 # kiuwan -user $KIUWAN_USER --pass $KIUWAN_PASSWD


#svn status

svn  add * --force

# get credentials from windows environment
svn commit -m "$COMMENT_ARGUMENT" --username=$SVN_USERNAME --password=$SVN_PASSWORD

git add .

git commit -m "$COMMENT_ARGUMENT"

#getting remote name 
for OUTPUT in $(git remote -v | grep -w "fetch" | awk '{print $1}')
do
	echo $OUTPUT
	git push  $OUTPUT master

done

#PUSHING CODE TO KIUWAN

#getting folder name
CI_PROJECT_DIR=$(pwd)
basename "$CI_PROJECT_DIR"
folderName="$(PWD | sed 's!.*/!!')"

agent -n "Angular Portal" -s "$CI_PROJECT_DIR/src" -l "devops_$folderName" -c --user $KIUWAN_USER --pass $KIUWAN_PASSWD








