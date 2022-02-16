import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactWordcloud from 'react-wordcloud';

import { omit } from 'ramda';
/**
 * WordCloud component
 */
export default class WordCloud extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.wordCloud = React.createFactory(ReactWordcloud);
    }

    render() {
        const { setProps } = this.props;
        const newProps = Object.assign(
            {
                callbacks: { 
                    onWordClick: (word) => setProps({ clickedWord: word}) 
                }
            },
            omit(["setProps", "clickedWord"], this.props)
        )
        return this.wordCloud(newProps)
    }
}

WordCloud.defaultProps = {
    options: {
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
        enableTooltip: true,
        deterministic: false,
        fontFamily: 'impact',
        fontSizes: [5, 60],
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: 2,
        rotations: 2,
        rotationAngles: [0, 90],
        scale: 'sqrt',
        spiral: 'archimedean',
        transitionDuration: 1000,
    },
    words: { "text": "", "value": 1 }
};

WordCloud.propTypes = {
    // fill this in with the properties 
    // that you want to make accessible to your component
    // I recommend including _all_ of the properties of draggable
    // that are JSON serializable (i.e. everything but functions)

    /**
     * Component id
     */
    id: PropTypes.string,

    /**
     * Set props (used internally)
     */
    setProps: PropTypes.func,

    /**
     * List of words
     */
    words: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    /**
     * Options
     */
    options: PropTypes.shape({
        fontStyle: PropTypes.string,
        fontSizes: PropTypes.arrayOf(PropTypes.number),
        colors: PropTypes.arrayOf(PropTypes.string),
        enableTooltip: PropTypes.bool,
        deterministic: PropTypes.bool,
        fontFamily: PropTypes.string,
        fontWeight: PropTypes.string,
        rotations: PropTypes.number,
        rotationAngles: PropTypes.arrayOf(PropTypes.number),
        padding: PropTypes.number,
        scale: PropTypes.string,
        spiral: PropTypes.string,
        transitionDuration: PropTypes.number
    }),

    /**
     * Selected word on click (read-only)
     */
    clickedWord: PropTypes.object,
};