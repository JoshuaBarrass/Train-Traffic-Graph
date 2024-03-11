@echo off

echo ">- Launching Services -<"

echo "> Starting Express Backend"
start runExpress.bat
echo "> Started Backend Express Server"

echo "> Starting React Frontend"
start runReact.bat
echo "> Started Frontend React Server"

echo "> Launched : React Server, Express Server",

set /p d=
cmd /k

exit