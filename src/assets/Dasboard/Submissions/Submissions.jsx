// import React from "react";
// import Accordion from "react-bootstrap/Accordion";

// export default function Submissions() {
//   return (
//     <div>
//       <h1 style={{ marginBottom: "10px" }}>Submissions</h1>
//       <Accordion defaultActiveKey="0">
//         <Accordion.Item eventKey="0">
//           <Accordion.Header>Submission From &nbsp; <b> John Doe</b></Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="1">
//           <Accordion.Header>Submission From &nbsp; <b> Jane Doe</b></Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="2">
//           <Accordion.Header>Submission From &nbsp; <b> Jane Doe</b></Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="3">
//           <Accordion.Header>Submission From &nbsp; <b> Jane Doe</b></Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="4">
//           <Accordion.Header>Submission From &nbsp; <b> Jane Doe</b></Accordion.Header>
//           <Accordion.Body>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
//             ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//             aliquip ex ea commodo consequat. Duis aute irure dolor in
//             reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
//             pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
//             culpa qui officia deserunt mollit anim id est laborum.
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
// import axios from 'axios'; // Assuming you use Axios for HTTP requests
import "./Submissions.css";
import { Table } from "react-bootstrap"; // Import Table component from Bootstrap

const dummySubmissions = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    message:
      "This is the first submission. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio. ",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  {
    id: 3,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  {
    id: 4,
    name: "Jane Doe",
    email: "jane@example.com",
    message:
      "Another submission here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dicta omnis nisi sapiente necessitatibus, alias commodi, consectetur cupiditate repellat repudiandae delectus, beatae sit? Deleniti qui, esse eveniet doloribus ad odio.",
  },
  // Add more dummy submissions as needed
];

export default function Submissions() {
  const [submissions, setSubmissions] = useState(dummySubmissions);

  // Fetch submissions data from your backend (replace 'your-api-endpoint' with the actual endpoint)
  // useEffect(() => {
  //   axios.get('your-api-endpoint')
  //     .then(response => {
  //       setSubmissions(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching submissions:', error);
  //     });
  // }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <>
      <h1> Form Submissions</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  {/* Add more columns based on your data */}
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.id}</td>
                    <td>{submission.name}</td>
                    <td>{submission.email}</td>
                    <td>{submission.message}</td>
                    {/* Add more cells based on your data */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
