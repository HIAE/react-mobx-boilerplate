import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('commonStore')
@withRouter
@observer
export default class Home extends React.Component {
  componentDidMount() {

  }

  handleAction = (e) => {
    this.props.commonStore.setExampleText('Hello World!')
  }

  handleClearAction = (e) => {
    this.props.commonStore.setExampleText(null)
  }

  render() {
    const { tags, token, appName, example } = this.props.commonStore;

    return (
      <div className="home-page">

        <div className="container page">
          <div className="row">
              {!example?<button
                className="btn btn-lg btn-primary pull-xs-left"
                onClick={this.handleAction}
              >
              Action
              </button>:null}
              {example?<button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={this.handleClearAction}
              >
               Clear Action
              </button>:null}
          </div>
          <div className="row">
            <h1>{example}</h1>
          </div>
        </div>

      </div>
    );
  }
}
