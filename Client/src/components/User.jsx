import React from "react";

export const User = ({ user, userStatus }) => {
  
  return (
    <>
      <h1>Users in the Room</h1>
      <ul>
        {Object.keys(userStatus).map((username, index) => {
          return (
            <React.Fragment key={index}>
              <li>{username}</li>
              <h5>Status: {userStatus[username]}</h5>{" "}
              {/* Render the status for the corresponding user */}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};
