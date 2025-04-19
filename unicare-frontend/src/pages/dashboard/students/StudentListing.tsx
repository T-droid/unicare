const StudentListing: React.FC = () => {
  return (
    <div id="student-listing" className="flex">
      <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Student Listing</h2>
        {/* Add your student listing content here */}
      </div>
      <table>
        <thead>
          <tr>
            <td>Full Name</td>
            <td>Student ID</td>
            <td>Course</td>
            <td>Year</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>123456</td>
            <td>Computer Science</td>
            <td>2nd Year</td>
            <td>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                View
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </td>
          </tr>
          {/* Add more student rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListing;
