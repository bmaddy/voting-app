import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Vote from './Vote';
import Winner from './Winner';

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    if (!!this.props.winner) {
      return <Winner ref="winner" winner={this.props.winner} />
    } else {
      return <Vote {...this.props} />
    }
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(mapStateToProps)(Voting);
