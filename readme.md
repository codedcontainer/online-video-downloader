# Online Video Downloader #
## Description / Objectives ##
1. Be able to download an online video
2. Attach or burn subtitles to a video
3. Encode a video to a different format

## System OS Requirements ##
The following are system packages that need to be installed. These are supported on Linux, Windows, and OSX
- [youtube-dl](https://ytdl-org.github.io/youtube-dl/download.html)
- [ffmpeg](https://ffmpeg.org/download.html)

### Optional Global NPM Packages ###
- [live-server](https://www.npmjs.com/package/live-server)
- [typescript](https://www.npmjs.com/package/typescript)
- [babel-cli](https://www.npmjs.com/package/babel-cli)
- [babel-core](https://www.npmjs.com/package/babel-core)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [npx](https://www.npmjs.com/package/npx)
- [nodemon](https://www.npmjs.com/package/nodemon)

If you decide to install these locally, you can use npx to run these from the node_modules directory. 

## Startup / Run Locally Commands ##
- `npm install`                 - Install package dependencies
- `npx webpack`                 - Watch React Components (/src/components)
- `nodemon server/index.ts`     - Watch Express server files 
- `redis-server /usr/local/etc/redis.conf`  - Run Redis on mac

## Watch I Have Learned ##
1. socket.io - Watch for connections and send/receive messages from server and client
2. Create a tsconfig.json file and a visual studio launch.json file to handle debugging TS files.
3. Make sure that when you are configuring webpack with react that you declare your externals
4. Use callbacks if you want a function to continually return a value. 
5. Don't put callback functions inside of promises as these promises can always return false and not run your callback function. 
6. If you need to kill node.js on Windows and you cannot find the process in Task Manager use the following command: `taskkill /im node.exe /F`

## Bookmarks ##
-[formidable & Express](https://shiya.io/simple-file-upload-with-express-js-and-formidable-in-node-js/)




