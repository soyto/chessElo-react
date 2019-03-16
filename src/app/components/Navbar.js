import React from 'react';
import {Link, Route} from 'react-router-dom';

function NavItem({to, name}) {
    return (
      <Route
          path={to}
          exact={true}
          children={({ match }) => (
              <li className={match ? 'nav-item active' : 'nav-item'}>
                <Link className="nav-link" to={to}>{name}</Link>
              </li>
          )}
      />
  );
}

class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to={`/`}>ChessElo (React build)</Link>
          <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#appNavbar"
                  aria-controls="appNavbar"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="appNavbar">
            <ul className="navbar-nav mr-auto">
              <NavItem to={`/`} name="Home"/>
            </ul>
          </div>
        </nav>
    )
  }
}

export default Navbar;