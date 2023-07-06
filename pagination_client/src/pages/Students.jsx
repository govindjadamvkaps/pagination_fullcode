import axios from "axios";
import React, { useEffect, useState } from "react";

const LIMIT = 3;

const totalPagesCalculator = (total, limit) => {
  const pages = [];

  for (let x = 1; x <= parseInt(total) / limit; x++) {
    pages.push(x);
  }
  return pages;
};

const Students = () => {
  const [studentData, setStudentData] = useState([]);
  const [totalStudent, setTotalStudemt] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const fetchStudent = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-student`,
        {
          params: {
            page: activePage,
            limit: LIMIT,
          },
        }
      );
      setStudentData(resp.data.data);
      setTotalStudemt(resp.data.totalItems);
    } catch (error) {}
  };

  useEffect(() => {
    fetchStudent();
  }, [activePage]);
  return (
    <>
      <div className="container mx-auto mt-5">
        <h3 className="mt-4 text-center"> Student List</h3>

        <div className="mt-5 container mx-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Class
                  </th>
                  <th scope="col" className="px-6 py-3">
                    marks
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((item, index) => {
                  return (
                    <>
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                        key={index}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.firstName}
                        </th>
                        <td className="px-6 py-4">{item.lastName}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.class}</td>
                        <td className="px-6 py-4 ">{item.marks}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <>
          <nav aria-label="Page navigation example" className="mt-5">
            <ul className="inline-flex -space-x-px text-sm">
              {activePage != 1 && (
                <li onClick={() => setActivePage(activePage - 1)}>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>
              )}

              {totalPagesCalculator(totalStudent, LIMIT).map((pageNo) => {
                return (
                  <>
                    <li
                      onClick={() => {
                        setActivePage(pageNo);
                      }}
                    >
                      <a
                        href="#"
                        className="  flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        {pageNo}
                      </a>{" "}
                    </li>
                  </>
                );
              })}

              {activePage != parseInt(totalStudent / LIMIT) && (
                <li onClick={() => setActivePage(activePage + 1)}>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </>
      </div>
    </>
  );
};

export default Students;
