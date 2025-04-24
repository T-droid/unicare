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
		gen_random_uuid (),
		'Dr Zahra',
		'0737627827',
		'DR-001',
		'69003fc0-b6f8-40b6-875b-d64f51776186',
		'doctor',
		'dr.zahra@doctors.unicare.com',
		'2b$10$4KrYy3WD/R3ogz/xiUdEuOMBTwCMhO6SYYD5IG5hVKptUo4CTOTUW'
	);

-- '$2b$12$ORpm0bmYubnu2cXQN9.81u3XQPdFAVNj5VI9wSyloYq1TFFac66/q'