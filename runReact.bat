@echo off

echo Building React Frontend

call npm i
call npm run build

echo Starting React Frontend

call npx serve -s build -l 3000

cmd /k

echo React Server Started