import { connect } from 'react-redux';
import AttractionItem from './attractionItem';
import { deleteAttraction } from '../../actions/attraction_actions';
const mSTP = (state) => {
    return {
        
    };
};

const mDTP = dispatch => {
    return {
        deleteAttraction: id => dispatch(deleteAttraction(id)),
    };
};

export default connect(mSTP, mDTP)(AttractionItem);