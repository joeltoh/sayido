import React from "react";
import "../category/categoryNavBar/categories.css";
const navbar = {
  inbox: "Inbox",
  profile: "My Profile",
  services: "Services"
}
export class VendorNavBar extends React.Component {

  camelize(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  
  render() {
    return (
      <ul className="nav nav-pills justify-content-center nav-cat">
        {Object.values(navbar).map(nav => {
          const url = nav === "Inbox" ? "" : this.camelize(nav);
          return (
            <li role="presentation" key={nav}>
              <a className="category-link" href={`/vendor/${url}`}>{nav}</a>
            </li>
          )
        }
        )}
      </ul>
    );
  }
}

export default VendorNavBar;
