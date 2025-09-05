#!/bin/sh

echo "🚀 Running migrations..."
npm run db:migrate 


echo "✅ Starting app..."
exec node dist/server.js
