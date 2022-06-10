cd app
exec docker build -t express-app .
exec docker run -p 3002:3002 express-app
echo "access: http://localhost:3002"