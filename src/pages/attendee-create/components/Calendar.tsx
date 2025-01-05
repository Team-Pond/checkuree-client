const Calendar = () => {
  const data = [
    ["", "", "", "", "", "1명"],
    ["1명", "", "", "", "0명", "1명"],
    ["2명", "", "", "", "1명", "3명"],
    ["1명", "", "1명", "", "3명", "2명"],
    ["0명", "", "4명", "", "2명", "4명"],
    ["3명", "", "2명", "", "4명", ""],
  ];

  const days = ["월", "화", "수", "목", "금", "토"];

  return (
    <div className="max-w-md mx-auto">
      <table className="table-auto border-collapse border border-gray-200 w-full text-center">
        <thead>
          <tr>
            {days.map((day, index) => (
              <th
                key={index}
                className="border border-gray-200 p-2 text-sm font-medium"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`border border-gray-200 p-2 text-sm ${
                    cell
                      ? `bg-green-${
                          200 + rowIndex * 100
                        } text-green-900 font-semibold`
                      : "bg-white"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
