#!/arms/bin/bash
echo 'installing Dependencies ...'
/usr/bin/npm install
echo 'Build for production'
/usr/bin/npm run build
echo 'starting server'
/usr/bin/pm2 restart server
echo 'started server. ending SSH session ...'
exit