echo "Enter you database name"
read -r dbname

echo "Dropping and recreating the database: $dbname"

echo "DROP DATABASE $dbname; CREATE DATABASE $dbname" | psql -U postgres

npm run db:generate
npm run db:migrate