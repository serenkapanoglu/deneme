import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "~/utils/firebase/firebase.utils.js";
import "./search.styles.scss";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const searchBoxRef = useRef(null);

  const searchListOfUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUsers(querySnapshot.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    searchListOfUsers();
  }, []);

  const onInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setShowResults(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <input
        ref={searchBoxRef}
        className="headersearch"
        value={searchTerm}
        onChange={onInputChange}
      />
      {showResults && (
        <ul className="searchlist">
          {searchTerm.length > 0 &&
            users &&
            users
              .filter(
                (user) =>
                  user &&
                  user.displayName &&
                  user.displayName.includes(searchTerm)
              )
              .map((user) => (
                <li key={user.id}>
                  <Link to="otheruser" onClick={resetSearch}>
                    {user.displayName}
                  </Link>
                </li>
              ))}
        </ul>
      )}
    </div>
  );
};
