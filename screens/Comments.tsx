import React from 'react'
import { SafeAreaView, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types';
import NavigationBar from '../components/NavigationBar';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

const Comments = ({ cardImage, style, comments, onClose, onSubmitComment, onClearComments }) => {
    const clearBtn = {
        txt: 'Clear',
        func: onClearComments
    };
    return (
        <SafeAreaView style={style}>
            <NavigationBar
                title="Comments"
                leftText="Close"
                onPressLeftText={onClose}
                btn={clearBtn}
            />
            <CommentInput
                placeholder="comment"
                onSubmit={onSubmitComment}
            />
            <CommentList cardImage={cardImage} items={comments} />
        </SafeAreaView>
    )
}

export default Comments;
Comments.propTypes = {
    style: ViewPropTypes.style,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmitComment: PropTypes.func.isRequired,
}
Comments.defaultProps = {
    style: null,
}


const styles = StyleSheet.create({})
