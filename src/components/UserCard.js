import React from 'react';

function UserCard({ user }) {
  return (
    <tr>
        <td className="table-row">{ user.name }</td>
        <td className="table-row">{ user.age }</td>
    </tr>
  );
}

export default UserCard;
