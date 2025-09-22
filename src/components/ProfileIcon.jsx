import React from "react";

const ProfileIcon = ({ name, imageUrl }) => {
  // Get first letter of name
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="flex items-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      ) : (
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 text-white font-bold">
          {initial}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
