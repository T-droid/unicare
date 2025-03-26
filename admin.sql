INSERT INTO
	users (
		id,
		name,
		phone_number,
		work_id,
		department_id,
		role,
		email,
		password
	)
VALUES
	(
		gen_random_uuid(),
		'Admin User',
		'0712345678',
		'ADM-001',
		'c8a4eeda-5af9-445f-822c-2c94d74823a1',
		'admin',
		'admin@unicare.com',
		'$2b$12$ORpm0bmYubnu2cXQN9.81u3XQPdFAVNj5VI9wSyloYq1TFFac66/q'
	);