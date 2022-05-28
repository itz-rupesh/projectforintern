
import React from "react";

const SearchBar = (props) => {
    const { searchInput, SearchChangeHandler } = props;
    return (<>
        <div className="row ">
            <div className="col-md-12 search-bar-chat">
                <div className="search">
                    <i className="fa fa-search"></i>
                    <input type="text" className="form-control" name="search" value={searchInput} onChange={SearchChangeHandler} placeholder="search contact ..." />
                    <button className=" ">Search</button>
                </div>
                <hr className="mt-2 mb-1" />
            </div>
        </div>
    </>)
}
export default SearchBar;