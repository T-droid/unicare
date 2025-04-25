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
		'Jane Doe',
		'0737638298',
		'RCP-001',
		'de7d3b40-e8f0-4d12-8235-1ff1f7e0da9f',
		'receptionist',
		'reception@unicare.com',
		'$2b$12$ORpm0bmYubnu2cXQN9.81u3XQPdFAVNj5VI9wSyloYq1TFFac66/q'
	);

-- '$2b$12$ORpm0bmYubnu2cXQN9.81u3XQPdFAVNj5VI9wSyloYq1TFFac66/q'

CREATE TABLE lab_test_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reg_no VARCHAR(15),
    medical_history_id UUID,
    test_name VARCHAR(100) NOT NULL,
    test_description VARCHAR(200) NOT NULL,
    test_status DEFAULT 'pending' ENUM('pending', 'completed', 'in_progress') NOT NULL,
    test_result VARCHAR(200),
    requested_by_id UUID,
    tested_by_id UUID,
    requested_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    CONSTRAINT lab_test_requests_reg_no_students_reg_no_fk
        FOREIGN KEY (reg_no)
        REFERENCES students (reg_no),

    CONSTRAINT lab_test_requests_medical_history_id_medical_records_id_fk
        FOREIGN KEY (medical_history_id)
        REFERENCES medical_records (id)
        ON DELETE CASCADE,

    CONSTRAINT lab_test_requests_requested_by_id_users_id_fk
        FOREIGN KEY (requested_by_id)
        REFERENCES users (id),

    CONSTRAINT lab_test_requests_tested_by_id_users_id_fk
        FOREIGN KEY (tested_by_id)
        REFERENCES users (id)
);

-- Optional: Create the primary key index explicitly (usually auto-created with PRIMARY KEY)
CREATE UNIQUE INDEX lab_test_requests_pkey ON public.lab_test_requests USING BTREE (id);
