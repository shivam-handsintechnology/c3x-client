import React from 'react';

const TrackingTable = ({ trackingLogDetails }) => {
  // Flatten the array of arrays into a single array
  const flatTrackingDetails = trackingLogDetails.flat();

  // Group the flattened tracking details by ActivityDate
  const groupedByDate = flatTrackingDetails.reduce((acc, log) => {
    if (!acc[log.ActivityDate]) {
      acc[log.ActivityDate] = [];
    }
    acc[log.ActivityDate].push(log);
    return acc;
  }, {});

  return (
    <>
      <table className="table table-bordered table-responsive para-1">
        {Object.entries(groupedByDate).map(([date, logs]) => {
  
       return   <React.Fragment key={date}>
            {logs.map((log, logIndex) => {
              return <>
                <thead className="mb-2">
                  <tr className="left-border">
                    <th rowSpan={logs.length}>{log.ActivityDate}</th>
                    <th>Location</th>
                    <th>Time</th>
                  </tr>
                </thead>
                 {
                  logs.length>1?  [...Array(logs.length).keys()].map((i)=>{
                    return <tbody>
                    <tr key={logIndex}>
                      <td>{log.Remarks}</td>
                      <td>{log.Location}</td>
                      <td>{log.ActivityTime}</td>
                    </tr>
                    </tbody>
                  }):(
                  <>
                  <tbody>
                    <tr key={logIndex}>
                      <td>{log.Remarks}</td>
                      <td>{log.Location}</td>
                      <td>{log.ActivityTime}</td>
                    </tr>
                    </tbody>
                  </>
                  )
                 }
             
              </>
            })}
          </React.Fragment>
        })}

      </table>

    </>
  );
};

export default TrackingTable;
