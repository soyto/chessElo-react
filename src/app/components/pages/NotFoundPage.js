import React, {Component} from 'react';

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">Not found</h1>
            </div>
          </div>
        </div>
    );
  }
}

export default NotFoundPage;